-- Kjør denne ÉN gang etter at du har laget din egen bruker under
-- Authentication → Users → Add user (huk av «Auto Confirm User»).
-- Bytt ut e-postadressen med den du brukte, og navnet med ditt eget.
--
-- Du logger inn med e-postadressen. Navnet vises i menyen og i lærerpanelet;
-- uten navn vises det som står før @ i e-postadressen.

update public.profiles
set role = 'teacher',
    display_name = 'Ditt navn'
where id = (select id from auth.users where email = 'admin@kodeland.no');

-- Sjekk resultatet:
select username, display_name, role from public.profiles where role = 'teacher';
