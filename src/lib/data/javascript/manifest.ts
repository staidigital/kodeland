import type {Section} from '$lib/types/course';

export const jsCourseSections: Section[] = [
  {
    id: 'part0',
    title: 'Setup',
    links: [
      {text: 'Javascript + HTML', anchor: ''},
      {text: 'Node', anchor: '#sectionNode'}
    ]
  },

  {
    id: 'part1',
    title: 'Del 1: Variabler',
    links: [
      { text: 'Lage variabler', anchor: '#lageVariabler' },
      { text: 'Navngi variabler', anchor: '#navngiVariabler' },
      { text: 'Konstante variabler', anchor: '#constVariabler' },

      { text: 'Oppgaver', anchor: '#sectionTasks' }
    ]
  },
  {
    id: 'part2',
    title: 'Del 2: Datatyper',
    links: [
      { text: 'Number', anchor: '#number' },
      { text: 'String', anchor: '#string' },
      { text: 'Boolean', anchor: '#boolean' },
      { text: 'Undefined og Null', anchor: '#undefinednull' },
      { text: 'Oppgaver', anchor: '#sectionTasks' }
    ]
  },
  {
    id: 'part3',
    title: 'Del 3: Array',
    links: [
      { text: 'Array', anchor: '' },
      { text: 'Noen arraymetoder', anchor: '#arraymetoder' },

      { text: 'Oppgaver', anchor: '#sectionTasks' }
    ]
  },
  {
    id: 'part4',
    title: 'Del 4: Betingelser',
    links: [
      { text: 'Intro', anchor: '' },
      { text: 'Sammenligne verdier', anchor: '#sammenligningsoperatorer'},
      { text: 'If', anchor: '#ifsetning'},
      { text: 'If-else', anchor: '#ifelse'},
      { text: 'If-elif-else', anchor: '#ifelifelse'},
      { text: 'Kombinere betingelser', anchor: '#kombinering'},
      { text: 'Oppgaver', anchor: '#sectionTasks' }
    ]
  },
  {
    id: 'part5',
    title: 'Del 5: Løkker',
    links: [
      { text: 'Intro', anchor: '' },
      { text: 'For-løkker', anchor: '#for' },
            { text: 'Iterere over string', anchor: '#forstring' },

      { text: 'Iterere over array', anchor: '#forarray' },
      { text: 'While-løkker', anchor: '#while' },
      { text: 'Break og Continue', anchor: '#breakcontinue' },
      { text: 'Oppgaver', anchor: '#sectionTasks' }
    ]
  },
  {
    id: 'part6',
    title: 'Del 6: Funksjoner',
    links: [
      { text: 'Intro', anchor: '' },
      { text: 'Lage en funksjon', anchor: '#lagefunksjoner' },
      { text: 'Parametere/argumenter', anchor: '#parametere' },
      { text: 'Returnere verdier', anchor: '#return' },
      { text: 'For Each', anchor: '#foreach' },

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
  {
    id: 'part11',
    title: 'Del 11: Input',
    links: []
  },
 
];

export default jsCourseSections;