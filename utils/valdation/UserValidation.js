const Joi = require('@hapi/joi');


class UserValidation {

    static validateLogin(user) {

        const loginValidation = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
            password: Joi.string()
                .regex(/[a-zA-Z0-9]{3,30}/)
                .required(),
        });

        return loginValidation.validate(user, { abortEarly: false });
    }

    static validateRegister(user) {
        console.log("valtiosds");
        const registerValidation = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),

            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
        });

        return registerValidation.validate(user, { abortEarly: false });
    }

}

module.exports = UserValidation;