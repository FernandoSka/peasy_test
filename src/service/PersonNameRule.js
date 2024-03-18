// personNameRule.js
import { Rule } from "peasy-js";


class PersonNameRule extends Rule {

  constructor(name, field) {
    super();
    this.name = name;
    this.association = field // optional
  }

  _onValidate() {
    if (this.name === "Jimi Hendrix") {
      this._invalidate("Name cannot be Jimi Hendrix");
    }
    return Promise.resolve();
  }
}

export default PersonNameRule;
