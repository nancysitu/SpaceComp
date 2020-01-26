// Abstract class
class Collection {
  classType = null;  // Must be defined

  constructor() {
    this.all = {};
    this.nextId = 0;
  }

  add(...args) {
    var new_obj = new this.classType(...args);
    new_obj.id = this.nextId;

    this.all[this.nextId] = new_obj;
    this.nextId += 1;
  }

  draw(ctx) {
    for (var i of Object.values(this.all)) {
      i.draw(ctx);
    }
  }
}
