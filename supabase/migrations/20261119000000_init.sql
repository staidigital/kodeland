-- Kodeland: brukere, klasser og fremdrift
--
-- Kjør hele fila i Supabase: SQL Editor → New query → lim inn → Run.
-- Fila kan bare kjøres én gang (den lager tabeller som ellers finnes fra før).
--
-- Prinsipper:
--   * Ingen kan registrere seg selv. Lærere lager elevbrukere via nettsiden,
--     som bruker Supabase sin admin-API på serveren (secret key).
--   * Rolle, brukernavn og klasse settes i app_metadata, som brukerne selv
--     ikke kan endre. En trigger kopierer dem over i public.profiles.
--   * Vi lagrer så lite personinfo som mulig: brukernavn og visningsnavn,
--     ingen e-post (innloggingen bruker en intern, falsk e-postadresse).
--   * Elever leser og skriver kun sin egen fremdrift. Lærere kan lese
--     fremdriften til elever i sine egne klasser.
--   * Endringer i brukere og klasser gjøres kun fra serveren (secret key),
--     så det finnes ingen update/delete-policyer for profiler.

-- ---------------------------------------------------------------------------
-- Tabeller
-- ---------------------------------------------------------------------------

create type public.user_role as enum ('student', 'teacher');

create table public.classes (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  teacher_id  uuid not null references auth.users (id) on delete cascade,
  created_at  timestamptz not null default now()
);

create index classes_teacher_id_idx on public.classes (teacher_id);

create table public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  username      text not null unique,
  display_name  text,
  role          public.user_role not null default 'student',
  class_id      uuid references public.classes (id) on delete set null,
  created_at    timestamptz not null default now()
);

create index profiles_class_id_idx on public.profiles (class_id);

-- Én rad per elev per leksjon. lesson_id er en sti, f.eks. '02-farger/01-style-css'.
create table public.lesson_progress (
  user_id       uuid not null references auth.users (id) on delete cascade,
  lesson_id     text not null,
  status        text not null check (status in ('started', 'completed')),
  completed_at  timestamptz,
  updated_at    timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

-- Én rad per elev per oppgave. Siste kode lagres så læreren kan se den.
create table public.exercise_results (
  user_id      uuid not null references auth.users (id) on delete cascade,
  exercise_id  text not null,
  passed       boolean not null default false,
  attempts     integer not null default 0,
  html         text,
  css          text,
  updated_at   timestamptz not null default now(),
  primary key (user_id, exercise_id)
);

-- ---------------------------------------------------------------------------
-- Hjelpefunksjoner (security definer for å unngå rekursjon i RLS)
-- ---------------------------------------------------------------------------

create or replace function public.is_teacher()
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'teacher'
  );
$$;

-- Er innlogget bruker lærer for klassen eleven går i?
create or replace function public.teaches(student uuid)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles p
    join public.classes c on c.id = p.class_id
    where p.id = student and c.teacher_id = (select auth.uid())
  );
$$;

-- Lager profil automatisk når en bruker opprettes i auth.users.
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, username, display_name, role, class_id)
  values (
    new.id,
    coalesce(new.raw_app_meta_data ->> 'username', split_part(new.email, '@', 1)),
    new.raw_app_meta_data ->> 'display_name',
    coalesce((new.raw_app_meta_data ->> 'role')::public.user_role, 'student'),
    nullif(new.raw_app_meta_data ->> 'class_id', '')::uuid
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.touch_updated_at()
returns trigger
language plpgsql set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger lesson_progress_touch
  before update on public.lesson_progress
  for each row execute function public.touch_updated_at();

create trigger exercise_results_touch
  before update on public.exercise_results
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Tilgang (Row Level Security)
-- ---------------------------------------------------------------------------

alter table public.classes          enable row level security;
alter table public.profiles         enable row level security;
alter table public.lesson_progress  enable row level security;
alter table public.exercise_results enable row level security;

-- Klasser: læreren ser sine egne, eleven ser klassen sin.
create policy "lærer ser egne klasser" on public.classes
  for select to authenticated
  using (teacher_id = (select auth.uid()));

create policy "elev ser egen klasse" on public.classes
  for select to authenticated
  using (id = (select class_id from public.profiles where id = (select auth.uid())));

-- Profiler: alle ser sin egen, lærere ser elevene sine.
create policy "se egen profil" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()));

create policy "lærer ser elevene sine" on public.profiles
  for select to authenticated
  using (public.teaches(id));

-- Fremdrift: eleven leser og skriver sin egen, læreren leser elevenes.
create policy "les egen fremdrift" on public.lesson_progress
  for select to authenticated
  using (user_id = (select auth.uid()) or public.teaches(user_id));

create policy "lagre egen fremdrift" on public.lesson_progress
  for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "oppdater egen fremdrift" on public.lesson_progress
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "les egne oppgaver" on public.exercise_results
  for select to authenticated
  using (user_id = (select auth.uid()) or public.teaches(user_id));

create policy "lagre egne oppgaver" on public.exercise_results
  for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "oppdater egne oppgaver" on public.exercise_results
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- Eksplisitte rettigheter for innloggede brukere (anon får ingenting).
revoke all on public.classes, public.profiles, public.lesson_progress, public.exercise_results from anon;
grant select on public.classes, public.profiles to authenticated;
grant select, insert, update on public.lesson_progress, public.exercise_results to authenticated;
