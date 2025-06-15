import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import manifest from '$lib/data/sql/manifest';

const sectionImports: Record<string, () => Promise<any>> = {
    part0: () => import("$lib/data/sql/section0.js"),
    part1: () => import("$lib/data/sql/section1.js")

  // Add more like:
  // part2: () => import('$lib/data/sql/section2.js')
};

export const load: PageLoad = async ({ params }) => {
    const currentId = params.part;
    const index = manifest.findIndex((entry) => entry.id === currentId);
    
    if (index === -1 || !sectionImports[currentId]) {
      throw error(404, `Del '${currentId}' finnes ikke.`);
    }
    
    const sectionTitle = manifest[index].title;
    const loadSection = sectionImports[currentId];
    const sectionModule = await loadSection();

    return {
        sections: sectionModule.default,
        partNum: currentId,
        sectionTitle,
        prevPart: index > 0 ? `/sql/${manifest[index - 1].id}` : '',
        nextPart: index < manifest.length - 1 ? `/sql/${manifest[index + 1].id}` : '',
    };
};

