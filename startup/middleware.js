var bodyParser = require('body-parser');
//const express = require('express');




module.exports = function(app) {
    // app.use(cors({ origin: 'http://localhost:3030', credentials: true }));
    //app.use(allowCrossDomain);
    app.use(bodyParser.json());
    //app.use(bodyParser.urlencoded({ extended: true }));
    //app.use(upload.array());
};