import PersonService from './PersonService'
import PersonDataProxy from './PersonDataProxy'

var personService = new PersonService(new PersonDataProxy());
var command = personService.insertCommand({name: "James Morrison"});

command.execute().then(result => {
  if (result.success) {
    console.log(result.value); // prints the inserted object with the assigned id
  }
  else {
    console.log(result.errors[0]); // prints {association: "name", message: "Name cannot be Jimi Hendrix"}
  }
});