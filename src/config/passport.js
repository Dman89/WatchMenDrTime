var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

   // load up the user model and auth variables
   var User       = require('../models/user');
   var clientID, clientSecret, callbackURL;


   // Disable "configAuth" to turn off test mode
  //  var configAuth = require('./auth');
   // If else statment for test mode
  // if (configAuth) {
  //     clientID = process.env.fbID || configAuth.facebookAuth.clientID;
  //     clientSecret = process.env.FBSecret || configAuth.facebookAuth.clientSecret;
  //     callbackURL = process.env.fbCbUrl || configAuth.facebookAuth.callbackURL;
  // } else {
      clientID = "612737235569587";
      clientSecret = "e52fa17f150f311a8a7e57625164f644";
      callbackURL = "http://localhost:3000/auth/facebook/callback";
  // }





   module.exports = function(passport) {

           passport.serializeUser(function(user, done) {
             done(null, user._id);
           });

           passport.deserializeUser(function(id, done) {
             User.findById(id, function(err, user) {
               done(err, user);
             });
           });

       // Facebook Strategy
        passport.use(new FacebookStrategy({
            clientID        : clientID,
            clientSecret    : clientSecret,
            callbackURL     : callbackURL,
            enableProof: true,
            profileFields: ['id', 'displayName', 'photos', 'email', 'profileUrl']

        },
        function(token, refreshToken, profile, done) {

              process.nextTick(function() {
                var newOne = '';
                var num = 0;
                var tempName = profile.displayName.split(' ');
                var newFirst = tempName[0];
                var newLast = tempName[1];
                var emails = [];
                if (profile.emails.constructor == Array) {
                  for (var x = 0; x < profile.emails.length; x++) {
                    emails.push(profile.emails[x].value);
                  }
                }
                else {
                  emails.push(profile.emails);
                }

                  User.find({}, function(err, list) {
                    if (err) {
                    console.log('Failed to Find a User List');
                      return done(err);
                    }
                    else {
                      console.log('Checking for User');
                          var num = Math.round(list.length + 2);
                          var tempUsername = profile.displayName.replace(/[^a-z ]/gi, '');
                          var temp = tempUsername.split(' ');
                          newOne = temp.join("_");
                          newOne = newOne + num;
                    }
                    });
                    // find the user in the database based on their facebook id
                    User.findOne({ 'data.customerNumber' : profile.id }, function(err, user) {

                      if (err) {
                        return done(err);
                      }
                      // if the user is found, then log them in
                      if (user) {
                      console.log('Found User from Facebook Authorization');
                        return done(null, user);
                      }
                      else {
                        var newUser = new User();
                          newUser.data.username = newOne;
                          newUser.data.firstName = newFirst;
                          newUser.data.lastName = newLast;
                          newUser.data.customerNumber = profile.id;
                          newUser.data.oauth = token;
                          newUser.data.socialLogin = "facebook";
                          newUser.data.displayName  = profile.displayName;
                          newUser.data.email = emails;
                          newUser.data.url = profile.profileUrl;
                          newUser.data.picture = profile.photos[0].value;
                          newUser.data.goalHistory = {};
                          newUser.data.currentGoals = {};

                          newUser.save(function(err) {
                            if (err) {
                            console.log('Failed to Create User from Facebook Authorization');
                              return done(err);
                             }
                              // if successful, return the new user
                              console.log('Created User from Facebook Authorization');
                              return done(null, newUser);
                            });

                          }

                    });



              });
        }));

      };
