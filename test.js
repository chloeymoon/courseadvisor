//all majors in this array, each major has name and requirements
var majors = [];
//all courses in this array, each course has dept name, number etc.
var courses = [];

var m = new Major("ECON", [ //requirements here

])


class Advisor{
  constructor(){
    this.major;
    this.courses = [];
  }

  listNeededClassesForMajor(major, coursesTaken){
    this.major= major;
    this.coursesTaken = coursesTaken;
    if(major.requirements !== coursesTaken){
      major.requirements.filter(function(element){
        for(var i=0; i<major.requirements.length; i++){
          return element !== major.requirements[i]
        }
      })
    }
  }

}

class Major{
  //var econReq = [new Course("ECON",101), new Course("ECON",103), new Course('ECON', 201), new Course("ECON", 203), econElectives]
    constructor(majorName, req){
        this.majorName = majorName;
        this.requirements = req;
    }
    completedMajor(){
      if(){
        return true
      }
      return false;
    }
}

class CourseGroup{
    constructor(name, whitelist, blacklist, level, dept){
        this.name = name;
        //whitelist: an array of courses that
        this.whitelist = whitelist;
        // this.blacklist = blacklist; -- no blacklist!!!! just whitelist (array of "sets")
        //if no level, only use courses and notCourses
        this.level = level; // level : array
        this.dept = dept;
    }
}

var econElectives = new CourseGroup("electives", [new Course("ECON",101),new Course("ECON",102)], [new Course("ARTH",100)], 3, "ECON")
//econElectives = CourseGroup {name: "electives", courses: Array(2), notCourses: Array(1), level: 3, major: "ECON"}

class Course{
    constructor(dept, num){
        this.dept = dept;
        this.num = num;
        this.level = Math.floor(num/100);
        //dist later
    }
}
//Course {number: 101, major: "ECON", level: 1}
//Course("ECON",101)


// required courses to major in economics
var courses = [];

ex) ECON:
courses.push(new Course(101, "ECON", 1))
courses.push(new CourseGroup("elective",))
/////////////////////////////////////////////////////////////////////////////////

//example data:
{
  "dept": "ECON",
  "num:" : 101,
  threehundred: false
},
{
  "dept": "ECON",
  "num": 102,
  threehundred : false
}

//mongoose model:
var Course = mongoose.model('Course', courseChema);
var courseSchema = new Schema({
  name: String,
  dept: String,
  num: Number,
  threehundred: Boolean,
  dist: String
})

var newCourse = new Course({name:,dept:,num:}).save()
// Course.findOne({dept:,num:})

var criteriaArray = []

var exp = function(dept,num){
  var explicitArray = Course.find({dept:dept,num:num})
  // returns an array
  var criteriaArray = criteriaArray.concat(explicitArray) // returns the new array
  return criteriaArray
}

//all_match function returns an array (allmatch) of all the courses that match the criteria
var all_match = function(dept,num){
  var allMatchArray = Course.find({dept:dept,num:num})
  var criteriaArray = criteriaArray.concat(allMatchArray)
  return criteriaArray
}


//or function adds the selected courses to the criteria array
const or = function(dept, num){
  return Course.find({})
criteria.push()
}

//not function gets rid of the selected courses from the criteria
var not = criteria.filter(function(notdept,notnum){
for(var i=0; i<criteria.length; i++){

}
return course.dept !==
})


//allcourses data:
var allcourses = [{dept:"ECON", num:101, credit:1}, {dept:"ECON", num:102, credit:1}, {dept:"ECON", num:103, credit: 0.5}]

//individual student "courses" array:
var courses =[{dept:"ECON", num:101}, {dept:"ECON", num:102}, {dept:"ARTH", num:101}, {dept:"MATH", num:205}]

// different functions:
// ex) course = {dept: "ECON", num:101}

ECONmajor = [
  {core:{dept:"ECON", num:101},{dept:"ECON",num:102}},
  {no300elective:{dept:"ECON", num:220},
  {yes300elective: {dept:"ECON",num:300}}
]


var criteria = [{core:''},{no300elective:''},{yes300elective:''}]




var threehundred = function(course.num){
  if(course.num>=300){
    return true
  }
  return false
}

1) create the user-specific array for that specific major/dept / or just all
2) create the criteria array for that major req / or a function????
3) compare those two arrays
4) if they are the same, major is completed
5) if not, slice the array and display the rest??

rules:
ex) ECON major:
var ECONMajor = function(){
  var majorArray = []
  majorArray.push()
}



///////////////

function Major (minUnits, reqCourses, electives, min300, complete){
  this.minUnits = minUnits;
  this.reqCourses = reqCourses;
  this.electives = electives;
  this.min300 = min300;
  this.complete = false
}

ECONmajor = new Major(9,
  ["ECON 101","ECON 102","ECON 103","ECON 201","ECON 202","ECON 203"],
  ["QR 260"],
  2
)
//ECON 103 or (MATH 220, STAT 218, PSYC 205)
//ordinarily not counting ECON 350, ECON 360, or ECON 370
//minimum of 2 300-lev courses must be @welles
//with prior approval, 300-lev MIT econ may be used to satisfy one of the 300 lev

function Minor (minUnits, reqCourses, electives, min300, complete){
  this.minUnits = minUnits;
  this.reqCourses = reqCourses;
  this.electives = electives;
  this.min300 = min300;
  this.complete = false
}

var ECONminor = {
  minUnits:
}
