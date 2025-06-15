import type {Section} from '$lib/types/course';

export const sqlCourseSections: Section[] = [
  {
    id: 'part0',
    title: 'Del 1: Hva er SQL?',
    links: [
      {text: 'Teori', anchor: ''},
      {text: 'Oppgaver', anchor: '#sectionTasks'}
    ]
  },
  {
    id: 'part1',
    title: 'Del 2: SELECT-queries?',
    links: [
      {text: 'Teori', anchor: ''},
      {text: 'Oppgaver', anchor: '#sectionTasks'}
    ]
  }

]

export default sqlCourseSections;