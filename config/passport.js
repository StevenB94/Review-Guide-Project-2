const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const Guide = require('../models/guide');


// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    // refer to the lesson plan from earlier today in order to set this up
    console.log(profile, "PROFILE")

    Guide.findOne({'googleId': profile.id}, function (err, guideDoc) {
      if (err) return cb(err); // if there is an error use the callback to proceed to the next line in middleware
    
      if (guideDoc) {
        // if the user exists
    
        return cb(null, guideDoc); // send the user doc to the next a middleware function in passport
        // cb is verify callback that will pass  our information to passport.serializeUser at the bottom of the file
        // cb(error, SuccessWhichIsYourUserDocument)
      } else {
        // Create the user in the db
        const newGuide = new Guide({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        });
    
        newGuide.save(function (err) {
          if (err) return cb(err);
          return cb(null, newGuide); // success, pass that student doc to the next place in the middleware chain,p
        });
      };
    });
  }
));



passport.serializeUser(function(guide, done) {
  done(null, guide.id);
});

passport.deserializeUser(function(id, done) {
  Guide.findById(id, function (err, guideDoc){
    done(err, guideDoc);
  });
});



