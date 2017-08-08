import React, { Component } from 'react';
import '../css/Profile.css';

const fakeData = {
 "fall17Array": [
  {"courseinfo": "AFR 105 - 01 (13587) T - 01:30 pm - 04:00 pm; Current Enrollment: 17; Seats available/Max: 29/46; Distribution(s): HS, SBA",
   "coursename": "Introduction to the Black Experience"},
  {"courseinfo": "AFR 217 - 01 (13813) MTh - 01:30 pm - 02:40 pm; Current Enrollment: 6; Seats available/Max: 24/30; Distribution(s): SBA",
   "coursename": "The Black Family"},
   {"courseinfo": "EDUC 212 - 01 (11794) T - 01:30 pm - 04:00 pm; Current Enrollment: 24; Seats available/Max: 6/30;FY Reserved Seats: 10; Distribution(s): HS",
    "coursename": "Seminar: History of American Education"}]
 }

var courseNumArray = []
var courseId = function(){
  for(var i=0; i< fakeData.fall17Array.length; i++){
    var id = fakeData.fall17Array[i].courseinfo.split(' ',2).join('')
    courseNumArray.push(id)
  }
  return courseNumArray
}

console.log('courseId here', courseId)
console.log('courseNumArray here', courseNumArray)

// at this point, courseNumArray = ["AFR 105", "AFR 217", "EDUC 212"]

class Semester extends Component {
  constructor(props){
    super(props)
    this.state={
      semester:'',
      courses:[]
    }
  }

  render() {
    return (
      <div>
        <p>Course Number here:</p>
        <ul>
          {courseNumArray.map((courseNum)=> <li>{courseNum}</li>)}
        </ul>
      </div>
);
}
}

export default Semester;
