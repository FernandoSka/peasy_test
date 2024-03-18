// personDataProxy.js

class PersonDataProxy {

    constructor() {
      this._data = [];
    }
  
    getById(id) {
      var person = this._findBy(id);
      return Promise.resolve(person);
    }
  
    getAll() {
      return Promise.resolve(this._data);
    }
  
    insert(data) {
      data.id = this._data.length + 1;
      var newPerson = Object.assign({}, data);
      this._data.push(newPerson);
      return Promise.resolve(data);
    }
  
    update(data) {
      var person = this._findBy(data.id);
      Object.assign(person, data);
      return Promise.resolve(data);
    }
  
    destroy(id) {
      var person = this._findBy(id);
      var index = this._data.indexOf(person);
      this._data.splice(index, 1);
      return Promise.resolve();
    }
  
    _findBy(id) {
      var person = this._data.filter((function(p) {
        return p.id === id;
      }))[0];
      return person;
    }
  
  }
  
  module.exports = PersonDataProxy;
  