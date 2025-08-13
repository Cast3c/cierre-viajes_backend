const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    docId: {type: Number, required: true},
    phone: {type: String, required: true},
    rol: {type: String, required: true}
} , { timestamps: true });

module.exports = mongoose.model('User', userSchema)