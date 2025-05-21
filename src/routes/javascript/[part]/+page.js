import manifest from '$lib/data/javascript/manifest.js';

const sectionImports = {
  part1: () => import("$lib/data/javascript/section1.js"),
  part2: () => import("$lib/data/javascript/section2.js"),
  part3: () => import("$lib/data/javascript/section3.js"),
  part4: () => import("$lib/data/javascript/section4.js"),
  part5: () => import("$lib/data/javascript/section5.js"),
  part6: () => import("$lib/data/javascript/section6.js"),
  part7: () => import("$lib/data/javascript/section7.js"),
  part8: () => import("$lib/data/javascript/section8.js"),
  part9: () => import("$lib/data/javascript/section9.js"),
};

export async function load({ params }) {
  const currentId = params.part;
  const index = manifest.findIndex((entry) => entry.id === currentId);

  if (index === -1) {
    return {
      sections: [],
      partNum: '',
      prevPart: '',
      nextPart: '',
    };
  }

  const loadSection = sectionImports[currentId];
  const sectionModule = await loadSection();

  return {
    sections: sectionModule.default,
    partNum: currentId,
    prevPart: index > 0 ? `/javascript/${manifest[index - 1].id}` : '',
    nextPart: index < manifest.length - 1 ? `/javascript/${manifest[index + 1].id}` : '',
  };
}
