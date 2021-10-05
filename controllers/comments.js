const Guide = require('../models/guide')
// Movie <- is our Model that can talk to the db

module.exports = {
	create
}


function create(req, res){
	console.log(req.body)
    res.send('test to see if it works')


    Guide.findById(req.params.id, function(err, guideDocument){ // <- movieDocument is the document of the movie from the db
		// 2 add the review to the movie document (aka movieDocument)
		if(err){
			console.log(err)
			res.send(err)
		}
		console.log(guideDocument)
		guideDocument.comments.push(req.body); // <- our review is req.body
		// When we mutate (aka change a document) we have to tell the db, by saving
		guideDocument.save(function(err){
				// 3 respond to the client (aka the browser)
				// 
				res.redirect(`/guides/${req.params.id}`); // redirecting back to the page the user was on
				// req.params.id <-- the movies id that was just updated, show page
		});	
	});
}