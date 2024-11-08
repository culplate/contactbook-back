import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required().trim().min(3).max(30).messages({
    "any.required": "Name is required",
    "string.min": "Min. name length is 3 symbols",
    "string.max": "Max. name length is 30 symbols",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .trim()
    .allow("")
    .empty("")
    .default(null)
    .min(5)
    .max(50)
    .messages({
      "any.required": "Email is required.",
      "string.email": "Invalid email.",
    }),
  number: Joi.string()
    .regex(/^\+?[0-9]+$/)
    .min(5)
    .max(20)
    .trim()
    .allow("")
    .empty("")
    .default(null)
    .messages({
      "string.pattern.base": `Phone number must start with an optional '+' and include digits only.`,
      "string.min": "Minimal number length is 5.",
      "string.max": "Maximal number length is 15",
    }),
}).min(1);

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    "any.required": "Name is required",
    "string.min": "Min. name length is 3 symbols",
    "string.max": "Max. name length is 30 symbols",
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).min(5).max(50).messages({
    "any.required": "Email is required.",
    "string.email": "Invalid email.",
  }),
  number: Joi.string()
    .regex(/^\+?[0-9]+$/)
    .min(5)
    .max(20)
    .messages({
      "string.pattern.base": `Phone number must include digits only.`,
      "string.min": "Minimal number length is 5.",
      "string.max": "Maximal number length is 15",
    }),
});

export const toggleFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Favorite value is required",
    "boolean.base": "Must be boolean value",
  }),
});
