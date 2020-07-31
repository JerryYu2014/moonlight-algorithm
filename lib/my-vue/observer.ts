
export default class Observer {
  private data: any;

  constructor(_data: any) {
    this.data = _data;
  }

  public walk(data: any) {
    var self = this;
    Object.keys(data).forEach(function (key: any) {
      self.defineReactive(data, key, data[key]);
    });
  }

  public defineReactive(data: any, key: any, val: any) {
    var dep = new Dep();
    var childObj = observe(val);
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function getter() {
        if (Dep.target) {
          dep.addSub(Dep.target);
        }
        return val;
      },
      set: function setter(newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        dep.notify();
      }
    });
  }

  // public observe(value: any, vm: any = null) {
  //   if (!value || typeof value !== 'object') {
  //     return;
  //   }
  //   return new Observer(value);
  // };
}

export function observe(value: any, vm: any = null) {
  if (!value || typeof value !== 'object') {
    return;
  }
  return new Observer(value);
};

export class Dep {
  private subs: any;

  static target: any;

  constructor() {
    this.subs = [];
  }

  public addSub(sub: any) {
    this.subs.push(sub);
  }

  public notify() {
    this.subs.forEach(function (sub: any) {
      sub.update();
    });
  }
}