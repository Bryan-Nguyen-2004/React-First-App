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

/* Finally, we make our backend server listen to incoming http requests on the defined port number. */
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      