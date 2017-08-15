//setup
const express = require('express')
const app = express()
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const connect = process.env.MONGODB_URI
mongoose.connect(connect);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
//app.use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//mongoose model
const models = require('./models')
// const WellesleyCourse = models.WellesleyCourse
// const MyCourse = models.MyCourse
const User = models.User

// check if necessary
// var validateReq = function(userData) {
//   return (userData.password === userData.passwordRepeat);
// };

// Passport set up
app.use(session({
  secret: 'Secret',
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.set('view engine', 'html');
console.log('hello from server')
// passport strategy
passport.use(new LocalStrategy(function(username, password, done) {
  // Find the user with the given username
  models.User.findOne({ username: username }, function (err, user) {
    // if there's an error, finish trying to authenticate (auth failed)
    if (err) {
      console.error('!!!! Error fetching user in LocalStrategy', err);
      return done(err);
    }
    // if no user present, auth failed
    if (!user) {
      return done(null, false, { message: '!!! Incorrect username.' });
    }
    // if passwords do not match, auth failed
    if (user.password !== password) {
      return done(null, false, { message: '!!! Incorrect password.' });
    }
    // auth has has succeeded
    return done(null, user);
  });
}
));
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
app.use(passport.initialize());
app.use(passport.session());
app.post('/register', function(req, res) {
  console.log('hello from server.js 74')
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  })
  user.save(function(err,user){
    if(err){
      console.log('user register error', err)
    }
  })
  res.redirect('/')
  })

app.post('/api/updatecourse', function(req, res){
  console.log("api start")
  User.findOne({_id: req.user._id}, function(err, userobj){
  console.log("api about to push")
    userobj.courses.push(req.body.courses);
    console.log("api about to save")
    userobj.save();
    console.log('updated courses (userobj.courses) array after saving:', userobj.courses)
    res.send(userobj)
  })
})

app.post('/api/deletecourse', function(req, res){
  User.findOne({_id: req.user._id}, function(err, userobj){
    let filteredArr = userobj.courses.filter((courseobj)=>
      (courseobj.dept !== req.body.courses.dept)
      || (courseobj.num !== req.body.courses.num));
    userobj.courses = filteredArr
    userobj.save();
    res.send(userobj)
  })
});

app.post('/api/getcourse', function(req,res){
  console.log('server 108')
  User.findOne({_id: req.user._id}, function(err, userobj){
    res.send(userobj.courses)
  })
})

// app.get('/api/updatecourse', function(req,res){
//   User.find({_id: req.user._id}).populate('_id')
//   .exec(function(err,user){
//     console.log('server.js 104 user', user)
//     res.json(user)
//   })
// })

app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}),
function(req, res){
  res.redirect('/users/' + req.user.username)
});
passport.authenticate('local', { failureFlash: 'Invalid username or password.' });

app.get('/login', (req,res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'))
})
app.get('/register', (req,res) => {
  res.sendFile(path.join(__dirname, 'public/register.html'))
})
app.get('/logout', function(req,res) {
  req.logout()
  // res.json({"success": "true"})
  res.redirect('/')
  // res.send('Logout Successful')
});
app.use((req,res,next) => {
  if(!req.user){
    res.redirect('/login')
  } else {
    next()
  }
})

//order matters here
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'public/app.html'));
});

//M3 - change app to server
app.listen(3000, function () {
  console.log('Backend server running on port 3000!')
})

// app.listen(3000, function () {
//   console.log('Backend server for Electron App running on port 3000!')
// })
module.exports = app
