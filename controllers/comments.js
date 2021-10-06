const Guide = require('../models/guide')
// Movie <- is our Model that can talk to the db

module.exports = {
	create,
    delete: deleteComment
}


function deleteComment(req, res) {
    
    Guide.findOne({'comments._id': req.params.id}, function(err, guide) {
      
      const commentSubdoc = guide.comments.id(req.params.id);
      if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/guides/${guide._id}`);
      commentSubdoc.remove();
      guide.save(function(err) {
        res.redirect(`/guides/${guide._id}`);
      });
    });
  }


function create(req, res){


    Guide.findById(req.params.id, function(err, guideDocument){ // <- movieDocument is the document of the movie from the db
		// 2 add the review to the movie document (aka movieDocument)
		if(err){
        
			console.log(err)
			res.send(err)
		}
        req.body.userId = req.user._id;
        req.body.userName = req.user.name;
		guideDocument.comments.push(req.body); 
		guideDocument.save(function(err){
				// 3 respond to the client (aka the browser)
				// 
				res.redirect(`/guides/${req.params.id}`); // redirecting back to the page the user was on
				// req.params.id <-- the movies id that was just updated, show page
		});	
	});
}