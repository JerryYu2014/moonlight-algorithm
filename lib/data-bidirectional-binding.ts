// // data bidirectional binding

// function defineReactive(data: any, key: any, val: any) {
//   // 递归遍历所有子属性
//   observe(val);

//   const dep = new Dep();
//   const watcher = new Watcher();

//   Object.defineProperty(data, key, {
//     enumerable: true,
//     configurable: true,
//     // writable: false,
//     // value: undefined,
//     get: function () {
//       if (true) {
//         dep.addSub(watcher); // 在这里添加一个订阅者
//       }
//       return val;
//     },
//     set: function (newVal) {
//       // val = newVal;
//       // console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');

//       if (val === newVal) {
//         return;
//       }
//       val = newVal;
//       // console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
//       dep.notify(); // 如果数据变化，通知所有订阅者
//     }
//   });
// }

// class Dep {
//   private subs: Array<any> = [];

//   public addSub(sub: any) {
//     this.subs.push(sub);
//   }
//   public notify() {
//     this.subs.forEach(function (sub: any) {
//       sub.update();
//     });
//   }
// }

// /**
//  * 
//  * @param data 
//  */
// export function observe(data: any) {
//   if (!data || typeof data !== 'object') {
//     return;
//   }
//   Object.keys(data).forEach(function (key) {
//     defineReactive(data, key, data[key]);
//   });
// };

// class Watcher {
//   private cb: any;
//   private vm: any;
//   private exp: any;
//   private value: any;

//   constructor(vm: any, exp: any, cb: any) {
//     this.cb = cb;
//     this.vm = vm;
//     this.exp = exp;
//     this.value = this.get();  // 将自己添加到订阅器的操作
//   }

//   public update() {
//     this.run();
//   };

//   public run() {
//     var value = this.vm.data[this.exp];
//     var oldVal = this.value;
//     if (value !== oldVal) {
//       this.value = value;
//       this.cb.call(this.vm, value, oldVal);
//     }
//   };

//   public get() {
//     // Dep.target = this;  // 缓存自己
//     const value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
//     // Dep.target = null;  // 释放自己
//     return value;
//   }

// }

// // function Watcher(vm: any, exp: any, cb: any) {
// //   this.cb = cb;
// //   this.vm = vm;
// //   this.exp = exp;
// //   this.value = this.get();  // 将自己添加到订阅器的操作
// // }
// // Watcher.prototype = {
// //   update: function () {
// //     this.run();
// //   },
// //   run: function () {
// //     var value = this.vm.data[this.exp];
// //     var oldVal = this.value;
// //     if (value !== oldVal) {
// //       this.value = value;
// //       this.cb.call(this.vm, value, oldVal);
// //     }
// //   },
// //   get: function () {
// //     Dep.target = this;  // 缓存自己
// //     var value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
// //     Dep.target = null;  // 释放自己
// //     return value;
// //   }
// // };
