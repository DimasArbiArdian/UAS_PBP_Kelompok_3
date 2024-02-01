import Joi from "joi";

const createEmployeeValidation = Joi.object({
    name: Joi.string().max(100).required(),
    position: Joi.string().max(100).required(),
    salary: Joi.string().max(100).required(),
    email: Joi.string().max(100).email().optional(),
    phone: Joi.string().max(100).optional(),
    address: Joi.string().max(100).optional()
});

const getEmployeeValidation = Joi.number().positive().required();

const updateEmployeeValidation = Joi.object({
    id: Joi.number().positive().required(),
    name: Joi.string().max(100).required(),
    position: Joi.string().max(100).required(),
    salary: Joi.string().max(100).required(),
    email: Joi.string().max(100).email().optional(),
    phone: Joi.string().max(100).optional(),
    address: Joi.string().max(100).optional()
});

const searchEmployeeValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional()
})

export {
    createEmployeeValidation,
    getEmployeeValidation,
    updateEmployeeValidation,
    searchEmployeeValidation
}