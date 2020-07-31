import Watcher from './watcher';

export default class Compile {
  private vm: any;
  el: any;
  fragment: any;

  constructor(el: any, vm: any) {
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null;
    this.init();
  }

  public init(): void {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el);
      this.compileElement(this.fragment);
      this.el.appendChild(this.fragment);
    } else {
      console.log('Dom元素不存在');
    }
  }

  public nodeToFragment(el: any): any {
    const fragment = document.createDocumentFragment();
    let child = el.firstChild;
    while (child) {
      // 将Dom元素移入fragment中
      fragment.appendChild(child);
      child = el.firstChild
    }
    return fragment;
  }

  public compileElement(el: any) {
    const childNodes = el.childNodes;
    const self = this;
    [].slice.call(childNodes).forEach(function (node: any) {
      var reg = /\{\{(.*)\}\}/;
      const text = node.textContent;

      if (self.isElementNode(node)) {
        self.compile(node);
      } else if (self.isTextNode(node) && reg.test(text)) {
        self.compileText(node, reg.exec(text)![1]);
      }

      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node);
      }
    });
  }

  public compile(node: any) {
    const nodeAttrs = node.attributes;
    const self = this;
    Array.prototype.forEach.call(nodeAttrs, function (attr) {
      const attrName = attr.name;
      if (self.isDirective(attrName)) {
        const exp = attr.value;
        const dir = attrName.substring(2);
        if (self.isEventDirective(dir)) {  // 事件指令
          self.compileEvent(node, self.vm, exp, dir);
        } else {  // v-model 指令
          self.compileModel(node, self.vm, exp, dir);
        }
        node.removeAttribute(attrName);
      }
    });
  }

  public compileText(node: any, exp: any) {
    const self = this;
    const initText = this.vm[exp];
    this.updateText(node, initText);
    new Watcher(this.vm, exp, function (value: any) {
      self.updateText(node, value);
    });
  }

  public compileEvent(node: any, vm: any, exp: any, dir: any) {
    var eventType = dir.split(':')[1];
    var cb = vm.methods && vm.methods[exp];

    if (eventType && cb) {
      node.addEventListener(eventType, cb.bind(vm), false);
    }
  }

  public compileModel(node: any, vm: any, exp: any, dir: any) {
    var self = this;
    var val = this.vm[exp];
    this.modelUpdater(node, val);
    new Watcher(this.vm, exp, function (value: any) {
      self.modelUpdater(node, value);
    });

    node.addEventListener('input', function (e: any) {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }
      self.vm[exp] = newValue;
      val = newValue;
    });
  }

  public updateText(node: any, value: any) {
    node.textContent = typeof value == 'undefined' ? '' : value;
  }

  public modelUpdater(node: any, value: any, oldValue: any = null) {
    node.value = typeof value == 'undefined' ? '' : value;
  }

  public isDirective(attr: any) {
    return attr.indexOf('v-') == 0;
  }

  public isEventDirective(dir: any) {
    return dir.indexOf('on:') === 0;
  }
  public isElementNode(node: any) {
    return node.nodeType == 1;
  }

  public isTextNode(node: any) {
    return node.nodeType == 3;
  }
}