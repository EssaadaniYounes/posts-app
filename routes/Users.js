import express from 'express';
const router = express.Router();

import User from '../migrations/schema/User.js';
import { verify } from '../middlewares/verify.js';


router.get('/', async (req, res) => {
    res.status(200).send('hello');
});
//get user by his ID
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    const friends = await (await User.find()).filter(friend => user.friends.includes(friend._id));
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.status(200).send({ user, friends });
});
router.get('/people/profiles', verify, async (req, res) => {
    const currentUser = await User.find({ _id: req.user.id });
    if (currentUser) {
        const users = await (await User.find()).filter(user => user._id != req.user.id && !currentUser[0].friends.includes(user._id));
        if (!users) return res.status(404).send('The user with the given ID was not found.');
        res.status(200).send(users);
    }
});

router.post('/people/add', verify, async (req, res) => {
    try {
        const user = await User.find({ _id: req.user.id });
        const newUser = user[0];
        newUser.friends.push(req.body.newFriend);

        const isUpdated = await User.findByIdAndUpdate(req.user.id, newUser, { new: true });
        return res.status(201).send('Add Succes ✅');
    } catch (error) {
        return res.send(error);
    }
})
router.post('/people/remove', verify, async (req, res) => {
    try {
        const user = await User.find({ _id: req.user.id });
        const newUser = user[0];
        newUser.friends.splice(newUser.friends.indexOf(req.body.friend), 1);

        const isUpdated = await User.findByIdAndUpdate(req.user.id, newUser, { new: true });
        return res.status(200).send('Friend Removed Succesfully 💔');
    } catch (error) {
        return res.send(error);
    }
})

export default router