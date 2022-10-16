import express from 'express';
import cors from 'cors';

import { usersRouter } from './routers/usersRouter.js';
import { urlsRouter } from './routers/urlsRouter.js';
import { urlsDataRouter } from './routers/urlsDataRouter.js';

const server = express();
server.use(express.json());
server.use(cors());

server.use(usersRouter);
server.use(urlsRouter);
server.use(urlsDataRouter);

server.listen(4000, () => {
    console.log('Server listening on port 4000...');
  });