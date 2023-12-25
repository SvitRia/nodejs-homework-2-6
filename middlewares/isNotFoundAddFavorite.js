import { HttpError } from "../helpers/index.js";
import { contactAddFavoriteSchema } from "../models/ContactsDB.js";

const isNotFoundaddFavorite = (req, res, next) => {
    const { error } = contactAddFavoriteSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
    next();
}

export default isNotFoundaddFavorite;