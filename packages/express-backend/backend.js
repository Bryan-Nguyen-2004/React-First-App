/* First, we import the Express module. Express will work as an HTTP middleware dispatching 
HTTP calls to the routes we define in the file and also sending back responses that we'll program. */
import express from "express";

/* Next, we create an instance of Express and define a constant to represent the port number we'll 
use to listen to incoming HTTP requests. */
const app = express();
const port = 8000;

/* On the fourth line, we set up our express app to process incoming data in JSON format. With 
that, Express (as a middleware) will allow us to access JSON data seamlessly in memory. */
app.use(express.json());

/* Then, we set up our first API endpoint with the app.get function.  */
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const users = { 
    users_list : [
        { 
            id : 'xyz789',
            name : 'Charlie',
            job: 'Janitor',
        },
        {
            id : 'abc123', 
            name: 'Mac',
            job: 'Bouncer',
        },
        {
            id : 'ppp222', 
            name: 'Mac',
            job: 'Professor',
        }, 
        {
            id: 'yat999', 
            name: 'Dee',
            job: 'Aspring actress',
        },
        {
            id: 'zap555', 
            name: 'Dennis',
            job: 'Bartender',
        }
    ]
};

const findUserByName = (name) => users['users_list'].filter( (user) => user['name'] === name); 
const findUserByJob = (job) => users['users_list'].filter( (user) => user['job'] === job); 
const findUserById = (id) => users['users_list'].find((user) => user['id'] === id);
const addUser = (user) => {
    users['users_list'].push(user);
    return user;
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result = users

    if (name) {
        result = {users_list: findUserByName(name)};
    }
    if (job) {
        result = {users_list: findUserByJob(job)};
    }

    res.send(result);
});

app.get('/users/:id', (req,res) => {
    const id = req.params.id;
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    users.users_list = users['users_list'].filter((user) => user['id'] !== id);
    res.send();
})

/* Finally, we make our backend server listen to incoming http requests on the defined port number. */
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      

/*
Lastly, if you want debug information (like knowing when a GET, POST method is called in the backend), 
set a DEBUG environment variable which will tell node to print debug messages.  
For example, on a Mac/Linux you would type the following before starting nodemon/node.

export DEBUG='express:router'
*/

/* ask if delete is correct w/ changing list to let */
/* ask for purpose of helper functions */