const mongoose = require('mongoose');
const connect = process.env.MONGODB_URI
mongoose.connect(connect);

const models = require('./models');
const User = models.User
const fakeMe = new User({
  lastName: "Moon",
  firstName: "Chloe",
  testingMajor: "ECON",
  courses: [{dept: "ECON", num: 102}, {dept: "ECON", num: 101}, {dept: "HIST", num: 205},
  {dept: "ECON", num: 103}, {dept: "MATH", num: 330}, {dept: "MATH", num: 205}, {dept: "ECON", num: 303}, {dept:"ECON", num:220}, {dept: "PSYCH", num: 205}]
})//.save()
// fakeMe.courses = [new MyCourse({dept:"ECON", num:101}), new MyCourse({dept:"ECON", num:102}), new MyCourse({dept:"MATH", num:205})]
// fakeMe.save()

const createWellesdata = function(){
  const department = ["ECON", "MATH"]
  const numbers = [101, 102, 103, 201, 202, 203, 210, 220, 234, 301, 302, 303, 350, 360]
  for(let i=0; i<department.length; i++){
    for(let j=0; j<numbers.length; j++){
      const newCourse = new WellesleyCourse({
        dept: department[i],
        num: numbers[j]
      })
      newCourse.save()
    }
  }
}
// createWellesdata()
const createMydata = function(){
  const department = ["ECON", "MATH"]
  const numbers = [101, 102, 103]
  for(let i=0; i<department.length; i++){
    for(let j=0; j<numbers.length; j++){
      const newMyCourse = new MyCourse({
        dept: department[i],
        num: numbers[j]
      })
      newMyCourse.save()
    }
  }
}
// createMydata()

//'Blue Whale'.indexOf('Blute');    // returns -1 bc doesn't exist
// if there's another user, populate like this:
// User.findById("jojo").populate("courses").then(user => {
//   console.log(user)
// })

var sort = async function(userid){
  var sorted = await User.findbyId(userid, function(err){
    console.log('User.findById err', err)
  }) //// check
  .then((user)=> {
    console.log('sort user here', user)
    let userCrs = user.courses
    let sorted = userCrs.sort(function(a, b){
      return a.num - b.num;
    })
    return sorted
  })
  console.log('sorted my course array here', sorted)
  return sorted;
};

// getting major req document (a) & majorReq is a copy actually
const a = require('./data/requirementsData/majorReq.json')
const majorReq = Object.assign({}, a)
// byMajor(): returns majorReq w/ "completed" fields!
const byMajor = function(){
  for(let b=0; b<Object.keys(majorReq).length; b++){
    const eachMajor = Object.keys(majorReq)[b]
    const eachReqSet = majorReq[eachMajor].required_sets
    for(let a=0; a<eachReqSet.length; a++){
      const eachSet = eachReqSet[a]
      eachSet["completed"] = false
    }
  }
}
byMajor()



//helper function
const satisfies = function(set,course){
  const courseSt = course.dept + ' ' + course.num
  switch(set.type){
    case "explicit":
      if(set.course === courseSt){
        return true
      }
      return false
    case "set": {
      if(set.rules.NOT){
        const notArray = set.rules.NOT
        for(let i = 0; i < notArray.length; i++){
          const course = notArray[i]
          if(course === courseSt){
            return false
          }
        }
      }
      if(set.rules.OR){
        const orArray = set.rules.OR
        for(let i = 0; i < orArray.length; i++){
          if(courseSt === orArray[i]){
            return true
          }
        }
        // return false ???? is this needed
      }
      if(set.rules.ALL){
        const allArray = set.rules.ALL
          for(let i = 0; i < allArray.length; i++){
            const allSetNum = Number(allArray[i].split(' ')[1])
            const allSetDept = allArray[i].split(' ')[0]
            if(course.dept === allSetDept
              && course.num > allSetNum
              && course.num < allSetNum+99){
              return true
            }
          }
      }
      return false;
    }
  }
}

// find user's course array and check if each course satisfies
const returncourses = function(userId){
  User.findOne({_id: userId})
  .then(async (user) => { // user model obj
    const userCourse = await sort(user._id) // sorted course array
    for(let i=0; i<userCourse.length; i++){
      if(majorReq[user.testingMajor]){
        const sets = majorReq[user.testingMajor].required_sets;
        for(let j=0; j<sets.length; j++){
          if(!sets[j].completed && satisfies(sets[j],userCourse[i])){
            sets[j].completed = true
            break;
          } else {
            // console.log('162: satisfies func is false for sets', sets[j], 'userCourse', userCourse[i])
          }
        }
      }
    }
    // console.log('updated majorReq obj', majorReq.ECON.required_sets)
    return majorReq[user.testingMajor].required_sets
  })
  .then((resp) => {
    console.log('resp here', resp)
    const incompleteArr = []
    resp.forEach((set) => {
      if(set.completed === false){
        incompleteArr.push(set)
      }
    })
    // console.log('170 incompleteArr', incompleteArr)
    const incompSetNum = Number(incompleteArr.length);
    const totalSetNum = Number(resp.length);
    const completedPer = (incompSetNum)/(totalSetNum)*100
    const major = resp[0].course.split(' ')[0]
    console.log(incompleteArr)
    console.log('YOU ARE', completedPer, '% DONE WITH', major, 'MAJOR!!!! YOU NEED', incompSetNum, 'OUT OF', totalSetNum, 'MORE CLASSES TO COMPLETE THE MAJOR!!!!')
  })
}

module.exports = {returncourses, satisfies, byMajor, sort, majorReq};
