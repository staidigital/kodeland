// src/lib/utils/editor/state.ts

import type { Section } from './types';

const STORAGE_KEY = 'editorDraft';

export function loadSectionsFromStorage(): Section[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [{ id: 'section0', title: 'Ny seksjon', blocks: [] }];
}

export function saveSectionsToStorage(sections: Section[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sections, null, 2));
}

export function formatSections(sections: Section[]): string {
  return JSON.stringify(sections, null, 2);
}
