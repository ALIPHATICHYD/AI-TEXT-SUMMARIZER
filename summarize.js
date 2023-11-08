// Axios is the library used to make the API call
const axios = require('axios');

// Define the Hugging Face API endpoint and access token
const HF_API_ENDPOINT = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';
const HF_ACCESS_TOKEN = process.env['ACCESS_TOKEN'];

// This is the function where the call to the Hugging Face API is made. Returns the summarized text as a string.
async function summarize(text) {
  try {
    const requestBody = {
      inputs: text,
      parameters: {
        max_length: 100,
        min_length: 30,
      },
    };

    const response = await axios.post(HF_API_ENDPOINT, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HF_ACCESS_TOKEN}`,
      },
    });

    if (response.data && response.data[0] && response.data[0].summary_text) {
      return response.data[0].summary_text;
    } else {
      throw new Error('Invalid response from the Hugging Face API.');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Export the summarize function to make it available for use in other modules
module.exports = summarize;
