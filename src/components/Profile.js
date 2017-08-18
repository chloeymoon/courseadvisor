import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Redirect} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import ContentAdd from 'material-ui/svg-icons/content/add';
import EqualIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';

import {Major} from './Major';
import axios from 'axios'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import uuid from 'uuid/v4';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// const filterlisticon = require('../filterlisticon')

require('../css/profile.css');

const styles = {
  buttons: {
    width: '100px',
    margin: '2px',
    color: 'black',
    backgroundColor: 'white',
    paddingTop: 3,
  },
  buttons2: {
    width: '200px',
    margin: '2px',
    color: 'black',
    backgroundColor: 'white'
  },
  customWidth: {
    width: 270,
    fontSize: 16
  },
  inputbox:{
    height: 60,
    paddingTop: 3,
    fontFamily: 'Raleway, sans-serif',
    width: 80,
    color: 'black'
  },
  dropdown:{
    fontFamily: 'Raleway, sans-serif',
    width: 280,
    color: 'grey'
  },
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon:{
    marginRight: 20
  },
  majorStatuscontainer: {
    display: 'flex',
    flex:1,
    flexDirection: 'row'
  },
  reqcolumn: {
    display: 'flex',
    flex:1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  reqset: {
    display: 'flex',
    flex:1,
    // margin: 'auto',
    backgroundColor: '#F5F5F5',
    width: 300,
    height: 120,
    flexBasis: 'content',
    alignItems: 'center ',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 0
  }
};

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      courses: {},
      majorStatuses: null,
      completedPercentage: null,
      totalSetCount: null
       // eventually: {completed: [sets], incompleted: [sets]}
    };
    this.handleDeptChange = this.handleDeptChange.bind(this);
  }

  componentDidMount(){
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
      this.setState({courses: obj, majorStatuses: this.state.majorStatuses});
      // console.log('this.state.majorStatuses', this.state.majorStatuses);
    });
  }
  handleDeptChange(key, event, index, value) {
    const newDept = value;
    const coursesCopy = Object.assign({}, this.state.courses);
    // console.log('value here', value);
    // console.log('newDept here', newDept);
    // console.log('coursesCopy here + key', coursesCopy, key);
    coursesCopy[key].dept = newDept;
    this.setState({courses: coursesCopy});
    // console.log('new dept added', coursesCopy);
  }
  handleCourseNumChange(key, e) {
    const newNum = e.target.value;
    const coursesCopy = Object.assign({}, this.state.courses);
    coursesCopy[key].number = newNum;
    this.setState({courses: coursesCopy});
    // console.log('new num added', coursesCopy);
  }
  handleSave(key){
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

  computeAlgorithm(){
    axios.get('/api/compute_algorithm')
    .then(response => {
      console.log('computeAlgorithm() response here', response);
      // this.setState({majorStatuses});
      const respdata = response.data;
      //respdata = {majorStatuses: Array(0), completedPercentage: 100, incompleteSetCount: 9, totalSetCount: 9}
      const majorStatusObj = respdata.majorStatuses;
      console.log('computeAlgorithm response', majorStatusObj);
      this.setState({majorStatuses: majorStatusObj,
        completedPercentage: respdata.completedPercentage,
        incompleteSetCount: respdata.incompleteSetCount,
        totalSetCount: respdata.totalSetCount}
      );
    })
    .catch(err => {
      console.log(err);
    });
  }

  render(){
    console.log('MAJORSTATUSES STATE', this.state.majorStatuses);
    return (
      <div className="background">
        {/* <Link to="/logout">Log Out</Link> */}
        <h1>Fill out your courses</h1>
        <div>
          {Object.keys(this.state.courses).map((key) => {
            return this.courseField(key);
          })}
          <br />
          <MuiThemeProvider>
            <FloatingActionButton
              mini={true}
              backgroundColor="#BDBDBD"
              disabled={false}
              onClick={() => {
                const newCourses = Object.assign({},this.state.courses);
                newCourses[uuid()] = {
                  dept: 'Department',
                  number: ''
                };
                this.setState({
                  courses: newCourses
                });
              }}
              style={styles.icon}>
              <ContentAdd />
            </FloatingActionButton>
        </MuiThemeProvider>
        </div>
        <br />
        <Major/>
        <br />
        <MuiThemeProvider>
          <FloatingActionButton
            id="compute"
            mini={true}
            backgroundColor="#BDBDBD"
            disabled={false}
            onClick={() => this.computeAlgorithm()}
            style={styles.icon}
            >
            <EqualIcon />
          </FloatingActionButton>
        </MuiThemeProvider>
      <div className="nopadding">
        <br></br>
        {
          this.state.majorStatuses
          ?
          <div>
            <h3>You're {Math.round(this.state.completedPercentage)}% done!</h3>
            <h3>{this.state.majorStatuses.completed.length} out of {this.state.totalSetCount} Courses Completed</h3>
          <div style={styles.majorStatuscontainer}>
            <div style={styles.reqcolumn}>
            <h2>Completed</h2>
            {this.state.majorStatuses.completed.map(set => {
                // if(set.type==="set"){
                if(set.type==="set"){
                if(set.rules.ALL){
                  if(set.rules.OR){
                    if(set.rules.NOT){
                      return (<ul style={styles.reqset} className="nopadding">
                        <p>{set.rules.ALL} level </p><br />
                        <p>OR {set.rules.OR}</p><br />
                        <p>NOT {set.rules.NOT}</p>
                      </ul>)
                    } else return (<ul style={styles.reqset} className="nopadding">
                      <p>{set.rules.ALL} level </p><br />
                      <p>OR {set.rules.OR}</p><br />
                    </ul>)
                  } else if(set.rules.NOT){
                    return(<ul style={styles.reqset} className="nopadding">
                      <p>{set.rules.ALL} level </p>
                      <p>NOT {set.rules.NOT}</p>
                    </ul>)
                  } else if(set.rules.OR){
                    return(<ul style={styles.reqset} className="nopadding">
                      <p>{set.rules.ALL} level </p>
                      <p> One of : {set.rules.NOT}</p>
                    </ul>)
                  } return(<ul style={styles.reqset} className="nopadding"><p>{set.rules.ALL} level </p></ul>)
                }
                } else return( // explicit
                  <ul style={styles.reqset} className="nopadding"><p>{set.course}</p></ul>
              );
            })
            }
          </div>
          <div style={styles.reqcolumn}>
            <h2>Incomplete</h2>
            {this.state.majorStatuses.incompleted.map(set => {
              // console.log('req for incompleted', set);
              if(set.type==="set"){
              if(set.rules.ALL){
                if(set.rules.OR){
                  if(set.rules.NOT){
                    return (<ul style={styles.reqset} className="nopadding">
                      <p>{set.rules.ALL} level </p><br />
                      <p>OR {set.rules.OR}</p><br />
                      <p>NOT {set.rules.NOT}</p>
                    </ul>)
                  } else return (<ul style={styles.reqset} className="nopadding">
                    <p>{set.rules.ALL} level </p><br />
                    <p>OR {set.rules.OR}</p><br />
                  </ul>)
                } else if(set.rules.NOT){
                  return(<ul style={styles.reqset} className="nopadding">
                    <p>{set.rules.ALL} level </p>
                    <p>NOT {set.rules.NOT}</p>
                  </ul>)
                } else if(set.rules.OR){
                  return(<ul style={styles.reqset} className="nopadding">
                    <p>{set.rules.ALL} level </p>
                    <p> One of : {set.rules.NOT}</p>
                  </ul>)
                } return(<ul style={styles.reqset} className="nopadding"><p>{set.rules.ALL} level </p></ul>)
              }
              } else return( // explicit
                <ul style={styles.reqset} className="nopadding"><p>{set.course}</p></ul>
            );
            })
            }
          </div>
          </div>
          </div>
          :
          <p></p>
        }
      </div>
    </div>
    );
  }

  courseField(key){
    return (
        <div key={key} style={styles.container}>
          <MuiThemeProvider>
          <DropDownMenu
            // className="departmentInput"
            labelStyle={{color:'grey'}}
            value={this.state.courses[key].dept}
            onChange={this.handleDeptChange.bind(this, key)}
            openImmediately={false}
            autoWidth={false}
            maxHeight={300}
            style={styles.dropdown}>
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
            inputStyle={{ textAlign: 'center', color: 'grey', height: '110%'}}
            style={styles.inputbox}
            type="text"
            onChange={(e) => this.handleCourseNumChange(key,e)}
            value={this.state.courses[key].number}
            placeholder="#"
        />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <FlatButton
            id="coursesavebutton"
            style={styles.buttons}
            label="Save"
            hoverColor={'#E8EAF6'}
            onClick={() => this.handleSave(key)}
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
}

export default Profile;
