const db_config = require("../config/db_conf");
const UserMysqlRepository = require("../repositories/mysql/UserRepository");
const UserMongoRepository = require("../repositories/mongo/UserRepository");
class UserService {
    constructor() {
        this.userRepo = null;
        if (db_config.db_dialect == "mongo") {
            this.userRepo = new UserMongoRepository();
        } else {
            this.userRepo = new UserMysqlRepository();
        }
    }

    async save(user_obj) {
        let user = await this.userRepo.save(user_obj);
        return user;
    }

    async find(user_query) {
        let user = await this.userRepo.find(user_query);
        return user;
    }

    async update(updateQuery, whereQuery) {
        let update_result = await this.userRepo.update(updateQuery, whereQuery);
        return update_result;
    }

    generateToken() {
        let token = this.userRepo.generateToken();
        return token;
    }
}

module.exports = UserService;