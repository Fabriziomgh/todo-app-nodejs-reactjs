import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.js';
import tasksRouter from './routes/tasks.routes.js';
import cookieParser from 'cookie-parser';
import { FRONTEND_URL } from './config.js';

const app = express();

app.use(morgan('dev'));
app.use(
   cors({
      origin: FRONTEND_URL,
      credentials: true,
   })
);
app.use(express.json());
app.use(cookieParser());
app.use('/api', authRouter);
app.use('/api', tasksRouter);

export default app;
