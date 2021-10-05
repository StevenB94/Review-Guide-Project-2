var router = require('express').Router();
var guidesCtrl = require('../controllers/guides');



router.get('/new', guidesCtrl.new);
router.post('/', guidesCtrl.create);
router.get('/:id', guidesCtrl.show);
router.get('/', guidesCtrl.index);


// Authorizing the user to use a route
// probably only want to use this on
// post, put or delete routes
function isLoggedIn(req, res, next) {
	if ( req.isAuthenticated() ) return next(); // next() go to the next function in middleware, above situation studentsCtrl.addFact
	res.redirect('/auth/google'); // redirect them to login
}



module.exports = router;