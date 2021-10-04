// Create your User Model
const mongoose = require('mongoose');


const guideSchema = new mongoose.Schema({
    title: String (Titan),
    MainMechanics: String,
    Phases: String,
    Placement: String,
    comments: [commentSchema],
    guideCreator:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});





module.exports = mongoose.model('Guide', guideSchema);
