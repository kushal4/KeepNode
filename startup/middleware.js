var bodyParser = require('body-parser');
//const express = require('express');
const cors = require('cors');


module.exports = function(app) {
    app.use(cors());
    app.use(bodyParser.json());
    //app.use(bodyParser.urlencoded({ extended: true }));
    //app.use(upload.array());
};