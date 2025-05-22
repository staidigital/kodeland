export default [
  {
    id: 'sectionIntro',
    title: 'Hva er SQL?',
    blocks: [
      {
        type: 'paragraph',
        text: 'SQL står for **Structured Query Language** og brukes for å hente, manipulere og lagre data i relasjonsdatabaser.'
      },
      {
        type: 'paragraph',
        text: 'Den mest grunnleggende spørringen er `SELECT`, som henter data fra en tabell.'
      },
      {
        type: 'code',
        language: 'sql',
        code: 'SELECT * FROM brukere;'
      },
      {
        type: 'task',
        number: 1,
        title: 'Hent alle produkter',
        description: 'Lag en enkel SQL-spørring for å hente alle rader fra en tabell som heter `produkter`.',
        solution: {
          code: 'SELECT * FROM produkter;',
          script: ''
        }
      }
    ]
  }
];
