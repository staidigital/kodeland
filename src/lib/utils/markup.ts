export function renderInlineMarkup(str: string = ''): string {
  const escaped = str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  let html = escaped
    .replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-green-300 px-1 rounded font-mono ">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class=" font-semibold">$1</strong>')
    .replace(/_([^_]+)_/g, '<em class="italic text-slate-200">$1</em>')
    .replace(/~~([^~]+)~~/g, '<span class="line-through text-slate-400">$1</span>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="underline text-fuchsia-400 hover:text-fuchsia-300" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\[img:([^\]]+)\]/g, '<img src="/images/$1" class="inline-block w-6 mx-1 align-middle" alt="" />')
    .replace(/\^\^([^\\^]+)\^\^/g, '<span class="text-red-300 font-semibold">$1</span>')
    .replace(/%%([^%]+)%%/g, '<span class="block italic text-sky-300 border-l-4 border-sky-500 pl-3 my-3">$1</span>')

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
