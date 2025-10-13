import type { Section } from '$lib/types/course';

const sql2TestManifest: Section[] = [
  {
    id: 'part0',
    title: 'Del 1: Testkurs for SQL',
    links: [
      { text: 'Teori', anchor: '' },
      { text: 'Oppgaver', anchor: '#sectionTasks' }
    ]
  }
];

export default sql2TestManifest;
