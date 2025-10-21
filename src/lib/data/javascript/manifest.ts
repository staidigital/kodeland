import type {Section} from '$lib/types/course';

export const jsCourseSections: Section[] = [
  {
    id: 'part0',
    title: 'Setup',
    links: [
      {text: 'Javascript linket til HTML', anchor: ''},
      {text: 'Node', anchor: '#sectionNode'}
    ]
  },

  {
    id: 'part1',
    title: 'Del 1: Variabler',
    links: [
      { text: 'Teori', anchor: '' },
      { text: 'Oppgaver', anchor: '#sectionTasks' }
    ]
  },
  {
    id: 'part2',
    title: 'Del 2: Datatyper',
    links: [
      { text: 'Teori', anchor: '' },
      { text: 'Oppgaver', anchor: '#sectionTasks' }
    ]
  },
  {
    id: 'part3',
    title: 'Del 3: Arrays',
    links: [
      { text: 'Teori', anchor: '' },
      { text: 'Oppgaver', anchor: '#sectionTasks' }
    ]
  },
  {
    id: 'part4',
    title: 'Del 4: Betingelser',
    links: [
      { text: 'Teori', anchor: '' },
      { text: 'Oppgaver', anchor: '#sectionTasks' }
    ]
  },
  {
    id: 'part5',
    title: 'Del 5: Løkker',
    links: [
      { text: 'Teori', anchor: '' },
      { text: 'Oppgaver', anchor: '#sectionTasks' }
    ]
  },
  {
    id: 'part6',
    title: 'Del 6: Funksjoner',
    links: [
      { text: 'Teori', anchor: '' },
      { text: 'Oppgaver', anchor: '#sectionTasks' }
    ]
  },
  {
    id: 'part7',
    title: 'Del 7: DOM elementer',
    links: [
      { text: 'Teori', anchor: '' },
      { text: 'Oppgaver', anchor: '#sectionTasks' }
    ]
  },
  {
    id: 'part8',
    title: 'Del 8: Flere Selectors',
    links: [
      { text: 'Teori', anchor: '' },
      { text: 'Oppgaver', anchor: '#sectionTasks' }
    ]
  },
  {
    id: 'part9',
    title: 'Del 9: Mouse Events',
    links: []
  },
  {
    id: 'part10',
    title: 'Del 10: Bonusoppgaver',
    links: []
  },
 
];

export default jsCourseSections;