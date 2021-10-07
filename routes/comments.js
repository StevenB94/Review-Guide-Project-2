const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.post('/guides/:id/comments', isLoggedIn, commentsCtrl.create);
router.delete('/comments/:id', isLoggedIn, commentsCtrl.delete);
router.put('/comments/:id', isLoggedIn, commentsCtrl.update);

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) return next();
    res.deirect('/auth/google');
}

module.exports = router;