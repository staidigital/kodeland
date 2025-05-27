<script>
  const pokemon = [
    { id: 1, pokedex: 1, name: 'Bulbasaur', type: 'Grass', hp: 45 },
    { id: 2, pokedex: 4, name: 'Charmander', type: 'Fire', hp: 39 },
    { id: 3, pokedex: 7, name: 'Squirtle', type: 'Water', hp: 44 },
    { id: 4, pokedex: 10, name: 'Caterpie', type: 'Bug', hp: 45 },
    { id: 5, pokedex: 13, name: 'Weedle', type: 'Poison', hp: 40 },
    { id: 6, pokedex: 16, name: 'Pidgey', type: 'Flying', hp: 40 },
    { id: 7, pokedex: 25, name: 'Pikachu', type: 'Electric', hp: 35 },
    { id: 8, pokedex: 39, name: 'Jigglypuff', type: 'Fairy', hp: 115 }
  ];
</script>

<table class="w-full border border-slate-600 text-left text-sm text-slate-200 mt-4">
  <thead class="bg-slate-800 text-fuchsia-300">
    <tr>
      <th class="p-2 border border-slate-700">id</th>
      <th class="p-2 border border-slate-700">pokedex_number</th>
      <th class="p-2 border border-slate-700">name</th>
      <th class="p-2 border border-slate-700">type</th>
      <th class="p-2 border border-slate-700">hp</th>
    </tr>
  </thead>
  <tbody class="bg-slate-900">
    {#each pokemon as p}
      <tr>
        <td class="p-2 border border-slate-700">{p.id}</td>
        <td class="p-2 border border-slate-700">{p.pokedex}</td>
        <td class="p-2 border border-slate-700">{p.name}</td>
        <td class="p-2 border border-slate-700">{p.type}</td>
        <td class="p-2 border border-slate-700">{p.hp}</td>
      </tr>
    {/each}
  </tbody>
</table>
