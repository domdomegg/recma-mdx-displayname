import type { VFile } from 'vfile';
import { compile } from '@mdx-js/mdx';
// This is a bit of a hack. We process this file as ESM because @mdx-js/mdx
// is ESM and transpiling it and all its dependencies to CJS is a pain.
// However, we want to export a CJS module from ../src/index so it's compatible
// with both CJS and ESM projects, particularly as Next.js defaults to CJS.
// But this CJS export throws TypeScript off when compiling it because it
// uses incompatible syntax, so rather than import that we import the built
// version which it is happy to do. We build as part of the pretest script.
import recmaMdxDisplayname from '../dist/index';

const input = { value: '# sample doc\nwith text', path: 'pages/doc.mdx' };

test('generates correct statement', async () => {
  const vfile = await compile(input, {
    recmaPlugins: [recmaMdxDisplayname],
  });

  expect(vfile.value.toString().endsWith('MDXContent.displayName = "MDXContent";\n')).toBe(true);
});

test('generates correct statement with generator', async () => {
  const vfile = await compile(input, {
    recmaPlugins: [[recmaMdxDisplayname, (vfile: VFile) => `MDXContent(${vfile.path})`]],
  });

  expect(vfile.value.toString().endsWith('MDXContent.displayName = "MDXContent(pages/doc.mdx)";\n')).toBe(true);
});
