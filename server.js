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
  models.User.findOne({ username: username }, function (err, user) {
    if (err) {
      console.error('!!!! Error fetching user in LocalStrategy', err);
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: '!!! Incorrect username.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: '!!! Incorrect password.' });
    }
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
  User.findOne({_id: req.user._id}, function(err, userobj){
    userobj.courses.push(req.body.courses);
    userobj.save();
    res.send(userobj)
  })
})

app.post('/api/deletecourse', function(req, res){
  User.findOne({_id: req.user._id}, function(err, userobj){
    let filteredArr = userobj.courses.filter((courseobj)=>
      (courseobj.dept !== req.body.courses.dept)
      || (courseobj.number !== req.body.courses.number));
    userobj.courses = filteredArr
    userobj.save();
    res.send(userobj)
  })
});

app.post('/api/getcourse', function(req,res){
  User.findOne({_id: req.user._id}, function(err, userobj){
    res.send(userobj.courses)
    console.log('userobj.courses here(server line 106)', userobj.courses)
  })
})

app.post('/api/getuser', function(req,res){
  User.findOne({_id: req.user._id}, function(err, userobj){
    res.send(userobj)
    console.log('server.js api/getuser userobj', userobj)
  })
})

app.post('/api/testingmajor', function(req,res){
  User.findOne({_id: req.user._id}, function(err, userobj){
    console.log('userobj from server', userobj)
    console.log('req.body from server', req.body)
    userobj.testingmajor = req.body.testingmajor
    userobj.save()
    res.send(userobj)
  })
})

app.get('/api/compute_algorithm', (req,res) => {
  const alg = require('./algorithm')
  User.findOne({_id: req.user._id})
  .then(user => {
    const major = user.testingmajor
    const courses = user.courses.sort(function(a, b){
      return a.num - b.num;
    })
    // console.log('SERVER API/COMPUTE_ALGO MAJOR', major)
    const retObj = alg.newreturncourses(user, courses)
    // console.log('RETOBJ here', retObj) // this works
    console.log('RETOBJ>MAJORST', retObj.majorStatuses[0])
    res.json({
      majorStatuses: retObj.majorStatuses,
      completedPercentage: retObj.completedPercentage,
      incompleteSetCount: retObj.incompleteSetCount,
      totalSetCount: retObj.totalSetCount
    })
  })
  .catch(err => {
    console.log('server.js /api/compute_algorithm error',err)
  })
})

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

app.listen(3000, function () {
  console.log('Backend server running on port 3000!')
})

module.exports = app
