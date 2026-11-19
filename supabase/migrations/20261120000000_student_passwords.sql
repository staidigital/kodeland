-- Kodeland: lagrer studentenes passord kryptert, så læreren kan hente dem frem igjen.
--
-- Kjør i Supabase: SQL Editor → New query → lim inn → Run.
--
-- Passordene krypteres på serveren (AES-256-GCM) med nøkkelen STUDENT_PASSORD_NOKKEL
-- før de lagres. Databasen ser bare kryptert tekst.
-- Tabellen har RLS uten policyer: ingen innloggede brukere kan lese den, bare
-- serveren med secret key (via lærerpanelet, etter at læreren er sjekket).

create table public.student_passwords (
  user_id     uuid primary key references auth.users (id) on delete cascade,
  encrypted   text not null,
  updated_at  timestamptz not null default now()
);

alter table public.student_passwords enable row level security;
revoke all on public.student_passwords from anon, authenticated;
