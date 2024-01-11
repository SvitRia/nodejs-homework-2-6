import fs from "fs/promises";
import Contact from "../models/Сontacts.js";
import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../decorators/index.js";
import path from "path";

const avatarPath = path.resolve("public", "avatars");

const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email")

    res.json(result);
}; 

const addContact = async (req, res) => {
    const { name } = req.body;
    const contact = await Contact.findOne({name});
    if(contact) {
        throw HttpError(409, "Contact with that name already exists");
    };
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarPath, filename)
    await fs.rename(oldPath, newPath);
    const avatar = path.join("public", "avatars", filename)
    const {_id: owner} = req.user;
    const result = await Contact.create({ ...req.body, avatar, owner });
    res.status(201).json(result)
};

const getById = async (req, res) => {
    const { id: _id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOne({ _id, owner }, "-createdAt -updatedAt");
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result)
};

const updateById = async (req, res, next) => {
    const { id: _id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOneAndUpdate({ _id, owner }, req.body);
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result);
}

const deleteContact = async (req, res, next) => {
    const { id: _id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOneAndDelete({ _id, owner });
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

const getFavorite = async (req, res, next) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email")
    const favorite = result.filter(result => result.favorite === true)
    res.json(favorite);
}

export default {
    getAll: ctrlWrapper(getAll),
    addContact: ctrlWrapper(addContact),
    getById: ctrlWrapper(getById),
    updateById: ctrlWrapper(updateById),
    deleteContact: ctrlWrapper(deleteContact),
    addFavoriteById: ctrlWrapper(addFavoriteById),
    getFavorite: ctrlWrapper(getFavorite)
}