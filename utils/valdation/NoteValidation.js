const Joi = require('@hapi/joi');

class NoteValidation {
    static validateNote(note) {

        const noteValidation = Joi.object({
            user_id: Joi.number()
                .required(),
            title: Joi.string()
                .required(),
            body: Joi.any(),
            image: Joi.any()
                .meta({ swaggerType: 'file' })
                .optional()
        });

        return noteValidation.validate(note, { abortEarly: false });
    }

}

module.exports = NoteValidation;