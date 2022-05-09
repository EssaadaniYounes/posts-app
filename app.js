//Constants
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import faker from '@faker-js/faker';
import bodyParser from 'body-parser'
const app = express();

//dotenv configuration
dotenv.config();

//Data base connection
mongoose.connect(process.env.DATABASE_CONNECT)
    .then(() => console.log('connected'))
    .catch(e => console.log(e));

//Routes
import auth from './routes/auth.js'
import users from './routes/Users.js'
import categories from './routes/Categories.js'
import posts from './routes/Posts.js'
import images from './routes/Images.js'

//Middlewares
const headers = (req, res, next) => {
    const origin = (req.headers.origin == 'http://localhost:3001') ? 'http://localhost:3001' : 'https://mywebsite.com'
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/user', headers, auth);
app.use('/api/category', headers, categories);
app.use('/api/post', headers, posts);
app.use('/api/image', headers, images);
app.use('/api/users', headers, users);

//App
app.listen(process.env.PORT, () => {
    console.log(`App is runing on port ${process.env.PORT}`);
})