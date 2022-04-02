import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../migrations/schema/User.js'
import { registerValidation, loginValidation } from '../validation/user-validation.js'

router.post('/register', async (req, res) => {

    const isNotValid = registerValidation(req.body);
    if (isNotValid?.error) return res.status(422).send(isNotValid.error);

    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) return res.status(400).send("The email already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const createdUser = await user.save(function (err) {
            if (err) {
                console.log(err);
                return;
            }
        })
        res.status(200).send({ user: user });
    } catch (error) {
        res.status(422).send(error);
    }
})

router.post('/login', async (req, res) => {
    const isNotValid = loginValidation(req.body);
    if (isNotValid?.error) return res.status(422).send(isNotValid.error);

    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) return res.status(400).send("The email doesn't exists");

    const user = await bcrypt.compare(req.body.password, userExist.password)

    if (!user) return res.status(400).send("the password is incorrect");

    const token = await jwt.sign({ name: userExist.name, email: userExist.email }, process.env.TOKEN_SECRET_KEY);
    res.header('token', token);
    res.status(200).send({ message: "You logged in", token: token, data: userExist });

})


export default router;