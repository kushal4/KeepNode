const Sequelize = require("sequelize");
const sequelize = require("./index");


const Model = Sequelize.Model;
class Note extends Model {}
Note.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    image: {
        type: Sequelize.BLOB,
        allowNull: true
    },
    is_done: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false,
    sequelize,
    modelName: 'notes'
        // options
});

module.exports = Note;