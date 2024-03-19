import logo from './logo.svg';
import './App.css';
import './service/example.js'
import Papa from 'papaparse';
import React, { useState, useEffect } from 'react';
import ReactFileReader from "react-file-reader";
import PersonService from './service/PersonService'
import PersonDataProxy from './service/PersonDataProxy'

var personService = new PersonService(new PersonDataProxy());
var get_command = personService.getAllCommand();


function App() {
  const [names, setNames] = useState([]);
  const [names_load, setNamesLoad] = useState(false);
  const [name_create, setNameCreate] = useState("");
  
  const uploadFile = (files) => {
    // Creating the object of FileReader Class
    var read = new FileReader();

  // when readAsText will invoke, onload() method on the read object will execute.
    Papa.parse(files[0], {
      complete: function(results) {
          // results contain data; users can use the data for some operations.
            console.log("Finished:", results.data);
            var name = results.data[0][0];
            var last_name = results.data[0][1];
            var items = [];
            results.data.slice(1).forEach(element => {
              items.push({
                name: element[0],
                last_name: element[1]
              })
            });
            items.forEach(element => {
              var command = personService.insertCommand({name: element["name"] +" " + element["last_name"], field: "nombre"});

              command.execute().then(result => {
                if (result.success) {
                  console.log(result.value); // prints the inserted object with the assigned id
                  set_names_load()
                }
                else {
                  console.log(result.errors); // prints {association: "name", message: "Name cannot be Jimi Hendrix"}
                }
              });
            });

      }
    });
  };

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
        <h3> Upload a CSV file to read</h3>
        {/* creating the file upload button to upload CSV file */}
        <ReactFileReader handleFiles = {uploadFile} fileTypes={".csv"}>
          <button className="btn"> Upload </button>
        </ReactFileReader>
      </header>
    </div>
  );
}

export default App;
