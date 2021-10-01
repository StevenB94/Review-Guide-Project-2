// Create your User Model
const mongoose = require('mongoose');




const guideSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String
});



module.exports = mongoose.model('Guide', guideSchema);