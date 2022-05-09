import User from "../../schema/User.js";
import faker from '@faker-js/faker';
import bcrypt from 'bcryptjs'

export const deleteUsers = async () => {
    console.warn("We are trying to delete all users please wait... 🤏");
    const users = await User.deleteMany({})
        .then(() => console.info("All users have been deleted successfully 🎅"))
        .catch((err) => console.error(`🛑 a error occurred while deleting ${err}`));
};

const users = [];
export const generateUsers = async () => {
    console.info(" ⏳⌛ Generating users...");

    for (let i = 0; i < 10; i++) {
        //get all existing users
        const existedUsers = await User.find().then();
        const range = Math.floor(Math.random() * existedUsers.length);
        let friends = [];
        //generate randome friends
        for (let i = 0; i < range; i++) {
            friends.push(existedUsers[i]._id);
        }

        const name = faker.name.findName();
        const password = faker.internet.password()
        const user = await new User({
            name: name,
            email: faker.internet.email(name),
            password: await bcrypt.hash(password, 10),
            image: faker.image.avatar(),
            friends: friends
        });
        await user.save();
        users.push({ name: user.name, email: user.email, password: password });
    }
    console.table(users);
    console.info("✅✅✅ Users generated successfully");
}
