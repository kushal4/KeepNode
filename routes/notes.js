const express = require('express');
const router = express.Router();
const NotesController = require("../controllers/NotesController");
const auth = require("../middleware/route/auth");
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
let controller = new NotesController();

router.get("/:id", async(req, res, next) => {
    let notes = await controller.list(req, res, next);
    let status = controller.getStatus();
    res.status(status).json(notes);
});

router.post("/:id", upload.single('image'), async(req, res, next) => {
    // console.log("came to notes post route");
    let notes = await controller.save(req, res, next);
    let status = controller.getStatus();
    res.status(status).json(notes);
});

router.put("/:id/:note_id", async(req, res, next) => {
    let notes = await controller.update(req, res, next);
    let status = controller.getStatus();
    res.status(status).json(notes);
});


module.exports = router;