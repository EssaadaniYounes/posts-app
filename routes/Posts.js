import express from 'express';
const router = express.Router();

import Post from '../migrations/schema/Post.js';

import { verify } from '../middlewares/verify.js';
import { addPost } from '../validation/post-validation.js';

//get all
router.get('/', verify, async (req, res) => {
    const posts = await Post.find();
    try {
        res.send(posts);
    } catch (error) {
        res.status(400).send(error);
    }
});

//get post by id
router.get('/:id', verify, async (req, res) => {
    //get the current user posts
    if (req.params.id == "me") {
        const post = await (await Post.find()).filter(c => c.author == req.user.id);

        if (!post.length) return res.status(404).send('You dont have any post yet!');
        return res.status(200).send(post);
    }
    const post = await (await Post.find()).filter(c => c._id == req.params.id);

    if (!post.length) return res.status(404).send('The post with the given ID was not found.');
    res.status(200).send(post);
});



//Add a new post
router.post('/', verify, async (req, res) => {
    const { error } = addPost(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        thumbnail: req.body.thumbnail,
        likes: req.body.likes,
        publishDate: req.body.publishDate,
        author: req.body.author,
        categories: req.body.categories
    });

    try {
        await post.save();
        res.status(200).send({
            message: `Post Add Succefuly`
        });

    } catch (error) {
        res.send(error);
    }
})

//update post
router.patch('/:id', verify, async (req, res) => {
    const { error } = addPost(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(post);
});

//delete post
router.delete('/:id', verify, async (req, res) => {

    const post = await (await Post.find()).filter(c => c._id == req.params.id)

    if (!post.length) return res.status(404).send("post not found");
    await Post.deleteOne({ _id: req.params.id });
    return res.status(200).send("Post deleted successfully 👌");
});

export default router;
