import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { usersRouter } from './routers/usersRouter.js';
import { urlsRouter } from './routers/urlsRouter.js';
import { urlsDataRouter } from './routers/urlsDataRouter.js';

const server = express();
server.use(express.json());
server.use(cors());

server.use(usersRouter);
server.use(urlsRouter);
server.use(urlsDataRouter);

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}...`);
});