import express from "express";
import contactsControler from "../../controler/contacts-controler.js";
import {isEmptyBody, isNotFoundAdd, isNotFoundUpdate, isValidId} from "../../middlewares/index.js";

const contactsRouter = express.Router()

contactsRouter.get('/', contactsControler.getAll);

contactsRouter.post('/', isEmptyBody, isNotFoundAdd, contactsControler.addContact);

contactsRouter.get('/:id', isValidId, contactsControler.getById);
/*

contactsRouter.delete('/:id', contactsControler.deleteContact )

contactsRouter.put('/:id', isEmptyBody, isNotFoundUpdate, contactsControler.updateById)
 */
export default contactsRouter;
