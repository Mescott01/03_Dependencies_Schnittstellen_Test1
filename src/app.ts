import express from 'express';
import { initializeAPI } from '../api';

const app = express();
const port = 3000;

// Middleware, um JSON-Body-Parsing zu ermöglichen
app.use(express.json());

// GET-Endpunkt für /hello-world
app.get('/hello-world', (_req, res) => {
  res.send('Hello, World!!!!');
});

// GET-Endpunkt für /twitter
app.get('/twitter', (_req, res) => {
  res.send('this is a tweet!');
});

// Initialisiere API-Endpunkte
initializeAPI(app); // 

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
