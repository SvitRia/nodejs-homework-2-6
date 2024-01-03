import User from "../models/Users.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const register = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email alredy in use")
    }
    const newUser = await User.create(req.body);
    console.log("hello")

    res.json({
        "user": {
            email: newUser.email,
            subscription: newUser.subscription
        }
    })
}
export default {
    register: ctrlWrapper(register),
}