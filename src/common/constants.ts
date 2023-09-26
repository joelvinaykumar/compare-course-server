import * as dotenv from 'dotenv';
dotenv.config();

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

// export const DB_URL = `mongodb+srv://joel123:${process.env.MONGODB_PASSWORD}@cluster0.ullfa.mongodb.net/?retryWrites=true&w=majority`;

export const DB_URL = 'mongodb://127.0.0.1:27017/compare-course';
