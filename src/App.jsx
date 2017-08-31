import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import data from './lib/testData/arrayOfObj.json';
import Api from './lib/api.js';
import store from './flux/store.js';
import actions from './flux/actions.js';

import Toolbox from './components/Toolbox.jsx'
import Chart from './components/Chart.jsx'

const ObjectUtil = require('./utilities/objectCopy.js');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: data
    }

    this.setParams = this.setParams.bind(this);

  }


  componentDidMount(){
    // this function gets each date and location from the data set and creates an array.
    let contains = function(date) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    let findNaN = date !== date;
    let indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
      indexOf = function(date) {
        let i = -1, index = -1;
          for(i = 0; i < this.length; i++) {
            let item = this[i];
              if((findNaN && item !== item) || item === date) {
                index = i;
            break;
          }
        }
        return index;
      };
    }
      return indexOf.call(this, date) > -1;
    };
    // get all years in the dataset
    const years = Object.keys(data[0])
    years.length = 69;

    // get all dates in the dataset
    let dates = [];
    this.state.data.forEach(item => {
      let date = item.Date;
      let dateExists = contains.call(dates, date);
      if(!dateExists){
        dates.push(date)
      }
    })

    //get all the locations in the dataset
    let locations = [];
    this.state.data.forEach(item => {
      let location = item.location;
      let locationExists = contains.call(locations, location);
      if(!locationExists){
        locations.push(location)
      }
    })

    //get all the alternatives in the dataset
    let alternatives = [];
    this.state.data.forEach(item => {
      let alternative = item.alternative;
      let alternativeExists = contains.call(alternatives, alternative);
      if(!alternativeExists){
        alternatives.push(alternative)
      }
    })


    this.setState({
      years: years,
      dates: dates,
      locations: locations,
      alternatives: alternatives,
      loading: false
    })
  }

  setParams(year, location){

    // filter function finds the right items based on search params

    function filterByParams(item) {
      if ((item.location === location)) {
        return true;
      }
    }
    // arrItem is a single array with the object we want to analyze
    let arrItem = this.state.data.filter(filterByParams)


    // put all the datapoints in an array if they fall within the year boundary
    let dataPoints = [];
    let Alt1Data = [];
    let Alt2Data = [];
    arrItem.forEach(item => {
      if(item.alternative === "M540F0_ALT 1"){
        Alt1Data.push(item[year])
      } else {
        Alt2Data.push(item[year])
      }
    })
    dataPoints.push(Alt1Data, Alt2Data)

    // modify the year array to match the start and end year

    this.setState({
      chartData: {
        location: location,
        year: year,
        alternative: this.state.alternatives,
        labels: this.state.dates,
        data: dataPoints
      }
    })
  }


  render() {
    if(this.state.loading){
      return (
        <p>Loading...</p>
      )
    }
    return (
      <Grid>
        <Row>
          <Chart
            chartData={ this.state.chartData }/>
          <Toolbox
            setParams = { this.setParams }
            dates={ this.state.dates }
            years={ this.state.years }
            locations={ this.state.locations }
            alternatives={ this.state.alternatives }/>
        </Row>
      </Grid>
    );
  }
}
export default App;
