import type { Program } from 'estree';
import recmaMdxDisplaynamePlugin from '../src/index';

// This doesn't work while importing ES modules is still a pain
// import { compile } from '@mdx-js/mdx';
// test.skip('real mdx', async () => {
//   expect(await compile("# sample doc\nwith text", {
//     recmaPlugins: [recmaMdxDisplaynamePlugin],
//   })).toMatchInlineSnapshot();
// });

test('mock ast', async () => {
  const ast: Program = {
    type: 'Program',
    body: [{ type: 'EmptyStatement' }, { type: 'EmptyStatement' }, { type: 'EmptyStatement' }],
    sourceType: 'module',
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const result: Program = recmaMdxDisplaynamePlugin()(ast);

  expect(result).toMatchInlineSnapshot(`
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
`);
});
