// src/routes/javascript/+page.server.js
import { redirect } from '@sveltejs/kit';

export function load() {
  throw redirect(307, '/sql/part0');
}
