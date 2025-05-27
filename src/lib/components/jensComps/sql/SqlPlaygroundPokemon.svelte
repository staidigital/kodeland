<script>
  import initSqlJs from 'sql.js';
  import { onMount } from 'svelte';
  import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
  // @ts-ignore
  import CodeMirror from 'svelte-codemirror-editor';
  import { sql } from '@codemirror/lang-sql';
  import { oneDark } from '@codemirror/theme-one-dark';

  let db, SQL, userQuery = 'SELECT * FROM pokemon;';
  let results = [];
  let ready = false;

  onMount(async () => {
    SQL = await initSqlJs({ locateFile: () => wasmUrl });
    resetDB();
  });

  function resetDB() {
  db = new SQL.Database();

  db.run(`CREATE TABLE pokemon (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pokedex_number INTEGER,
    name TEXT,
    type TEXT,
    hp INTEGER
  );`);

  db.run(`INSERT INTO pokemon (pokedex_number, name, type, hp) VALUES 
    (1, 'Bulbasaur', 'Grass', 45),
    (4, 'Charmander', 'Fire', 39),
    (7, 'Squirtle', 'Water', 44),
    (10, 'Caterpie', 'Bug', 45),
    (13, 'Weedle', 'Poison', 40),
    (16, 'Pidgey', 'Flying', 40),
    (25, 'Pikachu', 'Electric', 35),
    (39, 'Jigglypuff', 'Fairy', 115);`);

  results = [];
  ready = true;
}


  function runQuery() {
    if (!db) return;
    try {
      const res = db.exec(userQuery);
      results = res;
    } catch (err) {
      results = [{ columns: ['Feil'], values: [[err.message]] }];
    }
  }
</script>

<CodeMirror
  bind:value={userQuery}
  lang={sql()}
  theme={oneDark}
  lineWrapping={true}
  placeholder="Skriv SQL her..."
  class="mb-4 rounded-lg overflow-hidden text-sm"
/>

<div class="flex flex-wrap items-center gap-3 mb-4">
  <button
    on:click={runQuery}
    disabled={!ready}
    class="bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-gray-600 text-white px-4 py-2 rounded font-mono text-sm transition"
  >
    Kjør
  </button>

  <button
    on:click={resetDB}
    disabled={!ready}
    class="bg-slate-600 hover:bg-slate-700 disabled:bg-gray-600 text-white px-4 py-2 rounded font-mono text-sm transition"
  >
    Tilbakestill
  </button>
</div>

{#each results as table}
  <table class="mt-4 w-full border border-slate-600 text-left text-sm text-slate-200">
    <thead class="bg-slate-800 text-fuchsia-300">
      <tr>
        {#each table.columns as col}
          <th class="p-2 border border-slate-700">{col}</th>
        {/each}
      </tr>
    </thead>
    <tbody class="bg-slate-900">
      {#each table.values as row}
        <tr>
          {#each row as cell}
            <td class="p-2 border border-slate-700">{cell}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
{/each}
