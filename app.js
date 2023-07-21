import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './src/routes/index.js';
import { connectDatabase } from './src/config/db.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || '3000';

dotenv.config();

app.use(express.urlencoded({ extended: true }));
connectDatabase();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`server Listening at http://localhost:${port}`);
});
