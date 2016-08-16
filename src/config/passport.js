var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

   // load up the user model and auth variables
   var User       = require('../models/user');
   var clientID, clientSecret, callbackURL;

  
   // Disable "configAuth" to turn off test mode
   var configAuth = require('./auth');
   // If else statment for test mode
  if (configAuth) {
      clientID = process.env.fbID || configAuth.facebookAuth.clientID;
      clientSecret = process.env.FBSecret || configAuth.facebookAuth.clientSecret;
      callbackURL = process.env.fbCbUrl || configAuth.facebookAuth.callbackURL;
  } else {
      clientID = process.env.fbID;
      clientSecret = process.env.FBSecret;
      callbackURL = process.env.fbCbUrl;
  }





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
                for (var x = 0; x < profile.emails.length; x++) {
                  emails.push(profile.emails[x].value);
                }
                  User.find({}, function(err, list) {
                    if (err) {
                    console.log('Failed to Find a User List');
                      return done(err);
                    }
                    else {
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
                          newUser.profile.username = newOne;
                          newUser.data.firstName = newFirst;
                          newUser.data.lastName = newLast;
                          newUser.data.customerNumber = profile.id;
                          newUser.data.oauth = token;
                          newUser.data.socialLogin = "facebook";
                          newUser.profile.displayName  = profile.displayName;
                          newUser.data.email = emails;
                          newUser.data.url = profile.profileUrl;
                          newUser.profile.picture = profile.photos[0].value;
                          newUser.data.shippingAddress.name = profile.displayName;
                          newUser.data.billingAddress.name = profile.displayName;
                          newUser.data.shippingAddress.useBilling = true;
                          newUser.data.emailMailingList = true;
                          newUser.data.researchAndDevelopment = true;
                          newUser.data.billingAddress.address = "Add Address";
                          newUser.data.shippingAddress.address = "Add Address";
                          newUser.data.billingAddress.city = "Add City";
                          newUser.data.shippingAddress.city = "Add City";
                          newUser.data.billingAddress.state = "Add State";
                          newUser.data.shippingAddress.state = "Add State";
                          newUser.data.billingAddress.country = "Add Country";
                          newUser.data.shippingAddress.country = "Add Country";
                          newUser.data.billingAddress.zip = "Add Zip";
                          newUser.data.shippingAddress.zip = "Add Zip";
                          newUser.data.cart = {};
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
