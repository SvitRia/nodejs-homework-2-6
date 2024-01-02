import express from "express";
import contactsControler from "../../controler/contacts-controler.js";
import {isEmptyBody, isNotFoundAdd, isNotFoundUpdate, isValidId, isNotFoundaddFavorite} from "../../middlewares/index.js";

const contactsRouter = express.Router()

contactsRouter.get('/', contactsControler.getAll);

contactsRouter.post('/', isEmptyBody, isNotFoundAdd, contactsControler.addContact);

contactsRouter.get('/:id', isValidId, contactsControler.getById);

contactsRouter.delete('/:id', isValidId,  contactsControler.deleteContact )

contactsRouter.put('/:id', isValidId, isEmptyBody, isNotFoundUpdate,  contactsControler.updateById);

contactsRouter.patch('/:id/favorite', isEmptyBody, isValidId, isNotFoundaddFavorite, contactsControler.addFavoriteById)

export default contactsRouter;
