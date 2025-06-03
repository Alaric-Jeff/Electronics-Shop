import express from 'express';
import dotenv from 'dotenv';
import initRoute from './routers/initRoute.js';
import logger from './utils/logger.js';


dotenv.config();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
await initRoute(app);

app.listen(process.env.HTTP_PORT || 3000, () => {
  logger.info(`Server is running on port ${process.env.HTTP_PORT || 3000}`);
});
