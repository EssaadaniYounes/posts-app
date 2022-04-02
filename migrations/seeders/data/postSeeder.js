import Post from "../../schema/Post.js";
import User from "../../schema/User.js";

import faker from '@faker-js/faker';

//categories are const because we don't want to change them for the moment
const categories = [
    'Web development',
    'Mobile development',
    'Data science',
    'Machine learning',
    'Artificial intelligence',
    'DevOps',
    'Blockchain',
    'Game development',
    'Cryptocurrency',
    'Micro-services',
];

export const deletePosts = async () => {
    console.warn("We are trying to delete all posts please wait... 🤏");
    await Post.deleteMany()
        .then(() => console.info("All posts have been deleted successfully 🎅"))
        .catch((err) => console.error(`🛑 a error occurred while deleting ${err}`));
}
export const generatePosts = async () => {
    console.info(" ⏳⌛ Generating posts...");
    for (let i = 0; i < 20; i++) {
        //get a random author
        const users = await User.find().then();
        const user = users[Math.floor((Math.random() * users.length))];
        //create the post
        const post = new Post({
            title: faker.lorem.words(3),
            description: faker.lorem.text(),
            thumbnail: faker.image.imageUrl(640, 480),
            likes: faker.datatype.number({ min: 0 }),
            publishDate: faker.date.recent(),
            author: user.id,
            categories: [
                categories[Math.floor((Math.random() * categories.length))],
                categories[Math.floor((Math.random() * categories.length))]
            ]//generate random 2 categories 
        });
        await post.save();
        
    }
    console.info("✅✅✅ Categories generated successfully");
}
