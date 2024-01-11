import { HttpError } from "../helpers/index.js";
import { contactAddFavoriteSchema } from "../../5/models/Contacts.js";

const isNotFoundaddFavorite = (req, res, next) => {
    const { error } = contactAddFavoriteSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
    next();
}

export default isNotFoundaddFavorite;