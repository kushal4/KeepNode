const users = require("../routes/users");
const notes = require("../routes/notes");
module.exports = function(app) {
    app.use("/api/users", users);
    app.use("/api/notes", notes);
};