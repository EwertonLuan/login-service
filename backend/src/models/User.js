import mongoose from 'mongoose';
import joi from 'joi'


const joigoose_mon = require('joigoose')(mongoose)

const UserJoi = joi.object({
    email: joi.string().email().required(),
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    personal_phone: joi.string().regex(/\([0-9]{2}\)\s[0-9]{5}\-[0-9]{4}/).required(),
    password: joi.string().required()
});
const User = new mongoose.Schema(joigoose_mon.convert(UserJoi))

export default mongoose.model('User', User);