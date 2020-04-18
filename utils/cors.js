var allowCrossDomain = function(req, res, next) {
    console.log(req);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};
let whitelist = ["http://localhost:4200"];
let corsOptions = {
    origin: function(origin, callback) {
        //console.log("callback triggered", origin);
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            //console.log("whitelisted");
            callback(null, true);
        } else {
            console.error("failed to whitelist");
            callback(new Error('Not allowed by CORS'));
        }
    },
};

let corsOptionsWithMethod = corsOptions;


module.exports.corsOptions = corsOptions;
module.exports.corsOptionsWithMethod = {...corsOptionsWithMethod };