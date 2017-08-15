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

var getReqArray = function(major){
  if(major.required_sets.type==="set"){
    if(major.required_sets.rules.ALL){
      var start = major.required_sets.rules.ALL // in this case ["200","300"]
      Courses.find({
        number: {
          $gte: Number(start[0]) // eventually loop through it again, but in this case: 200
        }
      })
    }

    // Courses.find({
    //   number: {
    //     $gte: Number(start[0]),
    //     $lte: Number(start[0]) + 99
    //   }
    // })

    // will return an array of courses w/ a course number greater than the lower # of "ALL" array
    // remove "NOT", "courses" is an array that's returned
    .then((courses) => {
      if(set.rules.NOT){
        const filtered = courses.filter((course) => {
          if(set.rules.NOT.some((crs) => crs === course)){
            return false
          }
          return true
        }) // will return an array without NOT courses
        return filtered
      }
      // is this necessary????
      else {
        const filtered = courses
        return filtered
      }
    })
    // add "OR"
    .then((filtered) => {
      if(set.rules.OR){
        set.rules.OR.forEach((crs) => {
          filtered.push(crs)
        })
        return filtered
      }
    })
  } else if(set.type==="explicit") {
    Courses.find({
      number: major.require_sets.courses.num
      dept: major.require_sets.courses.dept
    })
  }
}



//for example, for economics
//looping through all economics requirements array (sets)
// const ECONreqArray = majorReq.ECON.required_sets
// for(let c=0; c<ECONreqArray.length; c++){
//   const set = ECONreqArray[c]
//   if(set.type === "explicit"){
//     // console.log('ECON req, explicit:', set.course)
//     MyCourse.find({
//       dept: set.course.split(' ')[0],
//       num: set.course.split(' ')[1]
//     })
//     .then((resp) => {
//       // console.log('85 explicit ECON courses in MyCourse:', resp)
// // [ { _id: 598a0614194d581d33d06c49, dept: 'ECON', num: 101, __v: 0 } ]
//       for(let d=0; d<resp.length; d++){
//         const thisCourse = resp[d].dept + ' ' + resp[d].num
//         // console.log('89 thisCourse', thisCourse)
//         if(set.course === thisCourse){
//           set.completed = true
//           // console.log('92 after completed = true:', set)
//         }
//       }
//       //here ECON101: true
//       console.log('98 updated withCompleted', majorReq.ECON.required_sets)
//     })
//   } else if(set.type === "set"){
//     MyCourse.find
//   }
// }




// const check = function(major){
//   const majorObj = majorReq[major]
//   console.log('majorObj:', majorObj.required_sets)
//   for(let k=0; k < majorObj.required_sets.length; k++){
//     const set = majorObj.required_sets[k]
//     console.log('set',set)
//     if(set.type==="explicit"){
//       // console.log('mongoose courses', Course)
//       const expCourse = Course.find({
//         dept: set.course.split(' ')[0],
//         num: set.course.split(' ')[1]
//       }) // async
//       //callback - save
//       // whitelist.push(expCourse)
//       //// works until here! git pushed
//     } else if(set.type==="set"){
//       if(set.rules.ALL){
//         const start = set.rules.ALL
//         const allCourses = Course.find({
//           dept: major,
//           num: {
//             $gte : Number(start[0])
//         }
//       })
//     }
//     if(set.rules.NOT){
//       const excludingCourses = Course.find({
//         dept: set.course.split(' ')[0],
//         num: set.course.split(' ')[1]
//       })
//     }
//     if(set.rules.OR){
//       const orCourses = Course.find({
//
//       })
//     }
//   }
// }
// }
//







// find user's course array and check if each course satisfies
User.findOne({lastName: "Moon", firstName: "Chloe", testingMajor: "ECON"})
.then(async (user) => { // user model obj
  const userCourse = await sort('598cc0ac4ac74437f569f4a3') // sorted course array
  //userCourse = [{"num":303,"dept":"ECON"},{"num":220,"dept":"ECON"}]
  userCourse.forEach((coursename) => {
    // coursename =  { num: 303, dept: 'ECON' } // { num: 220, dept: 'ECON' }
    if(majorReq[user.testingMajor]){
      const sets = majorReq[user.testingMajor].required_sets
      // sets = econ required_sets array
      sets.forEach((set) => {
        // console.log('EACH SET HERE: ', set)
        const courseSt = coursename.dept + ' ' + coursename.num
        if(set.type === "explicit"){
          if(set.course === courseSt){
           set.completed = true
         } // works till here (8/9)
        } else if(set.type === "set"){
          //set functions here!!!
          ///////////// ALL //////////////////
          if(set.rules.ALL){
            //if the course is in NOT, return false; else - // also, +99 instead of this
            let cond1 = coursename.dept === user.testingMajor
            let cond2 = (Number(coursename.num) > Number(set.rules.ALL[0])) && (Number(coursename.num) < Number(set.rules.ALL[0]) + 99)
            // let cond2 = false
            // set.rules.ALL.forEach((level, index) => {
            if (cond1 && cond2) {
              // console.log('SET + coursename HERE', set, coursename)
              if(set.rules.NOT){
                //loop through not array and if this course is not in this array, return true, otherwise return false
                set.rules.NOT.forEach((course) => {
                  if(course !== courseSt){
                    console.log('SET line 166', set, 'COURSEST', courseSt, 'COURSE', course)
                    set.completed = true
                    set.slot = coursename
                    console.log('SET line 168', set, 'COURSEST', courseSt, 'COURSE', course)
                  }
                  return false
                })
              }
            } else {return false}
            // })
          }
          ///////////// NOT ///////////////
          // if(set.rules.NOT){
          //   // console.log('NOT SETS', set.rules.NOT)
          //   // console.log('coursename', coursename)
          //   if(set.course !== courseSt){
          //     console.log('NOT is working', courseSt)
          //     return true
          //   }
          //   console.log('NOT is NOT working', courseSt)
          //   return false
          // }
        }
      })
    }
  })
