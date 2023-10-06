Bryan Nguyen (bnguy266@calpoly.edu)

I'll place any questions I have for you here (to remind myself to ask you):


Lastly, if you want debug information (like knowing when a GET, POST method is called in the backend), 
set a DEBUG environment variable which will tell node to print debug messages.  
For example, on a Mac/Linux you would type the following before starting nodemon/node.
export DEBUG='express:router'

On Windows, you would type the following before starting nodemon/node.
set DEBUG=express:router



For security reasons, browsers restrict cross-origin HTTP requests—for resources on a different 
server than that which served the page—initiated from scripts. This means that a web application calling 
APIs can only request resources from the same origin the application was loaded from, unless the response 
from other origins includes the right CORS headers.



should i replace the id if the person already has an id