// each course is mongoose model

//end goal:
//an array of all the sets with appropriate courses inside, each group

//Course class
var ECON101 = {number: 101, dept: "ECON", level: 1}
// fake data
//Courses = all Wellesley courses
var Courses = [{number: 101, dept: "ECON"},{number: 102, dept: "ECON"},{number: 103, dept: "ECON"},{number: 203, dept: "ECON"},{number: 303, dept: "ECON"}]
var MyCourses = [{number: 101, dept: "ECON"},{number: 102, dept: "ECON"},{number: 101, dept: "ECON"}]

//take rule and make json
//for example, just for economics
//var set = coursesReq.ECON.required_sets[7] // eventually loop through

// !?!?!?!!?!?!?!? understand this part and make it cleaner
//if(start.indexOf(start.length - 1) === "+"){
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
