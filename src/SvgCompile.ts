
/**
 * 简单的编译器(抽象语法树AST原理)
 */
import { svgCompile } from '../lib/svg-compile';

export default function SvgCompile() {
  // 调用svgCompile编译器
  // const code = 'Paper 0 Pen 100 Line 0 50 100 50';
  const code = 'Paper 0 Pen 100 Line 0 50 100 100';
  const svg = svgCompile(code);
  console.log(svg);
  (document.getElementById('svg-compile') as any).innerHTML = svg;
}
