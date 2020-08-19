/**
 * 简单的vue框架（双向绑定原理）
 */
import { MyVue } from '../lib/my-vue';

export default function SimpleVue() {
  const myvue = new MyVue({
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
}
