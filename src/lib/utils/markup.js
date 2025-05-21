export function renderInlineMarkup(str = '') {
  const escaped = str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const withCode = escaped.replace(/`([^`]+)`/g,
    '<code class="bg-slate-800 text-green-300 px-1 rounded font-mono text-sm">$1</code>');

  const withBold = withCode.replace(/\*\*([^*]+)\*\*/g,
    '<strong class="text-white font-semibold">$1</strong>');

  const withItalic = withBold.replace(/_([^_]+)_/g,
    '<em class="italic text-slate-200">$1</em>');

  const withStrike = withItalic.replace(/~~([^~]+)~~/g,
    '<span class="line-through text-slate-400">$1</span>');

  const withLinks = withStrike.replace(/\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="underline text-fuchsia-400 hover:text-fuchsia-300" target="_blank" rel="noopener noreferrer">$1</a>');

  return withLinks;
}
