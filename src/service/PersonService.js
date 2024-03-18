// personService.js
import { BusinessService } from "peasy-js";
import PersonNameRule from "./PersonNameRule"


class PersonService extends BusinessService {

    constructor(dataProxy) {
        super(dataProxy);
    }

    _getRulesForInsertCommand(person, context) {
        return Promise.resolve([
          new PersonNameRule(person.name, person.field)
        ]);
      }

}

export default PersonService;