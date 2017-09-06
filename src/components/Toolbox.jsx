import React, { Component } from 'react';
import { Col, FormGroup, ControlLabel, FormControl, Button, Checkbox } from 'react-bootstrap';
import { findDOMNode } from 'react-dom';
import ReactLoading from 'react-loading';
import data from '../lib/testData/arrayOfObj.json';
import Api from '../lib/api.js';
import store from '../flux/store.js';
import actions from '../flux/actions.js';

const ObjectUtil = require('../utilities/objectCopy.js');


class Toolbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validationState: null
    }

    this.getParams = this.getParams.bind(this);
    this.getNiceDate = this.getNiceDate.bind(this);

  }

  componentDidMount() {
    this.getParams()
  }

  getNiceDate(date){
    let fullDate
    let month;
    let day;
    if(date <= 31){
      month = 'January '
      day = date
      fullDate = month + day
    }
    if(date > 31 && date <= 59){
      month = 'February '
      day = date - 31
      fullDate = month + day
    }
    if(date > 59 && date <= 90){
      month = 'March '
      day = date - 59
      fullDate = month + day
    }
    if(date > 90 && date <= 120){
      month = 'April '
      day = date - 90
      fullDate = month + day
    }
    if(date > 120 && date <= 151){
      month = 'May '
      day = date - 120
      fullDate = month + day
    }
    if(date > 151 && date <= 181){
      month = 'June '
      day = date - 151
      fullDate = month + day
    }
    if(date > 181 && date <= 212){
      month = 'July '
      day = date - 181
      fullDate = month + day
    }
    if(date > 212 && date <= 243){
      month = 'August '
      day = date - 212
      fullDate = month + day
    }
    if(date > 243 && date <= 273){
      month = 'September '
      day = date - 243
      fullDate = month + day
    }
    if(date > 273 && date <= 304){
      month = 'October '
      day = date - 273
      fullDate = month + day
    }
    if(date > 304 && date <= 334){
      month = 'November '
      day = date - 304
      fullDate = month + day
    }
    if(date > 334 && date <= 365){
      month = 'December '
      day = date - 334
      fullDate = month + day
    }
    return fullDate
  }

  getParams(){
    function validate(startDate, endDate){
      let end = parseInt(endDate)
      let start = parseInt(startDate)
      if(end > start){
        return true
      } else {
        return false
      }
    }

    const startDate = findDOMNode(this.refs.startdate).value;
    const endDate = findDOMNode(this.refs.enddate).value;
    const year = findDOMNode(this.refs.year).value;
    const location = findDOMNode(this.refs.locations).value;
    const type = findDOMNode(this.refs.type).value;

    const validDate = validate(startDate, endDate)

    if(validDate){
      this.setState({
        validationState: null
      }, this.props.setParams(year, location, startDate, endDate, type))
    } else {
      this.setState({
        validationState: 'error'
      })
    }
  }


  render() {
    const alternatives = this.props.alternatives ? this.props.alternatives : null;
    const dates = this.props.dates ? this.props.dates : null;
    const years = this.props.years ? this.props.years : null;
    const dataType = this.props.dataType ? this.props.dataType : null;
    const locations = this.props.locations ? this.props.locations : null;
    const models = this.props.models ? this.props.models : null;

    const params = this.props.alternatives && this.props.dates && this.props.locations && this.props.years ? (
      <form className='toolbox'>
        <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select a Location</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={ this.getParams } ref='locations'>
          {
            locations.map((location, index) => {
              return (<option key={ index } value={ location }>{ location }</option>)
            })
          }
        </FormControl>
        </FormGroup>

        <FormGroup controlId="formControlsSelect" validationState={ this.state.validationState }>
        <ControlLabel>From:</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={ this.getParams } ref='startdate'>
          {
            dates.map((date, index) => {

              return (<option key={ index } value={ date }>{ this.getNiceDate(date) }</option>)
            })
          }
        </FormControl>
        </FormGroup>
        <FormGroup controlId="formControlsSelect" validationState={ this.state.validationState }>
        <ControlLabel>To:</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={ this.getParams } defaultValue={ 365 }ref='enddate'>
          {
            dates.map((date, index) => {
              return (<option key={ index } value={ date }>{ this.getNiceDate(date) }</option>)
            })
          }
        </FormControl>
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select a Year</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={ this.getParams } ref='year'>
          {
            years.map((year, index) => {
              return (<option key={ index } value={ year }>{ year }</option>)
            })
          }
        </FormControl>
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select Data Type</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={ this.getParams } ref='type'>
          {
            dataType.map((type, index) => {
              return (<option key={ index } value={ type }>{ type }</option>)
            })
          }
        </FormControl>
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select Model</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onChange={ this.getParams } ref='model'>
          {
            models.map((model, index) => {
              return (<option key={ index } value={ model }>{ model }</option>)
            })
          }
        </FormControl>
        </FormGroup>
      </form>
    ) : null




    return (
      <Col md={ 2 }>
        { params }
      </Col>
    );
  }
}
export default Toolbox;
