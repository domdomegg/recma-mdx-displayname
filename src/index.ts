import type { Plugin } from 'unified';
import type { Program } from 'estree';
import type { VFile } from 'vfile';

type DisplayNameGenerator = (vfile: VFile) => string

const recmaMdxDisplayname: Plugin<[DisplayNameGenerator?], Program> = (generator = () => 'MDXContent') => (ast, vfile) => {
  ast.body.push({
    type: 'ExpressionStatement',
    expression: {
      type: 'AssignmentExpression',
      operator: '=',
      left: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: 'MDXContent',
        },
        property: {
          type: 'Identifier',
          name: 'displayName',
        },
        computed: false,
        optional: false,
      },
      right: {
        type: 'Literal',
        value: generator(vfile),
      },
    },
  });
};

export = recmaMdxDisplayname;
