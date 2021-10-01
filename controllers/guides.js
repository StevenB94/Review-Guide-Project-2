const Guide = require('../models/guide');

module.exports = {
  index,
};


// function addFact(req, res){
//   req.user.facts.push(req.body);
//    // req.user is a mongoose document
//    // where did we assign the mongoose document to req.user

  

//   req.user.save(function(err){
//     res.redirect('/students')
//   })
// }

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