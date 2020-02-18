if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const getYelpAPI = async () => {
  return axios.get(
    'https://api.yelp.com/v3/businesses/search?location=2650 NW 5th Ave Miami FL',
    {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`
      }
    }
  );
};

/**
 * Calls our proxied API, which helps us bypass
 * CORS issues and let's us hide API keys.
 */
app.get('/api/yelp', async (request, response) => {
  try {
    const resp = await getYelpAPI();
    response.json(resp.data.businesses);
  } catch (e) {
    console.log(e);
    response.status(500).send({ error: e.message });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API listening on port ${port}...`);
});
