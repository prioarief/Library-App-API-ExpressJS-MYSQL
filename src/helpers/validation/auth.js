const joi = require("joi");

const schema = {
	register: joi.object().keys({
		email: joi.string().email({ minDomainAtoms: 2 }).required(),
		password: joi.string().min(6).required(),
		name: joi.string().required(),
		role: joi.string().required(),
	}),

	login: joi.object().keys({
		email: joi.string().email({ minDomainAtoms: 2 }).required(),
		password: joi.string().required(),
	}),
};

module.exports = schema;
