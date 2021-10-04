// Create your User Model
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: String,
    rating: String, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});


const guideSchema = new mongoose.Schema({
    title: String,
    MainMechanics: String,
    Phases: String,
    Placement: String,
    comments: [commentSchema],
    guideCreator:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});





module.exports = mongoose.model('Guide', guideSchema);
