const User = require("../../models/mongo/User");
const JWtWrapper = require("../../utils/JwtWrapper");
const mongoose_connect = require("../../models/mongo/index")();
class UserRepository {

    constructor() {
        this.user = {};
        this.jwt_obj = null;
        this.payload = null;
    }
    async save(user_obj) {
        this.user = await User.create(user_obj);
        //console.log(this.user);
        this.create_jwt_payload();
        return this.user;
    }

    async update(updateQuery, whereQuery = {}) {
        let update_result = await User.updateOne(whereQuery, updateQuery);
        if (update_result.nModified) {
            this.create_jwt_payload();
        }
        return update_result.nModified;
    }

    async find(user_query = {}) {
        //console.log("mongoose find");
        //console.log(user_query);
        this.user = await User.findOne(user_query);
        //console.log(this.user);
        if (this.user) {
            this.create_jwt_payload();
        }

        return this.user;
    }

    async remove(user_query = {}) {

    }

    create_jwt_payload() {
        this.payload = { user_id: this.user.id, username: this.user.username };
        //console.log(this.payload);
        this.jwt_obj = new JWtWrapper(this.payload);
    }

    generateToken() {
        let token = this.jwt_obj.generateToken();
        return token;
    }
}

module.exports = UserRepository;