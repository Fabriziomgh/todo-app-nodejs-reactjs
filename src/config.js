import { config } from 'dotenv';

config();

export const SECRET_KEY = process.env.TOKEN_SECRET;

export const PORT = process.env.PORT ?? 3000;
export const MONGODB_URI =
   process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/merndb';

export const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:5173';
