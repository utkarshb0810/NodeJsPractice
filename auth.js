//passport
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Person = require("./models/person");

passport.use(
  new localStrategy(async (USERNAME, password, done) => {
    //authentication logic
    try {
      //console.log("Received Credentials:", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
