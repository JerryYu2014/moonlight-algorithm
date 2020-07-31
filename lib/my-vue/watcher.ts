import { Dep } from './observer'

export default class Watcher {
  private cb: any;
  private vm: any;
  private exp: any;
  private value: any;  // 将自己添加到订阅器的操作

  constructor(_vm: any, _exp: any, _cb: any) {
    this.cb = _cb;
    this.vm = _vm;
    this.exp = _exp;
    this.value = this.get();
  }

  public update() {
    this.run();
  }

  public run() {
    var value = this.vm.data[this.exp];
    var oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  }

  private get() {
    Dep.target = this;  // 缓存自己
    var value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
    Dep.target = null;  // 释放自己
    return value;
  }
}