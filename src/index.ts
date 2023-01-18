import type { Plugin } from 'unified';
import type { Program } from 'estree';

const recmaMdxDisplaynamePlugin: Plugin<[], Program> = () => (ast) => {
  ast.body.splice(ast.body.length - 2, 0, {
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
        value: 'MDXContent',
      },
    },
  });
  return ast;
};

export default recmaMdxDisplaynamePlugin;
module.exports = recmaMdxDisplaynamePlugin;
module.exports.default = recmaMdxDisplaynamePlugin;
