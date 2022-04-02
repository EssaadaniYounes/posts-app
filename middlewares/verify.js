import jwt from 'jsonwebtoken';
export const verify = (req, res, next) => {
    const token = req.header('token');

    if (!token) return res.status(401).send("Unautorized");
    try {

        const isValid = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.user = isValid;
        next();

    } catch (error) {
        res.status(400).send(error);
    }
}