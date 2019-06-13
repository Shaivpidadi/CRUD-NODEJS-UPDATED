const Joi = require('joi');

function validateData(req) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
    });

    return Joi.validate(req.body, schema);
}

function validateUpdateData(req) {
    const schema = Joi.object().keys({
        oldName : Joi.string().min(3).required(),
        newName : Joi.string().min(3).required()
    });
    return Joi.validate(req.body,schema);
}

module.exports = {
    validateData, validateUpdateData
}