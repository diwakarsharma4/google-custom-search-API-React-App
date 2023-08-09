const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());

const GOOGLE_API_KEY = 'AIzaSyB5m97w2TAMzx5yaWYLySM0sYSekFII0-g'; 
const SEARCH_ENGINE_ID = '950e30719f49e4a59';


//api to get data
app.get('/api/:search', async (req, res) => {
    const query = req.params.search;
    // console.log("b :", query);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`
      );
      try {
        // console.log("b :", response.data.items[0].pagemap.imageobject);
        res.json(response.data.items[0].pagemap.imageobject);
      } catch (error) {
        // console.error('No images found', error);
        res.status(500).json({ error: 'No images found' });
      }
    } catch (error) {
      // console.error('Error fetching search results:', error);
      res.status(500).json({ error: 'An error occurred while fetching search results.' });
    }
  });
  
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
