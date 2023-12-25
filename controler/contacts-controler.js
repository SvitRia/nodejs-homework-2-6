import Contact from "../models/ContactsDB.js";
import HttpError from "../helpers/HttpError.js";
import {ctrlWrapper} from "../decorators/index.js";

const getAll = async (req, res ) => {
        const result = await Contact.find({}, "-createdAt -updatedAt")

        res.json(result);
}; 

const addContact = async (req, res) => {
        const result = await Contact.create(req.body);
        res.status(201).json(result)
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id, "-createdAt -updatedAt");
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result)
};

const updateById = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result);
}

const deleteContact = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json({
         message: "Delete success"
    })
}

const addFavoriteById = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }
     res.json(result)
}

export default {
    getAll: ctrlWrapper(getAll),
    addContact: ctrlWrapper(addContact),
    getById: ctrlWrapper(getById),
    updateById: ctrlWrapper(updateById),
    deleteContact: ctrlWrapper(deleteContact),
    addFavoriteById: ctrlWrapper(addFavoriteById)
}