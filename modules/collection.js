// Abstract class
class Collection {
  classType = null;  // Must be defined

  constructor() {
    this.all = [];
  }

  add(...args) {
    this.all.push(new this.classType(...args));
  }

  draw(ctx) {
    for (var i of this.all) {
      i.draw(ctx);
    }
  }
}
