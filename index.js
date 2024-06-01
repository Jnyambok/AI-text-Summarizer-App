// express is a web framework that simplifies the process of creating web applications.
// Importing the express module and creating an instance of the express application.
const express = require('express');
const app = express();
const port = 3000;
const summarizeText = require('./summarize.js');

// Parses JSON bodies (as sent by API clients)
app.use(express.json());

//  This allows you to keep your server-side code separate from your front-end code
app.use(express.static('public'));

// Handling the POST request to the /summarize endpoint
app.post('/summarize',(req,res) =>
  {
    //get the text from the summarize textbox
    const text = req.body.text_to_summarize;
    //call the summarizeText function,passing in the text
    summarizeText(text)
    .then(response => {
      res.send(response); // Send the summary text as a response to the client
    })
    .catch(error => {
      console.log(error.message);
    })

    
  });



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
