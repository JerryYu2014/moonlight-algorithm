import { observe } from './observer';
import Compile from './compile';

export default class myVue {

  private options: any;
  private data: any;
  private methods: any;

  constructor(_options: any) {
    this.options = _options;
    this.data = _options.data;
    this.methods = _options.methods;

    const self = this;

    Object.keys(this.data).forEach(function (key) {
      self.proxyKeys(key);
    });

    observe(this.data);
    new Compile(_options.el, this);
    _options.mounted.call(this); // 所有事情处理好后执行mounted函数
  }

  public proxyKeys(key: any) {
    var self = this;
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: function getter() {
        return self.data[key];
      },
      set: function setter(newVal: any) {
        self.data[key] = newVal;
      }
    });
  }

}