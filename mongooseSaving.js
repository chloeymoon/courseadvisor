var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI
mongoose.connect(connect);
var Schema = mongoose.Schema;
var courseSchema =  new Schema({
  dept: String,
  num: Number
})
var Course = mongoose.model('Course', courseSchema)


var createdata = function(){
  var department = ["ECON", "MATH"]
  var numbers = [101, 102, 103, 201, 202, 203, 210, 220, 234, 301, 302, 303, 350, 360]
  for(var i=0; i<department.length; i++){
    for(var j=0; j<numbers.length; j++){
      var newCourse = new Course({
        dept: department[i],
        num: numbers[j]
      })
      newCourse.save()
    }
  }
}
createdata()
// courses saved with key dept & num

// getting major req document, JSON
var majorReq = require('./majorReq.json')
var whitelist = []

var getReqArray = function(major){
  const majorObj = majorReq[major]
  console.log('majorObj:', majorObj.required_sets)
  for(let k=0; k < majorObj.required_sets.length; k++){
    const set = majorObj.required_sets[k]
    console.log('s',set)
    if(set.type==="explicit"){
      console.log('mongoose courses', Course)
      const expCourse = Course.find({
        dept: set.course.split(' ')[0],
        num: set.course.split(' ')[1]
      })
      whitelist.push(expCourse)
    }
  }
  console.log('whitelist, line47', whitelist)
}
getReqArray("ECON")
