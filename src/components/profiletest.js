// Profile page: user selects semester, department, and courses they've taken
// and it saves the information to the database

import React, { Component } from 'react';
import '../css/Profile.css';

const fakeData = [{'fall17':{'courseinfo':'ECON101','coursename':'intro to micro'}},
{'spring17':{'courseinfo':'ECON102','coursename':'intro to macro'}},
{'fall16':{'courseinfo':'ECON103','coursename':'intro to stat'}},
{'spring16':{'courseinfo':'ARTS108','coursename':'intro to photography'}},
{'fall15':{'courseinfo':'MATH205','coursename':'multivariable'}},
{'spring15':{'courseinfo':'PSYCH101','coursename':'intro to psych'}}]

class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      semester:{
        courses:[]
      }
      // {'falll17':['ECON 101', 'ECON 102', 'ECON103', 'CHIN101']}
    }
  }

  // formSubmit(){
  //   this.setState({semester.semName: e.target.value})
  // }


  // componentDidMount(){
  //   fetch('http://...url', {
  //     method: 'GET',
  //     credentials: 'include',
  //     success: function(data){}
  //   }).then((response)=>{
  //     return (response.json())
  //   }).then((courseobj)=>{
  //     this.setState({courses: courseobj})
  //     console.log('courses obj here', courseobj)
  //   }).catch(err) => {
  //     console.log('error, profile.js line34', err)
  //   }
  // }

  // selectSemester()
  //
  // selectDepartment()

  render() {
    return (
      <div>
        <div>Add Classes</div>
        <form>
          {/* <div class="formsection"> */}
            {/* onChange="this.form.submit();" */}
            {/* <p>Semester</p>
            <select id="semester"  class="w-select filter_selecter" name="semester">
              <option value="201709"  selected  >Fall 2017</option>
              <option value="201707"  >Summer II 2017</option>
              <option value="201706"  >Summer I 2017</option>
              <option value="201702"  >Spring 2017</option>
              <option value="201609"  >Fall 2016</option>
              <option value="201607"  >Summer II 2016</option>
              <option value="201606"  >Summer I 2016</option>
              <option value="201602"  >Spring 2016</option>
              <option value="201509"  >Fall 2015</option>
              <option value="201507"  >Summer II 2015</option>
              <option value="201506"  >Summer I 2015</option>
              <option value="201502"  >Spring 2015</option>
              <option value="201409"  >Fall 2014</option>
            </select> */}
          {/* </div> */}
          {/* onClick="javascript:resetSubject(this.form)" */}
          <div class="formsection">
            <p>Department</p>
            <select id="department" class="w-select filter_selecter" name="department" >
              <option value="All" selected >All Departments</option>
              <option value="AFR"  >Africana Studies</option>
              <option value="AMST"  >American Studies</option>
              <option value="ANTH"  >Anthropology</option>
              <option value="ART"  >Art</option>
              <option value="ASTR"  >Astronomy</option>
              <option value="BIOC"  >Biochemistry</option>
              <option value="BISC"  >Biological Sciences</option>
              <option value="CHEM"  >Chemistry</option>
              <option value="CAMS"  >Cinema and Media Studies</option>
              <option value="CLST"  >Classical Studies</option>
              <option value="CLSC"  >Cognitive and Linguistic Sci</option>
              <option value="CPLT"  >Comparative Literature</option>
              <option value="CS"   >Computer Science</option>
              <option value="EALC"  >East Asian Languages and Cult</option>
              <option value="ECON"  >Economics</option>
              <option value="EDUC"  >Education</option>
              <option value="ENG"  >English</option>
              <option value="ES"  >Environmental Studies</option>
              <option value="EXTD"  >Extradepartmental</option>
              <option value="FREN"  >French</option>
              <option value="GEOS"  >Geosciences</option>
              <option value="GER"  >German</option>
              <option value="HIST"  >History</option>
              <option value="ITST"  >Italian Studies</option>
              <option value="JWST"  >Jewish Studies</option>
              <option value="MATH"  >Mathematics</option>
              <option value="MAS"  >Media Arts & Sciences</option>
              <option value="ME/R"  >Medieval Renaissance Studies</option>
              <option value="MES"  >Middle Eastern Studies</option>
              <option value="MUS"  >Music</option>
              <option value="NEUR"  >Neuroscience</option>
              <option value="PEAC"  >Peace and Justice Studies</option>
              <option value="PHIL"  >Philosophy</option>
              <option value="PHYS"  >Physics</option>
              <option value="POLS"  >Political Science</option>
              <option value="PSYC"  >Psychology</option>
              <option value="QR"  >Quantitative Reasoning</option>
              <option value="REL"  >Religion</option>
              <option value="RUSS"  >Russian</option>
              <option value="SOC"  >Sociology</option>
              <option value="SAS"  >South Asia Studies</option>
              <option value="SPAN"  >Spanish</option>
              <option value="SUST"  >Sustainability</option>
              <option value="THST"  >Theatre Studies</option>
              <option value="WGST"  >Women's and Gender Studies</option>
              <option value="WRIT"  >Writing</option>
            </select>
          </div>
          <p>Course Number</p>
          <div class="formsection">
            <input type="text" placeholder="Course Number"/>
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default Profile;
