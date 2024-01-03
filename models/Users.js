import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, addUpdateSettings } from "./hooks.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
        minlength: 8,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: String
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", addUpdateSettings);
userSchema.post("findOneAndUpdate", handleSaveError);

export const userRegisterSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
    token: Joi.string()
})
export const userSigninSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).required()
})

const User = model("user", userSchema);

export default User;