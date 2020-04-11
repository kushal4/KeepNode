const Sequelize = require("sequelize");
const sequelize = require("./index");
const fs = require("fs");

const Model = Sequelize.Model;
class User extends Model {}
User.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        scopes: ['self']
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now,
        scopes: ['self']
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now,
        scopes: ['self']
    },
}, {
    timestamps: false,
    sequelize,
    modelName: 'users'
        // options
});

module.exports = User;