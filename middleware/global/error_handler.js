module.exports = function(app) {
    app.use(function(err, req, res, next) {
        console.error(err);
        res.status(500).json({
            type: 'InternalServerError',
            message: err.message,
            stack: err.stack
        });
    });
}