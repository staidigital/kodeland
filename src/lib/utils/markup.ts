export function renderInlineMarkup(str: string = ''): string {
  const escaped = str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  let html = escaped
    // Kode inline
    .replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-green-300 px-1 rounded font-mono">$1</code>')
    // Fet
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold">$1</strong>')
    // Kursiv
    //.replace(/_([^_]+)_/g, '<em class="italic text-slate-200">$1</em>')
    // Gjennomstreket
    .replace(/~~([^~]+)~~/g, '<span class="line-through text-slate-400">$1</span>')
    // Lenke
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="underline text-fuchsia-400 hover:text-fuchsia-300" target="_blank" rel="noopener noreferrer">$1</a>')
    // Inline bilde
    .replace(/\[img:([^\]]+)\]/g, '<img src="/images/$1" class="inline-block w-6 mx-1 align-middle" alt="" />')
    // Ny: Info-boks
    .replace(/\^\^\^([^\\^]+)\^\^\^/g, '<div class="bg-blue-900 text-blue-200 p-3 rounded text-sm my-2">$1</div>')
    // Rød tekst
    .replace(/\^\^([^\\^]+)\^\^/g, '<span class="text-red-300 font-semibold">$1</span>')
    // Grønn tekst  
    .replace(/\*=\s*([^=*]+)\s*=\*/g, '<span class="text-green-400 font-semibold">$1</span>')
    // Sitatsboks
    .replace(/%%([^%]+)%%/g, '<span class="block italic text-sky-300 border-l-4 border-sky-500 pl-3 my-3">$1</span>')
    // Ny: Markert tekst
    .replace(/==([^=]+)==/g, '<mark class="bg-yellow-300 text-black px-1 rounded">$1</mark>')
    // Ny: Advarsel
    .replace(/!!([^!]+)!!/g, '<span class="text-red-400 font-bold">$1</span>')
    // Ny: Hint
    .replace(/::([^:]+)::/g, '<span class="text-slate-400 italic">$1</span>')
     // Ny: Knapp
    .replace(/\[btn:([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="inline-block bg-fuchsia-700 hover:bg-fuchsia-600 text-white text-xs px-3 py-1 rounded font-mono">$1</a>')
    // Ny: Kommentar-stil
    .replace(/(^|\s)(\/\/[^\n]*)/g, '$1<span class="text-slate-500 italic">$2</span>')
    // Matte inline
    .replace(/\$\$([0-9+\-*/^().=\s]+)\$\$/g,
      '<span class="text-emerald-300 font-mono">$1</span>')


  const lines = html.split('\n');
  const converted: string[] = [];
  let inList = false;

  for (const line of lines) {
    if (line.trim().startsWith('* ')) {
      if (!inList) {
        converted.push('<ul class="list-disc list-inside mb-2">');
        inList = true;
      }
      converted.push(`<li>${line.trim().substring(2)}</li>`);
    } else {
      if (inList) {
        converted.push('</ul>');
        inList = false;
      }
      converted.push(line);
    }
  }

  if (inList) converted.push('</ul>');

  return converted.join('\n');
}