import { HttpError } from "../helpers/index.js";
import { contactUpdateSchema } from "../../5/models/contacts.js";

const isNotFoundUpdate = (req, res, next) => {
    const { error } = contactUpdateSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
    next();
}

export default isNotFoundUpdate;