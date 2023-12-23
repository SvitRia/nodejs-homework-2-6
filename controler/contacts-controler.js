import Contact from "../models/ContactsDB.js";
import HttpError from "../helpers/HttpError.js";
import {ctrlWrapper} from "../decorators/index.js";

const getAll = async (req, res ) => {
        const result = await Contact.find()

        res.json(result);
};

const addContact = async (req, res) => {
        const result = await Contact.create(req.body);
        res.status(201).json(result)
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Contact.findById(id);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }
      res.json(result)  
    }
     catch (error) {
        next(error)
    }
    }

    const updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

const deleteContact = async (req, res, next) => {
        try {
        const { id } = req.params;
        const result = await Contact.findByIdAndDelete(id);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }

        res.json({
            message: "Delete success"
        })
    }
    catch (error) {
        next(error);
    }
}

export default {
    getAll: ctrlWrapper(getAll),
    addContact: ctrlWrapper(addContact),
    getById: ctrlWrapper(getById),
    updateById: ctrlWrapper(updateById),
    deleteContact: ctrlWrapper(deleteContact),
}