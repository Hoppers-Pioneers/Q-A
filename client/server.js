import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.VITE_PORT;
const app = new express();

app.use(express.static('./dist'));

app.listen(PORT, () => {
  console.log(`Server running at localhost:${PORT}`);
})