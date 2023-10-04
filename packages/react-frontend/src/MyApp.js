// src/MyApp.js
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

// src/MyApp.js
function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  function updateList(person) {
    setCharacters([...characters, person]);
  }

  /* Note that this function does not return the data immediately—it instead returns a Promise. 
  Promises are useful when we need to perform an operation which will take some time to finish, 
  or may never finish. We don't want our code to wait for the data to come back to the server, 
  because that would make our app seem unresponsive to the user. */
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
