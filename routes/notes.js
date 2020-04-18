const express = require('express');
const router = express.Router();
const NotesController = require("../controllers/NotesController");
const auth = require("../middleware/route/auth");
var multer = require('multer');
const corsopt = require("../utils/cors");
corsopt.corsOptionsWithMethod.methods = ["GET", "POST", "PUT"];

// storage option determining which folder in the serve the file is to be uploaded in 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });
let controller = new NotesController();

let cors = require('cors');

router.options("*", cors(corsopt.corsOptionsWithMethod));

router.get("/:id", cors(corsopt.corsOptions), async(req, res, next) => {
    let notes = await controller.list(req, res, next);
    let status = controller.getStatus();
    res.status(status).json(notes);
});


router.post("/:id", cors(corsopt.corsOptions), upload.single('image'), async(req, res, next) => {
    // console.log("came to notes post route");
    let notes = await controller.save(req, res, next);
    let status = controller.getStatus();
    res.status(status).json(notes);
});

router.put("/:id/:note_id", cors(corsopt.corsOptions), async(req, res, next) => {
    let notes = await controller.update(req, res, next);
    let status = controller.getStatus();
    res.status(status).json(notes);
});


module.exports = router;