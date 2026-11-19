-- Kodeland: oppgaver med flere HTML-sider (fra modul 4, «Flere sider og lenker»).
--
-- Kjør i Supabase: SQL Editor → New query → lim inn → Run.
--
-- index.html og style.css ligger fortsatt i html og css. De andre sidene i oppgaven
-- (f.eks. om-meg.html) lagres her som { "filnavn": "kode" }.
-- Eksisterende RLS-policyer og rettigheter på tabellen gjelder også den nye kolonnen.

alter table public.exercise_results add column if not exists pages jsonb;
