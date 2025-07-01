const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/ip', async (req, res) => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    res.json({ your_ip: response.data.ip });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch IP address' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
