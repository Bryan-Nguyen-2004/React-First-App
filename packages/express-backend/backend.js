/* First, we import the Express module. Express will work as an HTTP middleware dispatching 
HTTP calls to the routes we define in the file and also sending back responses that we'll program. */
import express from "express";
import cors from "cors";
import {
    addUser,
    getUsers,
    findUserById,
    deleteUser,
} from "./models/user-services";

/* Next, we create an instance of Express and define a constant to represent the port number we'll 
use to listen to incoming HTTP requests. */
const app = express();
const port = 8000;

/* enable all CORS requests is this one line of code: */
app.use(cors());

/* On the fourth line, we set up our express app to process incoming data in JSON format. With 
that, Express (as a middleware) will allow us to access JSON data seamlessly in memory. */
app.use(express.json());

/* Then, we set up our first API endpoint with the app.get function.  */
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    getUsers(name, job)
        .then((users) => {
            const result = { users_list: users };
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error getting users.");
        });
});

app.get("/users/:id", (req, res) => {
    const id = req.params.id;

    findUserById(id)
        .then((user) => {
            if (user) {
                res.send(user);
            } else {
                res.status(404).send("User not found.");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error finding user.");
        });
});

app.post("/users", (req, res) => {
    let user = req.body;

    addUser(user)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error adding user.");
        });
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;

    deleteUser(id)
        .then((user) => {
            if (user) {
                res.status(204).send();
            } else {
                res.status(404).send("User not found.");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error deleting user.");
        });
});

/* Finally, we make our backend server listen to incoming http requests on the defined port number. */
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
