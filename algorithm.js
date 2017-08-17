
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
for(let b=0; b<Object.keys(majorReq).length; b++){
  const eachMajor = Object.keys(majorReq)[b]
  const eachReqSet = majorReq[eachMajor].required_sets
  for(let a=0; a<eachReqSet.length; a++){
    const eachSet = eachReqSet[a]
    eachSet["completed"] = false
  }
}



//helper function
// here, course: an obj with dep and num
const satisfies = function(set,course){
  const courseSt = course.dept + ' ' + course.number
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
              && course.number > allSetNum
              && course.number < allSetNum+99){
              return true
            }
          }
      }
      return false;
    }
  }
}

//new returncourses
const newreturncourses = function(user, courses){
  for(let i=0; i<courses.length; i++){
    if(majorReq[user.testingmajor]){
      const sets = majorReq[user.testingmajor].required_sets;
      for(let j=0; j<sets.length; j++){
        if(!sets[j].completed && satisfies(sets[j],courses[i])){
          sets[j].completed = true
          break;
        } else {
          // console.log('162: satisfies func is false for sets', sets[j], 'userCourse', userCourse[i])
        }
      }
    }
  }
  // console.log('updated majorReq obj', majorReq.ECON.required_sets)
  const sets = majorReq[user.testingmajor].required_sets
  const incompleteArr = []
  const completeArr = []
  sets.forEach((set) => {
    if(set.completed === false){
      incompleteArr.push(set)
    } else if(set.completed === true){
      completeArr.push(set)
    }
  })
  console.log('completed arr here', completeArr, 'incomplete here', incompleteArr)
  const majorStatuses = {}
  majorStatuses['completed'] = completeArr;
  majorStatuses['incompleted'] = incompleteArr;
  console.log('MAJOR STATUSES ARRAY HERE', majorStatuses) // works
  // console.log('170 incompleteArr', incompleteArr)
  const incompleteSetCount = Number(incompleteArr.length);
  const totalSetCount = Number(sets.length);
  const completedPercentage = 100-(incompleteSetCount)/(totalSetCount)*100
  return {
    majorStatuses,
    completedPercentage,
    incompleteSetCount,
    totalSetCount
  }
}


// find user's course array and check if each course satisfies
const returncourses = function(userId){
  User.findOne({_id: userId})
  .then(async (user) => { // user model obj
    const userCourse = await sort(user._id) // sorted course array
    for(let i=0; i<userCourse.length; i++){
      if(majorReq[user.testingmajor]){
        const sets = majorReq[user.testingmajor].required_sets;
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
    return majorReq[user.testingmajor].required_sets
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

module.exports = {newreturncourses, satisfies, sort, majorReq};
