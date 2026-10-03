import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend files from the same directory
app.use(express.static(__dirname));

// Endpoint to fetch Tor relays from Onionoo API
app.get('/api/relays', async (req, res) => {
  try {
    const response = await fetch('https://onionoo.torproject.org/details?limit=50');
    if (!response.ok) {
      throw new Error(`Failed to fetch from Onionoo: ${response.statusText}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching Tor relays:', error);
    res.status(500).json({ error: 'Failed to fetch Tor relays', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Tor Module server running at http://localhost:${PORT}`);
});
