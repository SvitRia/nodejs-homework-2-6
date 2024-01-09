import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/Users.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

dotenv.config();
const { JWT_SECRET } = process.env;

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email alredy in use")
    }

    const hashPassword = await bcrypt.hash(password, 10 )

    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.json({
        "user": {
            email: newUser.email,
            subscription: newUser.subscription
        }
    })
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password invalid")
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid")
    }

    const { _id: id } = user;
    const payload = {
        id
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(id, {token});

    res.json({
        token,
        "user": {
            email: user.email,
            subscription: user.subscription
        }
    })
}

const getCurrent = async(req, res)=> {
    const { email} = req.user;

    res.json({
        email
    })
}

const logout = async(req, res)=> {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
        message: "Logout success"
    })
}

const subscription = async (req, res) => {
    const { subscription } = req.body;
    const { _id } = req.user;
    const user = await User.findOne({ _id });
    await User.findByIdAndUpdate(_id, { subscription });
    
    res.json({
      "user": {
            email: user.email,
            subscription
        }
    })
}

export default {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    subscription: ctrlWrapper(subscription)
}