import Joi from "joi";

export const registerUserSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  email: Joi.string()
    .required()
    .trim()
    .email({ minDomainSegments: 2 })
    .lowercase()
    .messages({
      "any.required": "Email is required.",
      "string.email": "Invalid email.",
    }),
  password: Joi.string().required().min(8).max(50).messages({
    "any.required": "Password is required",
    "string.min": "Min. password length is 8 symbols",
    "string.max": "Max. name length is 50 symbols",
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string()
    .required()
    .trim()
    .email({ minDomainSegments: 2 })
    .lowercase()
    .messages({
      "any.required": "Email is required.",
      "string.email": "Invalid email.",
    }),
  password: Joi.string().required().min(8).max(50).messages({
    "any.required": "Password is required",
    "string.min": "Email or password is wrong",
    "string.max": "Email or password is wrong",
  }),
});

export const emailSchema = Joi.object({
  email: Joi.string()
    .required()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2 })
    .messages({
      "any.required": "Email is required.",
      "string.email": "Invalid email.",
    }),
});
