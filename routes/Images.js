import express from 'express';
const router = express.Router();

import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        var dateMili = Date.now();
        cb(null, dateMili + "-" + Math.round(Math.random() * 10000) + "-" + file.originalname.replace(/ /g, '_'));
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

router.post('/', upload.single('profile'), async (req, res) => {
    try {
        if (req?.file.path != undefined) {

            const path = 'http://localhost:3000/' + req.file.path
            return res.send(path);
        }
        else {
            return res.status(401).send(null);
        }
    } catch (error) {
        return res.status(401).send(null)
    }
});

router.post('/thumb', upload.single('thumbnail'), async (req, res) => {
    try {
        if (req?.file.path != undefined) {

            const path = 'http://localhost:3000/' + req.file.path
            return res.send(path);
        }
        else {
            return res.status(401).send(null);
        }
    } catch (error) {
        return res.status(401).send(null)
    }
});

export default router;