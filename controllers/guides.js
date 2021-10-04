const Guide = require('../models/guide');

module.exports = {
  index,
  show,
  addReview,
  new: newGuide,
  create
};

function newGuide(req, res){
    res.render('guides/new');
}

function create(req, res){
    console.log(req.body)

    req.body.mainMechanics = req.body.mainMechanics;

    req.body.phases = req.body.phases;

    req.body.placement = req.body.placement;

    const guide = new Guide(req.body);
  guide.save(function(err) {
    
    if (err) return res.render('guide/new');
    console.log(guide);
    
    res.redirect('/guides/new');
  });

}

function show(req,res){
    Comment.find({}, function(err, comments){
        res.render('guides/new', {
            comments
        });
    });
}

function addReview(req, res){
    let comment = new Comment(req.body)
    console.log('This is the comment ', comment)
    comment.save(function(err){
        res.redirect('/new');
    });
}


function index(req, res, next) {
  console.log(req.query)
  console.log(req.user, ' req.guide')
  // Make the query object to use with Student.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // Default to sorting by name
  let sortKey = req.query.sort || 'name';
  Guide.find(modelQuery)
  .sort(sortKey).exec(function(err, guides) {
    if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('guides/index', {
      guides,
      user: req.user,
      name: req.query.name,
      sortKey
    });
  });
}
