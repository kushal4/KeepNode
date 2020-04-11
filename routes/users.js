const express = require('express');
const router = express.Router();
const UsersController = require("../controllers/UsersController");

let controller = new UsersController();






router.post("/register", async(req, res, next) => {
    //console.log("user register hit");
    const user = await controller.register(req, res, next);
    let status = controller.getStatus();
    res.status(status).json(user);
});

router.post("/login", async(req, res, next) => {
    const user = await controller.login(req, res, next);
    let status = controller.getStatus();
    res.status(status).json(user);
});

router.post("/reset", async(req, res, next) => {
    const user = await controller.reset(req, res, next);
    let status = controller.getStatus();
    res.status(status).json(user);
});


module.exports = router;