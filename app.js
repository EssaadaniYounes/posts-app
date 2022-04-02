//Constants
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import faker from '@faker-js/faker';

const app = express();

//dotenv configuration
dotenv.config();

//Data base connection
mongoose.connect(process.env.DATABASE_CONNECT)
    .then(() => console.log('connected'))
    .catch(e => console.log(e));

//Routes
import auth from './routes/auth.js'
import categories from './routes/Categories.js'

//Middlewares
app.use(express.json());
app.use('/api/user', auth);
app.use('/api/category', categories);

//App
app.listen(3000, () => {
    console.log("App is runing");
})