const User = require("../models/User");
const JWtWrapper = require("../utils/JwtWrapper");
class UserRepository {

    constructor() {
        this.user = {};
        this.jwt_obj = null;
        this.payload = null;
    }
    async save(user_obj) {
        this.user = await User.create(user_obj);
        this.create_jwt_payload();
        return this.user;
    }

    async update(updateQuery, whereQuery = {}) {
        let update_result = await User.update(updateQuery, {
            where: whereQuery
        });
        if (update_result.length) {
            this.create_jwt_payload();
        }
        return update_result;
    }

    async find(user_query = {}) {
        this.user = await User.findOne({
            where: user_query
        });
        if (this.user) {
            this.create_jwt_payload();
        }

        return this.user;
    }

    async remove(user_query = {}) {

    }

    create_jwt_payload() {
        this.payload = { user_id: this.user.id, username: this.user.username };
        console.log(this.payload);
        this.jwt_obj = new JWtWrapper(this.payload);
    }

    generateToken() {
        let token = this.jwt_obj.generateToken();
        return token;
    }
}

module.exports = UserRepository;