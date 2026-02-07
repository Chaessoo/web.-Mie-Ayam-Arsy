import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
  app.listen(port, () => console.log(`Serving production build at http://localhost:${port}`));
} else {
  app.get('/', (req, res) => {
    res.send('No build found. Run `npm run dev` for development or `npm run build` then `npm start` to serve the production build.');
  });
  app.listen(port, () => console.log(`Dev stub running at http://localhost:${port}`));
}
