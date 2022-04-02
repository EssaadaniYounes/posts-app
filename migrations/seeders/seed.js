//Constants
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


const app = express();

//dotenv configuration
dotenv.config();

//Data base connection
mongoose.connect(process.env.DATABASE_CONNECT)
    .then(() => true)
    .catch(e => console.log(e));

//Seeders
import { generateUsers, deleteUsers } from './data/userSeder.js';
import { generateCategories, deleteCategories } from './data/categorySeeder.js';



const saveAll = async () => {
    await deleteUsers()
    await deleteCategories()
    console.info("✈🪂 Saving Data, please wait...");
    await generateUsers();
    await generateCategories();
    console.info("🔥🎉 Data saved succesfully");
}
saveAll();