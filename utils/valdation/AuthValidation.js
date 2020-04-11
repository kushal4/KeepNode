const UserRepository = require("../../repositories/UserRepository");
const _ = require("lodash");
const bcrypt = require("bcrypt");
class AuthValidation {

    constructor() {
        this.userRepo = new UserRepository();
    }
    async validate_user_pwd(user_obj) {

        console.log(user_obj);
        let user = await this.userRepo.find({ email: user_obj.email });
        //console.log("adfer");
        if (user) {
            this.status = 400;
            return {
                code: 400,
                message: "User already exists"
            };
        } else {
            return {};
        }

    }

    async save_user(user_req) {
        let saved_user = await this.userRepo.save(user_req);
        console.log(saved_user);
        if (!saved_user) {
            return {
                code: 400,
                message: "User is not created"
            };
        }
        saved_user.code = 200;
        return saved_user;
    }

    async chk_valid_user_pwd_loggedIn(user_credentials) {
        let user_pwd_errObj = {
            "code": 200,
            "errors": {}
        };
        //let user = "";
        let user_query = {
            username: user_credentials.username
        };
        let user_obj = await this.get_user_obj_or_err_usrname(user_query);
        if (user_obj.code != 200) {
            return user_obj;
        }
        let inp_password = user_credentials.password;
        let isValidPassword = await bcrypt.compare(inp_password, user_obj.password);
        console.log(isValidPassword);
        if (!isValidPassword) {
            //console.log("not valid");
            this.status = 400;
            user_pwd_errObj.code = 400;
            user_pwd_errObj.errors.password = "Password didnt match";
            return user_pwd_errObj;
        }

        return user_obj;
    }

    async get_user_obj_or_err_usrname(user_query, user_pwd_errObj) {
        let user = null;
        let user_obj = await this.userRepo.find(user_query);
        if (user_obj) {
            user = user_obj.toJSON();
            user.code = 200;
            //console.log(user);
            return user;
        } else {
            user_pwd_errObj.code = 400;
            user_pwd_errObj.errors.username = "No valid user found";
            return user_pwd_errObj;
        }
    }

    get_user_with_token(user) {
        console.log(user);
        user = _.pick(user, ["username", "email", "code"]);
        user.code = user.code || 200;
        user.access_token = this.userRepo.generateToken();
        return user;
    }

    async update_user(user_credentials) {
        let salt = await bcrypt.genSalt(10);
        user_credentials.password = await bcrypt.hash(user_credentials.password, salt);
        let updated_result = await this.userRepo.update({ password: user_credentials.password }, { username: user_credentials.username });
        return updated_result;
    }
}

module.exports = AuthValidation;