import type { Program } from 'estree';
import recmaMdxDisplaynamePlugin from '../src/index';

// This doesn't work while importing ES modules is still a pain
// import { compile } from '@mdx-js/mdx';
// test.skip('real mdx', async () => {
//   expect(await compile("# sample doc\nwith text", {
//     recmaPlugins: [recmaMdxDisplaynamePlugin],
//   })).toMatchInlineSnapshot();
// });

const newAst = (): Program => ({
  type: 'Program',
  body: [{ type: 'EmptyStatement' }, { type: 'EmptyStatement' }, { type: 'EmptyStatement' }],
  sourceType: 'module',
});

const snapshot = `
Object {
  "body": Array [
    Object {
      "type": "EmptyStatement",
    },
    Object {
      "expression": Object {
        "left": Object {
          "computed": false,
          "object": Object {
            "name": "MDXContent",
            "type": "Identifier",
          },
          "optional": false,
          "property": Object {
            "name": "displayName",
            "type": "Identifier",
          },
          "type": "MemberExpression",
        },
        "operator": "=",
        "right": Object {
          "type": "Literal",
          "value": "MDXContent",
        },
        "type": "AssignmentExpression",
      },
      "type": "ExpressionStatement",
    },
    Object {
      "type": "EmptyStatement",
    },
    Object {
      "type": "EmptyStatement",
    },
  ],
  "sourceType": "module",
  "type": "Program",
}
`;

test('mock ast using import', async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const result: Program = recmaMdxDisplaynamePlugin()(newAst());

  expect(result).toMatchInlineSnapshot(snapshot);
});

test('mock ast using require', async () => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const result: Program = require('../src/index')()(newAst());

  expect(result).toMatchInlineSnapshot(snapshot);
});

test('mock ast using require.default', async () => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const result: Program = require('../src/index').default()(newAst());

  expect(result).toMatchInlineSnapshot(snapshot);
});
