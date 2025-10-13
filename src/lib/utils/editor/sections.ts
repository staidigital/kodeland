// src/lib/utils/editor/sections.ts
import type { Section } from './types';

export function addSection(sections: Section[]): Section[] {
  return [
    ...sections,
    { id: '', title: 'Ny seksjon', blocks: [] }
  ];
}

export function deleteSection(sections: Section[], index: number): Section[] {
  return sections.filter((_, i) => i !== index);
}

export function renameSection(sections: Section[], index: number, newTitle: string): Section[] {
  return sections.map((s, i) => i === index ? { ...s, title: newTitle } : s);
}

export function moveSectionUp(sections: Section[], index: number): Section[] {
  if (index <= 0) return sections;
  const newSections = [...sections];
  [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
  return newSections;
}

export function moveSectionDown(sections: Section[], index: number): Section[] {
  if (index >= sections.length - 1) return sections;
  const newSections = [...sections];
  [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
  return newSections;
}

export function normalizeSectionIds(sections: Section[]): Section[] {
  return sections.map((s, i) => ({ ...s, id: `section${i}` }));
}
