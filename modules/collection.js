// Abstract class
class Collection {
  classType = null;  // Must be defined

  constructor() {
    this.all = new Map();
    this.nextId = 0;
  }

  add(...args) {
    var new_obj = new this.classType(...args);
    new_obj.id = this.nextId;

    this.all.set(this.nextId, new_obj);
    this.nextId += 1;
  }

  draw(...args) {
    this.all.forEach((item, i) => {
      item.draw(...args);
    });
  }

  find(id) {
    return this.all.get(id);
  }

  remove(id) {
    this.all.delete(id);
  }
}
