import { Schema, model } from "mongoose";
import { handleSaveError, addUpdateSettings } from "./hooks.js";
import Joi from "joi";

const contactsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact']
    },
    email: {
        type: String,
        
    },
    phone: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        default: false,
    }
}, { versionKey: false, timestamps: true });

contactsSchema.post("save", handleSaveError);
contactsSchema.pre("findOneAndUpdate", addUpdateSettings )
contactsSchema.post("findOneAndUpdate", handleSaveError )

export const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `"name" must be exist`
    }),
     email: Joi.string().email().required().messages({
        "any.required": `"email" must be exist`
     }),
    phone: Joi.string().min(1).required(),
    favorite: Joi.boolean()
})

export const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean()
})

export const contactAddFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
});

const Contact = model("contact", contactsSchema);

export default Contact;