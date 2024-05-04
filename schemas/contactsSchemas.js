import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "Name is required" }),
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
    "any.required": "Email is required.",
    "string.email": "Invalid email.",
  }),
  phone: Joi.string()
    .regex(/^[0-9]+$/)
    .min(5)
    .max(15)
    .messages({
      "string.pattern.base": `Phone number must include digits only.`,
      "string.min": "Minimal number length is 5.",
      "string.max": "Maximal number length is 15",
    })
    .required(),
});

export const updateContactSchema = Joi.object({});
