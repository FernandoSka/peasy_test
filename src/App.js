import logo from './logo.svg';
import './App.css';
import './service/example.js'
import React, { useState, useEffect } from 'react';
import PersonService from './service/PersonService'
import PersonDataProxy from './service/PersonDataProxy'

var personService = new PersonService(new PersonDataProxy());
var get_command = personService.getAllCommand();


function App() {
  const [names, setNames] = useState([]);
  const [names_load, setNamesLoad] = useState(false);
  const [name_create, setNameCreate] = useState("");
  


  useEffect(() => {
    const get_names = ()=>{

      get_command.execute().then(result => {
        if (result.success) {
          setNames(result.value)
        }
      });
      setNamesLoad(false);
      
    }
    if (names_load){
      get_names();
    }
  });
  const set_names_load = ()=>{
    setNamesLoad(true);
  }
  function handleSubmit(e) {
    e.preventDefault();
    var command = personService.insertCommand({name: name_create, field: "nombre"});
    
    command.execute().then(result => {
      if (result.success) {
        console.log(result.value); // prints the inserted object with the assigned id
        set_names_load()
      }
      else {
        console.log(result.errors); // prints {association: "name", message: "Name cannot be Jimi Hendrix"}
      }
    });

  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <table>
          <thead>
            <th>ID</th>
            <th>Name</th>
          </thead>
          <tbody>
          {names.map((item, index) => (
            <tr>
              
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
            )
          )}
          </tbody>
        </table>
        
        <h1>Insertar nombre</h1>
        <form onSubmit={handleSubmit}>
          <input onChange={event=> {setNameCreate(event.target.value)}} />
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
