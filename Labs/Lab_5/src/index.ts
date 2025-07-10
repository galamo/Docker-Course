import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.get('/ip', async (req, res) => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        res.json({ your_ip: response.data.ip });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch IP address' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
