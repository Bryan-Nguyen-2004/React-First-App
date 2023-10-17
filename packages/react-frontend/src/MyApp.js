// src/MyApp.js
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

// src/MyApp.js
function MyApp() {
  const [characters, setCharacters] = useState([]);

  /* Note that this function does not return the data immediately—it instead returns a Promise. 
  Promises are useful when we need to perform an operation which will take some time to finish, 
  or may never finish. We don't want our code to wait for the data to come back to the server, 
  because that would make our app seem unresponsive to the user. */
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  /* In this function, note that we're calling fetch with the same route, but passing some additional 
  options: method to make it a POST instead of the default GET, body to put the person data into the 
  body of the request, and a Content-Type header to tell the server that the body contains a JSON-formatted 
  object. We also use the Javascript built-in JSON.stringify to convert, or serialize, the in-memory object 
  to a string which we can send "over the wire". */
  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function deleteUser(id) {
    const promise = fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
    return promise;
  }

  function removeOneCharacter(index) {
    deleteUser(characters[index]._id)
      .then((response) => {
        if (response.status === 204) {
          const updated = characters.filter((_, i) => i !== index);
          setCharacters(updated);
        } else if (response.status === 404) {
          throw new Error(`${response.status}: Resource not found`);
        } else {
          throw new Error(`${response.status}: Unable to delete user`);
        }
      })
      .then((error) => {
        console.log(error);
      });
  }

  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error("Unable to post user");
        }
      })
      .then((json) => {
        setCharacters([...characters, json]);
      })
      .catch((error) => {
        console.log(error);
      });
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
