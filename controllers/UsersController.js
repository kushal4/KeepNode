const _ = require("lodash");
const bcrypt = require("bcrypt");
const UserValidation = require("../utils/valdation/UserValidation");
const getErrorObj = require("../utils/valdation/error_validation_obj");
//const UserRepository = require("../repositories/UserRepository");
const AuthValidation = require("../utils/valdation/AuthValidation");
class UsersController {

    constructor() {
        this.status = 200;
        //this.userRepo = new UserRepository();
        this.auth = new AuthValidation();
    }

    getStatus() {
        return this.status;
    }

    async register(req, res, next) {
        const user_req = _.pick(req.body, ["username", "email", "password"]);
        //console.log(user_req);
        try {
            const { error } = UserValidation.validateRegister(user_req);
            if (error) {
                let err_obj = getErrorObj(error);
                this.status = 400;
                return {
                    code: 400,
                    errors: err_obj
                };
            }
            const salt = await bcrypt.genSalt(10);
            // console.log("after salter");
            user_req.password = await bcrypt.hash(user_req.password, salt);
            // console.log("after hash");
            let user_exist_response = await this.auth.validate_user_pwd(user_req);
            console.log("repon");
            if (Object.keys(user_exist_response).length) {
                return user_exist_response;
            }

            let user_obj = await this.auth.save_user(user_req);
            if (user_obj.code != 200) {
                return user_obj;
            }
            let user = this.auth.get_user_with_token(user_obj);
            // let token = this.userRepo.generateToken();
            // let user = _.pick(saved_user.toJSON(), ["username", "email"]);
            // user.code = 200;
            // user.access_token = token;
            //console.log(user);
            return user;
        } catch (ex) {
            console.error(ex);
            next(ex);
        }



    }

    async login(req, res, next) {
        try {
            let { error } = UserValidation.validateLogin(req.body);
            if (error) {
                let err_obj = getErrorObj(error);
                this.status = 400;
                return {
                    code: 400,
                    errors: err_obj
                };
            }
            // console.log(req.body);
            let credentials = _.pick(req.body, ["username", "password"]);
            let user_obj = await this.auth.chk_valid_user_pwd_loggedIn(credentials);
            if (user_obj.code != 200) {
                this.status = 400;
                //console.log("error");
                return user_obj;
            }
            //console.log(user_obj);
            let user = this.auth.get_user_with_token(user_obj);
            return user;
        } catch (ex) {
            //console.error("came to exception");
            next(ex);
        }

    }



    async reset(req, res, next) {
        try {
            let user_credentials = _.pick(req.body, ["username", "password"]);
            let user_query = {
                username: user_credentials.username
            };
            let user_obj = await this.auth.get_user_obj_or_err_usrname(user_query);
            //console.log(user_obj);
            if (user_obj.code != 200) {
                //console.log("yohooo", user_obj.code);
                return user_obj;
            }
            let isMatchingPassword = await bcrypt.compare(user_credentials.password, user_obj.password);
            if (isMatchingPassword) {
                this.status = 400;
                return {
                    code: 400,
                    message: "try to give password not used before"
                };
            } else {
                let updated_result = await this.auth.update_user(user_credentials);
                if (updated_result.length > 0) {
                    let user = this.auth.get_user_with_token(user_credentials);
                    return user;
                }
            }

        } catch (ex) {
            next(ex);
        }

    }


}

module.exports = UsersController;