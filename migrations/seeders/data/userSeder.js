import User from "../../schema/User.js";
import bcrypt from "bcryptjs";
import faker from '@faker-js/faker';
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


export const deleteUsers = async () => {
    console.warn("We are trying to delete all users please wait... 🤏");
    const users = await User.deleteMany({})
        .then(() => console.info("All users have been deleted successfully 🎅"))
        .catch((err) => console.error(`🛑 a error occurred while deleting ${err}`));
}

const users = [];
export const generateUsers = async () => {
    console.info(" ⏳⌛ Generating users...");
    for (let i = 0; i < 10; i++) {

        const name = faker.name.findName();
        const password = faker.internet.password()
        const user = await new User({
            name: name,
            email: faker.internet.email(name),
            password: await bcrypt.hash(password, 10),
            image: faker.image.avatar()
        });
        await user.save();
        users.push({ name: user.name, email: user.email, password: password });
    }
    console.table(users);
    console.info("✅✅✅ Users generated successfully");
}
