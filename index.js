const express = require('express')
const session = require('express-session')
const bodyParser = require("body-parser");
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const { User, Feedback } = require('./db');

const app = express()
const port = process.env.PORT || 5000;


// ---- Middelware Setup ----
app.use(express.static('frontend/build'))

// Set up session management
app.use(session({
  secret: 'todo real secret from env',
  resave: false,
  saveUninitialized: true,
  cookie: {} // Would add { secure: true } if this is a production app
}));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// Middleware for requiring auth on an endpoint
const requiresAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(403).send('unauthorized');
  }
}

// ---- PassportJS Setup ----
// Set up Passportjs, which handles authentication + session setup
passport.use(new LocalStrategy(
  async (username, password, done) => {
    const user = await User.findOne({ where: { username } })
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    // Why is validPassword not a function?  Is instanceMethods not working?
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.username);
});
passport.deserializeUser(async function(username, done) {
  const user = await User.findOne({ where: { username } });
  done(null, user)
});

// ---- Views ----
// Some cheap "views" for turning model objects into json strings

const userShow = (user) => JSON.stringify({ id: user.id, username: user.username })
const feedbackShow = (feedback) => JSON.stringify({ content: feedback.content });

// ---- Routes ----

app.post('/api/session', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.status(403).send('unauthorized') }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send(userShow(user))
    });
  })(req, res, next);
});

app.delete('/api/session', requiresAuth, function(req, res, next) {
  req.logout();
  res.status(204).send()
});

app.post('/api/users', async function(req, res) {
  const { username, password } = req.body;
  let user = await User.findOne({ where: { username } });
  if (user != null) {
    res.status(400).send(userShow(user));
  } else {
    user = await User.create({ username, password });
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send(userShow(user))
    });
  }
  res.send('done');
});

app.patch('/api/feedback', requiresAuth, async (req, res) => {
  const { content } = req.body
  let feedback = await req.user.getFeedback();
  if (feedback == null) {
    feedback = await Feedback.create({ content });
    req.user.setFeedback(feedback);
  } else {
    await feedback.update({ content });
  }
  throw "SLACK!"
  res.send(feedbackShow(feedback));
  //fafds dfs fasd fds adfs
  // TODO: also send to slack here
});
app.get('/api/user', requiresAuth, async (req, res) => {
  res.send(userShow(req.user));
});
app.get('/api/feedback', requiresAuth, async (req, res) => {
  let feedback = await req.user.getFeedback();
  if (feedback == null) {
    feedback = Feedback.create({ content: '', user: req.user });
    req.user.setFeedback(feedback);
  }
  res.send(feedbackShow(feedback));
});

app.listen(port, () => console.log(`Listening on port ${port}!`))
