/**
 * 简单的编译器(理解抽象语法树AST)
 */

import lexical from './lexical';
import parser from './parser';
import transformer from './transformer';
import generator from './generator';

/**
 * svg 编译器
 * @param {*} code
 */
export function svgCompile(code) {
  return generator(transformer(parser(lexical(code))));
}
