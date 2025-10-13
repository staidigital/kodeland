// lib/utils/editor/blocks.ts
import { tick } from 'svelte';
import type { Block, Section } from './types';

export function addBlockToSection(
  sections: Section[],
  sectionIndex: number,
  block: Block,
  editingIndex: number | null
): Section[] {
  const updatedSections = [...sections];
  if (!updatedSections[sectionIndex]) return sections;

  if (editingIndex !== null) {
    updatedSections[sectionIndex].blocks[editingIndex] = { ...block };
  } else {
    updatedSections[sectionIndex].blocks.push({ ...block });
  }

  return updatedSections;
}

export function editBlock(sections: Section[], sectionIndex: number, blockIndex: number) {
  return sections[sectionIndex].blocks[blockIndex];
}

export function deleteBlockFromSection(
  sections: Section[],
  sectionIndex: number,
  blockIndex: number
): Section[] {
  const updatedSections = [...sections];
  updatedSections[sectionIndex].blocks.splice(blockIndex, 1);
  return updatedSections;
}

export function moveBlockUp(sections: Section[], sectionIndex: number, blockIndex: number): Section[] {
  const updatedSections = [...sections];
  const blocks = updatedSections[sectionIndex].blocks;

  if (blockIndex > 0) {
    [blocks[blockIndex - 1], blocks[blockIndex]] = [blocks[blockIndex], blocks[blockIndex - 1]];
  } else if (sectionIndex > 0) {
    const movedBlock = blocks.shift();
    if (movedBlock) {
      updatedSections[sectionIndex - 1].blocks.push(movedBlock);
    }
  }

  return updatedSections;
}

export function moveBlockDown(sections: Section[], sectionIndex: number, blockIndex: number): Section[] {
  const updatedSections = [...sections];
  const blocks = updatedSections[sectionIndex].blocks;

  if (blockIndex < blocks.length - 1) {
    [blocks[blockIndex + 1], blocks[blockIndex]] = [blocks[blockIndex], blocks[blockIndex + 1]];
  } else if (sectionIndex < updatedSections.length - 1) {
    const movedBlock = blocks.pop();
    if (movedBlock) {
      updatedSections[sectionIndex + 1].blocks.unshift(movedBlock);
    }
  }

  return updatedSections;
}

export function duplicateBlock(sections: Section[], sectionIndex: number, blockIndex: number): Section[] {
  const updatedSections = [...sections];
  const block = updatedSections[sectionIndex].blocks[blockIndex];
  const copy = JSON.parse(JSON.stringify(block));
  updatedSections[sectionIndex].blocks.splice(blockIndex + 1, 0, copy);
  return updatedSections;
}

export function resetBlockState(type: Block['type']): Block {
  if (type === 'code') {
    return { type: 'code', code: '', language: 'sql', interactive: true };
  } else if (type === 'image') {
    return { type: 'image', src: '', alt: '', caption: '' };
  } else {
    return { type: 'paragraph', text: '' };
  }
}

export async function insertMarkup(
  currentBlock: Block,
  textareaRef: HTMLTextAreaElement,
  start: string,
  end: string
): Promise<void> {
  if ('text' in currentBlock && textareaRef) {
    const { selectionStart, selectionEnd, value } = textareaRef;
    const before = value.slice(0, selectionStart);
    const selected = value.slice(selectionStart, selectionEnd);
    const after = value.slice(selectionEnd);
    (currentBlock as any).text = `${before}${start}${selected}${end}${after}`;
    await tick();
    textareaRef.focus();
    textareaRef.setSelectionRange(selectionStart + start.length, selectionEnd + start.length);
  }
}
