import express from "express";
import contactsControler from "../../controller/contacts-controler.js";
import {authenticate, isEmptyBody, isNotFoundAdd, isNotFoundUpdate, isValidId, isNotFoundaddFavorite, upload} from "../../middlewares/index.js";

const contactsRouter = express.Router()

contactsRouter.use(authenticate);

contactsRouter.get('/', contactsControler.getAll);

contactsRouter.get('/favorite', contactsControler.getFavorite)

contactsRouter.post('/', upload.single("avatar"), isEmptyBody, isNotFoundAdd, contactsControler.addContact);

contactsRouter.get('/:id', isValidId, contactsControler.getById);

contactsRouter.delete('/:id', isValidId,  contactsControler.deleteContact )

contactsRouter.put('/:id', isValidId, isEmptyBody, isNotFoundUpdate,  contactsControler.updateById);

contactsRouter.patch('/:id/favorite', isEmptyBody, isValidId, isNotFoundaddFavorite, contactsControler.addFavoriteById)

export default contactsRouter;
