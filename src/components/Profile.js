import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Redirect} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import uuid from 'uuid/v4';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

require('../css/login-reg.css');

const styles = {
  errorStyle: {
    color: '#01579B',
  },
  underlineStyle: {
    borderColor: '#01579B',
  },
  floatingLabelStyle: {
    color: 'white',
  },
  floatingLabelFocusStyle: {
    color: '#01579B',
  },
  underlineFocusStyle: {
    borderColor: '#01579B',
  },
  buttons: {
    width: '100px',
    margin: '2px',
    color: 'black',
    backgroundColor: 'white'
  },
  customWidth: {
    width: 200,
  },
};


class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      courses: {}
    };
    this.handleDeptChange = this.handleDeptChange.bind(this);
  }
  componentDidMount(){
    // axios call
    // .then( this.setState({courses: something here ) )
    fetch('/api/getcourse', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        courses: this.state.courses
      })
    }).then((response)  => {
      console.log('resp for api/getcourse here', response);
      return (response.json());
    }).then((obj)=>{
      console.log('api/getcourse resp courses obj here', obj);
      this.setState({courses: obj});
    });
  }

  //dropdown menu
  handleDeptChange(key, event, index, value) {
    const newDept = value;
    const coursesCopy = Object.assign({}, this.state.courses);
    console.log('value here', value);
    console.log('newDept here', newDept);
    console.log('coursesCopy here + key', coursesCopy, key);
    coursesCopy[key].dept = newDept;
    this.setState({courses: coursesCopy});
    console.log('new dept added', coursesCopy);
  }

  //input field
  handleCourseNumChange(key, e) {
    const newNum = e.target.value;
    const coursesCopy = Object.assign({}, this.state.courses);
    coursesCopy[key].number = newNum;
    this.setState({courses: coursesCopy});
    console.log('new num added', coursesCopy);
  }

  handleSubmit(key){
    console.log('this.state.courses updated:', this.state.courses);
    fetch('/api/updatecourse', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        courses: this.state.courses[key]
      })
    }).then((response) => {
      console.log("resp");
      return (response.json());
    }).then((obj)=>{
      console.log('profile.js user obj here', obj);
      this.setState({courses: obj.courses});
      alert('Course Saved!');
      return obj;
    }).catch((err)=>{
      console.log('err fetching api/updatecourse', err);
    });
  }

  handleDelete(key){
    const courseRow = this.state.courses[key];
    console.log('courseRow added:', courseRow);
    console.log('this.state.courses updated:', this.state.courses);
    fetch('/api/deletecourse', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        courses: this.state.courses[key]
      })
    }).then((response) => {
      return (response.json());
    }).then((obj)=>{
      console.log('course deleted, user obj here profile.js line136', obj);
      this.setState({courses: obj.courses});
      alert('Course Deleted!');
      return obj;
    }).catch((err)=>{
      console.log('err fetching api/updatecourse', err);
    });
  }

  //each input row (dept, number, save)
  courseField(key){
    return (
        <div key={key}>
          <MuiThemeProvider>
          <DropDownMenu value={this.state.courses[key].dept}
            onChange={this.handleDeptChange.bind(this, key)}
            openImmediately={false}
            autoWidth={false}
            maxHeight={300}>
            {/* JSON import? */}
            <MenuItem value="Department" primaryText="Department" />
            <MenuItem value="AFR" primaryText="Africana Studies" />
            <MenuItem value="AMST" primaryText="American Studies" />
            <MenuItem value="ANTH" primaryText="Anthropology" />
            <MenuItem value="ART" primaryText="Art" />
            <MenuItem value="ASTR" primaryText="Astronomy" />
            <MenuItem value="BIOC" primaryText="Biochemistry" />
            <MenuItem value="BISC" primaryText="Biological Sciences" />
            <MenuItem value="CHEM" primaryText="Chemistry" />
            <MenuItem value="CAMS" primaryText="Cinema and Media Studies" />
            <MenuItem value="CLST" primaryText="Classical Studies" />
            <MenuItem value="CLSC" primaryText="Cognitive and Linguistic Sci" />
            <MenuItem value="CPLT" primaryText="Comparative Literature" />
            <MenuItem value="CS" primaryText="Computer Science" />
            <MenuItem value="EALC" primaryText="East Asian Languages and Culture" />
            <MenuItem value="ECON" primaryText="Economics" />
            <MenuItem value="EDUC" primaryText="Education" />
            <MenuItem value="ENG" primaryText="English" />
            <MenuItem value="ES" primaryText="Environmental Studies" />
            <MenuItem value="EXTD" primaryText="Environmental Studies" />
            <MenuItem value="FREN" primaryText="French" />
            <MenuItem value="GEOS" primaryText="Geosciences" />
            <MenuItem value="GER" primaryText="German" />
            <MenuItem value="HIST" primaryText="History" />
            <MenuItem value="ITST" primaryText="Italian Studies" />
            <MenuItem value="JWST" primaryText="Jewish Studies" />
            <MenuItem value="MATH" primaryText="Mathematics" />
            <MenuItem value="MAS" primaryText="Media Arts & Sciences" />
            <MenuItem value="ME/R" primaryText="Medieval Renaissance Studies" />
            <MenuItem value="MES" primaryText="Middle Eastern Studies" />
            <MenuItem value="MUS" primaryText="Music" />
            <MenuItem value="NEUR" primaryText="Neuroscience" />
            <MenuItem value="PEAC" primaryText="Peace and Justice Studies" />
            <MenuItem value="PHIL" primaryText="Philosophy" />
            <MenuItem value="PHYS" primaryText="Physics" />
            <MenuItem value="POLS" primaryText="Political Science" />
            <MenuItem value="PSYC" primaryText="Psychology" />
            <MenuItem value="QR" primaryText="Quantitative Reasoning" />
            <MenuItem value="REL" primaryText="Religion" />
            <MenuItem value="RUSS" primaryText="Russian" />
            <MenuItem value="SOC" primaryText="Sociology" />
            <MenuItem value="SAS" primaryText="South Asia Studies" />
            <MenuItem value="SPAN" primaryText="Spanish" />
            <MenuItem value="SUST" primaryText="Sustainability" />
            <MenuItem value="THST" primaryText="Theatre Studies" />
            <MenuItem value="WGST" primaryText="Women's and Gender Studies" />
            <MenuItem value="WRIT" primaryText="Writing" />
          </DropDownMenu>
          </MuiThemeProvider>
        <MuiThemeProvider>
          <TextField
            id="numinput"
            type="text"
            onChange={(e) => this.handleCourseNumChange(key,e)}
            value={this.state.courses[key].number}
            placeholder="Course Number"
        />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <FlatButton
            id="coursesavebutton"
            style={styles.buttons}
            label="Save"
            hoverColor={'#E8EAF6'}
            onClick={() => this.handleSubmit(key)}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <FlatButton
            id="coursesavebutton"
            style={styles.buttons}
            label="Delete"
            hoverColor={'#E8EAF6'}
            onClick={() => this.handleDelete(key)}
          />
        </MuiThemeProvider>
        </div>
    );
  }

  render(){
    return (
      <div>
        <h1>User Courses Here</h1>
        {/* <div>
        <ul>
          {Object.keys(this.state.courses).map((key)=>
            <li key={key}>{this.state.courses[key].dept} {this.state.courses[key].number}
            <button onClick={() => {
              this.handleDelete(key);
            }}>Delete Course</button></li>
          )}
        </ul>
        </div> */}
        <div>
          {Object.keys(this.state.courses).map((key) => {
            return this.courseField(key);
          })}
          <button onClick={() => {
            const newCourses = Object.assign({},this.state.courses);
            newCourses[uuid()] = {
              dept: 'Department',
              number: ''
            };
            this.setState({
              courses: newCourses
            });
          }}>Add Course</button>
        </div>
        </div>
    );
  }
}

export default Profile;
