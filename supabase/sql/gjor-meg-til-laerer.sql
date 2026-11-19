-- Kjør denne ÉN gang etter at du har laget din egen bruker under
-- Authentication → Users → Add user (huk av «Auto Confirm User»).
-- Bytt ut e-postadressen med den du brukte.

update public.profiles
set role = 'teacher',
    username = 'laerer'
where id = (select id from auth.users where email = 'admin@kodeland.no');

-- Sjekk resultatet:
select username, role from public.profiles;
