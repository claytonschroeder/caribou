import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import data from './lib/testData/arrayOfObj.json';
import Api from './lib/api.js';
import store from './flux/store.js';
import actions from './flux/actions.js';

import Toolbox from './components/Toolbox.jsx'
import Chart from './components/Chart.jsx'
import ss from 'simple-statistics';

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
      let date = item.Date.slice(5);
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

    //add the mean, min, max, median, mode to each object....
    data.forEach((point, index) => {
      let dataPoints = [];
      years.forEach(year => {
        dataPoints.push(point[year])
      })
      point.mean = ss.mean(dataPoints);
      point.max = ss.max(dataPoints);
      point.min = ss.min(dataPoints);
      point.mode = ss.mode(dataPoints);
      point.median = ss.median(dataPoints);
      point.ninetieth = ss.quantile(dataPoints, 0.9);
      point.tenth = ss.quantile(dataPoints, 0.1);
    })


    this.setState({
      years: years,
      dates: dates,
      locations: locations,
      alternatives: alternatives,
      loading: false
    })
  }


  setParams(year, location, startDate, endDate){
    let dates = this.state.dates;

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

    function findStartIndex(element) {
      return element === startDate;
    }

    function findEndIndex(element) {
      return element === endDate;
    }

    let startIndex = dates.findIndex(findStartIndex);
    let endIndex = dates.findIndex(findEndIndex) + 1;

    const newDateArray = dates.slice(startIndex, endIndex)





    const colorArray = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'aqua', 'black', 'brown', 'chartreuse', 'darkcyan', 'deeppink', 'gray']
    // initalize empty array
    let chartDataArray = [];
    //make a reference to the chart data structure
    let chartDataTemplate = {
      label: null, // fill this in
      fill: false,
      backgroundColor: null, // fill this in
      borderColor: null, // fill this in
      pointBorderColor: null, // fill this in
      pointBackgroundColor: null, // fill this in
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: null, // fill this in
      pointHoverBorderColor: null, // fill this in
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: null // fill this in
    }

    // filter function finds the right items based on search params
    function filterByParams(item) {
      let exists = contains.call(newDateArray, item.Date.slice(5));

      if(exists){
        if (item.location === location) {
          return true;
        }
      }
    }
    // arrItem is a single array with the object we want to analyze
    let arrItem = this.state.data.filter(filterByParams)

    // some way to sort the dates...
    // arrItem.forEach((item, index) => {
    //   const date = item.Date.slice(5)
    //   if(date === startDate){
    //     console.log('match and index: ', index)
    //     startIndex = index
    //   }
    //   if(date === endDate){
    //     console.log('match and index: ', index)
    //     endIndex = index
    //   }
    // })

    // put all the datapoints in an array if for each alternative
    let dataPoints = [];
    let Alt1Data = [];
    let Alt2Data = [];
    let Alt1Min = [];
    let Alt2Min = [];
    let Alt1Max = [];
    let Alt2Max = [];
    let Alt1Tenth = [];
    let Alt2Tenth = [];
    let Alt1Ninetieth = [];
    let Alt2Ninetieth = [];


    // slice this array to only have the dates
    arrItem.forEach(item => {
      if(item.alternative === "M540F0_ALT 1"){
        Alt1Data.push(item[year])
        Alt1Min.push(item.min)
        Alt1Max.push(item.max)
        Alt1Tenth.push(item.tenth)
        Alt1Ninetieth.push(item.ninetieth)
      } else {
        Alt2Data.push(item[year])
        Alt2Min.push(item.min)
        Alt2Max.push(item.max)
        Alt2Tenth.push(item.tenth)
        Alt2Ninetieth.push(item.ninetieth)
      }
    })
    dataPoints.push(Alt1Data, Alt2Data)


    // make object for each alternative....
    dataPoints.forEach((set, index) => {
      let copy = ObjectUtil.copy(chartDataTemplate);
      copy.label = this.state.alternatives[index];
      copy.data = set;
      copy.backgroundColor = colorArray[index];
      copy.borderColor = colorArray[index];
      copy.pointBorderColor = colorArray[index];
      copy.pointHoverBackgroundColor = colorArray[index];
      copy.pointHoverBorderColor = colorArray[index];
      copy.pointBackgroundColor = colorArray[index];
      chartDataArray.push(copy);
    })

    // make object for each of mean, max, median, min, mode, 90th and 10th


    // alt 1 min
    let Alt1MinData = ObjectUtil.copy(chartDataTemplate);
    Alt1MinData.label = 'Alt 1 Min';
    Alt1MinData.data = Alt1Min;
    Alt1MinData.backgroundColor = colorArray[2];
    Alt1MinData.borderColor = colorArray[2];
    Alt1MinData.pointBorderColor = colorArray[2];
    Alt1MinData.pointHoverBackgroundColor = colorArray[2];
    Alt1MinData.pointHoverBorderColor = colorArray[2];
    Alt1MinData.pointBackgroundColor = colorArray[2];
    chartDataArray.push(Alt1MinData);

    // alt 2 min
    let Alt2MinData = ObjectUtil.copy(chartDataTemplate);
    Alt2MinData.label = 'Alt 2 Min';
    Alt2MinData.data = Alt2Min;
    Alt2MinData.backgroundColor = colorArray[3];
    Alt2MinData.borderColor = colorArray[3];
    Alt2MinData.pointBorderColor = colorArray[3];
    Alt2MinData.pointHoverBackgroundColor = colorArray[3];
    Alt2MinData.pointHoverBorderColor = colorArray[3];
    Alt2MinData.pointBackgroundColor = colorArray[3];
    chartDataArray.push(Alt2MinData);

    // alt 1 max
    let Alt1MaxData = ObjectUtil.copy(chartDataTemplate);
    Alt1MaxData.label = 'Alt 1 Max';
    Alt1MaxData.data = Alt1Max;
    Alt1MaxData.backgroundColor = colorArray[4];
    Alt1MaxData.borderColor = colorArray[4];
    Alt1MaxData.pointBorderColor = colorArray[4];
    Alt1MaxData.pointHoverBackgroundColor = colorArray[4];
    Alt1MaxData.pointHoverBorderColor = colorArray[4];
    Alt1MaxData.pointBackgroundColor = colorArray[4];
    chartDataArray.push(Alt1MaxData);

    // alt 2 max
    let Alt2MaxData = ObjectUtil.copy(chartDataTemplate);
    Alt2MaxData.label = 'Alt 2 Max';
    Alt2MaxData.data = Alt2Max;
    Alt2MaxData.backgroundColor = colorArray[5];
    Alt2MaxData.borderColor = colorArray[5];
    Alt2MaxData.pointBorderColor = colorArray[5];
    Alt2MaxData.pointHoverBackgroundColor = colorArray[5];
    Alt2MaxData.pointHoverBorderColor = colorArray[5];
    Alt2MaxData.pointBackgroundColor = colorArray[5];
    chartDataArray.push(Alt2MaxData);

    // alt 1 tenth
    let Alt1TenthData = ObjectUtil.copy(chartDataTemplate);
    Alt1TenthData.label = 'Alt 1 Tenth Percentile';
    Alt1TenthData.data = Alt1Tenth;
    Alt1TenthData.backgroundColor = colorArray[6];
    Alt1TenthData.borderColor = colorArray[6];
    Alt1TenthData.pointBorderColor = colorArray[6];
    Alt1TenthData.pointHoverBackgroundColor = colorArray[6];
    Alt1TenthData.pointHoverBorderColor = colorArray[6];
    Alt1TenthData.pointBackgroundColor = colorArray[6];
    chartDataArray.push(Alt1TenthData);

    // alt 2 tenth
    let Alt2TenthData = ObjectUtil.copy(chartDataTemplate);
    Alt2TenthData.label = 'Alt 2 Tenth Percentile';
    Alt2TenthData.data = Alt2Tenth;
    Alt2TenthData.backgroundColor = colorArray[7];
    Alt2TenthData.borderColor = colorArray[7];
    Alt2TenthData.pointBorderColor = colorArray[7];
    Alt2TenthData.pointHoverBackgroundColor = colorArray[7];
    Alt2TenthData.pointHoverBorderColor = colorArray[7];
    Alt2TenthData.pointBackgroundColor = colorArray[7];
    chartDataArray.push(Alt2TenthData);

    // alt 1 90th
    let Alt1NintiethData = ObjectUtil.copy(chartDataTemplate);
    Alt1NintiethData.label = 'Alt 1 Ninetieth Percentile';
    Alt1NintiethData.data = Alt1Ninetieth;
    Alt1NintiethData.backgroundColor = colorArray[8];
    Alt1NintiethData.borderColor = colorArray[8];
    Alt1NintiethData.pointBorderColor = colorArray[8];
    Alt1NintiethData.pointHoverBackgroundColor = colorArray[8];
    Alt1NintiethData.pointHoverBorderColor = colorArray[8];
    Alt1NintiethData.pointBackgroundColor = colorArray[8];
    chartDataArray.push(Alt1NintiethData);

    // alt 2 90th
    let Alt2NinetiethData = ObjectUtil.copy(chartDataTemplate);
    Alt2NinetiethData.label = 'Alt 2 Ninetieth Percentile';
    Alt2NinetiethData.data = Alt2Ninetieth;
    Alt2NinetiethData.backgroundColor = colorArray[9];
    Alt2NinetiethData.borderColor = colorArray[9];
    Alt2NinetiethData.pointBorderColor = colorArray[9];
    Alt2NinetiethData.pointHoverBackgroundColor = colorArray[9];
    Alt2NinetiethData.pointHoverBorderColor = colorArray[9];
    Alt2NinetiethData.pointBackgroundColor = colorArray[9];
    chartDataArray.push(Alt2NinetiethData);

    // modify the year array to match the start and end year
    this.setState({
      chartData: {
        location: location,
        year: year,
        alternative: this.state.alternatives,
        labels: newDateArray,
        data: chartDataArray
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
