import type { Section, Block } from './types';
import { saveSectionsToStorage, formatSections } from './state';

export function resetEditorState(): Section[] {
  return [{ id: 'section0', title: 'Ny seksjon', blocks: [] }];
}

export function parseSectionText(rawText: string): Section[] | null {
  try {
    let text = rawText.trim();
    if (text.startsWith('export default')) {
      text = text.replace(/^export\s+default\s+/, '').replace(/;$/, '');
    }
    const parsed = new Function(`return (${text})`)();
    if (!Array.isArray(parsed)) throw new Error("Expected array of sections");
    return parsed;
  } catch {
    return null;
  }
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function importBlock(sections: Section[], fromSection: number, fromBlock: number): Block | null {
  const block = sections[fromSection]?.blocks?.[fromBlock];
  return block ? JSON.parse(JSON.stringify(block)) : null;
}
