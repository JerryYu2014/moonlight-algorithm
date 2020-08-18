/**
 * 简单的vue框架（双向绑定原理）
 */
import { MyVue } from '../lib/my-vue/index';

export const myvue = new MyVue({
  el: '#my-vue',
  data: {
    title: 'hello world',
    name: 'canfoo'
  },
  methods: {
    clickMe: function () {
      // this.title = 'hello world';
    }
  },
  mounted: function () {
    window.setTimeout(() => {
      // this.title = '你好';
    }, 1000);
  }
});

/**
 * 简单的编译器(抽象语法树AST原理)
 */
import { svgCompile } from '../lib/svg-compile/compile';

// 调用svgCompile编译器
// const code = 'Paper 0 Pen 100 Line 0 50 100 50';
const code = 'Paper 0 Pen 100 Line 0 50 100 100';
const svg = svgCompile(code);
console.log(svg);
(document.getElementById('svg-compile') as any).innerHTML = svg;
