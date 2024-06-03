// Asynchronous function that makes you API call to the Hugging face API
const axios = require('axios');
let ready = false; // Add ready flag

async function summarizeText(text) {
  if (!ready) {
    return Promise.reject(new Error('Model is not ready yet.')); // Return error if not ready
  }

  let data = JSON.stringify({
    "inputs":text,
    "parameters": {
      "max_length": 1000,
      "min_length": 30
    }
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
    },
    data : data
  };

  try {
    const response = await axios.request(config);
    return response.data[0].summary_text
  }
  catch (error) {
    console.log(error);
  }


}

//Initialize the model
(async () => {
  //your existing code to load the model
  ready = true; // Set the ready flag after the model is loaded
})();

//Allowed to be called outside this file
module.exports = summarizeText