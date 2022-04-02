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
