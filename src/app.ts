import express from 'express';
import { initializeAPI } from '../api';

const app = express();
const port = 3000;

// Middleware, um JSON-Body-Parsing zu ermöglichen
app.use(express.json());

// GET-Endpunkt für /hello-world
app.get('/hello-world', (_req, res) => {
  res.send('Hello, World!');
});

// GET-Endpunkt für / "/"
app.get('/hi', (_req, res) => {
  res.send('Welcome to the API');
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
