const express = require('express');
const router = express.Router();
const UsersController = require("../controllers/UsersController");
const corsopt = require("../utils/cors");
corsopt.corsOptionsWithMethod.methods = "POST";
let controller = new UsersController();
let cors = require('cors');

router.options("*", cors(corsopt.corsOptionsWithMethod));

router.post("/register", cors(corsopt.corsOptions), async(req, res, next) => {
    //console.log("user register hit");
    const user = await controller.register(req, res, next);
    let status = controller.getStatus();
    res.status(status).json(user);
});

router.post("/login", cors(corsopt.corsOptions), async(req, res, next) => {
    const user = await controller.login(req, res, next);
    let status = controller.getStatus();
    res.status(status).json(user);
});

router.post("/reset", cors(corsopt.corsOptions), async(req, res, next) => {
    const user = await controller.reset(req, res, next);
    let status = controller.getStatus();
    res.status(status).json(user);
});


module.exports = router;