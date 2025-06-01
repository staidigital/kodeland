import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import manifest from '$lib/data/sql/manifest.js';

const sectionImports: Record<string, () => Promise<any>> = {
  part1: () => import('$lib/data/sql/section1.js'),
  // Add more like:
  // part2: () => import('$lib/data/sql/section2.js')
};

export const load: PageLoad = async ({ params }) => {
  const currentId = params.part;
  const index = manifest.findIndex((entry: any) => entry.id === currentId);

  if (index === -1 || !sectionImports[currentId]) {
    throw error(404, `Del '${currentId}' finnes ikke.`);
  }

  const loadSection = sectionImports[currentId];
  const sectionModule = await loadSection();

  return {
    sections: sectionModule.default,
    partNum: currentId,
    manifest,
    course: 'sql',
    prevPart: index > 0 ? `/sql/${manifest[index - 1].id}` : '',
    nextPart: index < manifest.length - 1 ? `/sql/${manifest[index + 1].id}` : '',
  };
};
