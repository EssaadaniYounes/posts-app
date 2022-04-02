import express from 'express';
const router = express.Router();

import Category from '../migrations/schema/Category.js';

import { verify } from '../middlewares/verify.js';

//get all
router.get('/', verify, async (req, res) => {
    const categoires = await Category.find();
    res.send(categoires);
});

//get all
router.get('/:id', verify, async (req, res) => {
    const category = await (await Category.find()).filter(c => c._id == req.params.id);

    if (!category.length) return res.status(404).send('The category with the given ID was not found.');
    res.status(200).send(category);
});

//Add a new category
router.post('/', verify, async (req, res) => {
    const category = new Category({
        label: req.body.label
    })

    try {
        const cate = await category.save();
        res.status(200).send({
            message: `${category.label} Add Succefuly`
        });

    } catch (error) {
        res.send(error);
    }
})

//update category
router.put('/:id', verify, async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, category) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(category);
    });
});

//delete category
router.delete('/:id', verify, async (req, res) => {


    const category = await (await Category.find()).filter(c => c._id == req.params.id)

    if (!category.length) return res.status(404).send("category not found");
    await Category.deleteOne({ _id: req.params.id });
    return res.status(200).send("category deleted successfully 👌");
});

export default router;
