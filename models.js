const mongoose = require('mongoose');
const connect = process.env.MONGODB_URI
mongoose.connect(connect);

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  dept: String,
  num: Number
})
const userSchema = new Schema({
  username: String,
  password: String,
  courses: [{
  //   // input
  //   // type: Schema.Types.ObjectId,
  //   // ref: 'MyCourse'
  }],
  testingmajor: String,
  majorStatuses: {}
})
const WellesleyCourse = mongoose.model('WellesleyCourse', courseSchema)
const MyCourse = mongoose.model('MyCourse', courseSchema)
const User = mongoose.model('User', userSchema)

module.exports = {
  WellesleyCourse: WellesleyCourse,
  MyCourse: MyCourse,
  User: User
}
