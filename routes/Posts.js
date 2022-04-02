import express from 'express';
const router = express.Router();

import Post from '../migrations/schema/Post.js';

import { verify } from '../middlewares/verify.js';

//get all
router.get('/', verify, async (req, res) => {
    const posts = await Post.find();
    try {
        res.send(posts);
    } catch (error) {
        res.status(400).send(error);
    }
});

//get all
router.get('/:id', verify, async (req, res) => {
    const post = await (await Post.find()).filter(c => c._id == req.params.id);

    if (!post.length) return res.status(404).send('The post with the given ID was not found.');
    res.status(200).send(post);
});

//Add a new post
router.post('/', verify, async (req, res) => {
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
router.put('/:id', verify, async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, post) => {
        if (err) return res.status(500).send(err);
    });
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
