const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name: {type:String, required: true},
        email: {type:String, required: true, unique: true},
        password: {type:String, required: true},
        dob: {type:Date, required: true},
        sex: {type:String, required: true},
        phone: {type:Number, required: true},
        pincode: {type:Number}
    },
    { collection : 'user-data' }
)

const model = mongoose.model('UserData', UserSchema)

module.exports = model

