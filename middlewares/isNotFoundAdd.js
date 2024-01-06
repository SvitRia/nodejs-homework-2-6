import { HttpError } from "../helpers/index.js";
import { contactAddSchema } from "../models/contacts.js";

const isNotFoundAdd = (req, res, next) => {
    const { error } = contactAddSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
    next();
}

export default isNotFoundAdd;