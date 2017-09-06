import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import ReactLoading from 'react-loading';
// import data from './lib/testData/arrayOfObj.json';
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
      data: 'data',
      models: ['1', '2', '3', '4', '5', '6'],
      alternatives: ['1 NO ACTION', '2 2003 BIOP PROJECTED A', '3 ALL MECHANICAL', '4 SPRING 42MAF', '5 FALL 35SL', '6 SPAWNING CUE' ],
      locations: ['BB', 'BIS', 'BNMO', 'CLMT', 'FTPK', 'FTRA', 'GAPT', 'GARR', 'HEMO', 'MKC', 'NCNE', 'OAHE', 'OMA', 'STJ', 'STL', 'SUX', 'WPMT', 'WSN'],
      dataType: ['FLOW', 'STAGE'],
    }

    this.setParams = this.setParams.bind(this);
    this.buildChartData = this.buildChartData.bind(this);

  }


  componentDidMount(){
    let dayArray = [];
    let yearArray = [];
    for(let day = 1; day <= 365; day++){
      dayArray.push(day)
    }

    for(let year = 1931; year <= 2012; year++){
      yearArray.push(year)
    }

    this.setState({
      dates: dayArray,
      years: yearArray,
      loading: false
    })
  }

  buildChartData(data, year, location, startDate, endDate, type){

    const colorArray = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'aqua', 'black', 'brown', 'chartreuse', 'darkcyan', 'deeppink', 'gray']

    // create an array to store chart templates in.
    let chartDataArray = [];

    //make a reference to the chart data structure
    let chartDataTemplate = {
      label: null, // fill this in with the alternative name
      fill: false,
      backgroundColor: null, // fill this in with one of the colors
      borderColor: null, // fill this in with one of the colors
      pointBorderColor: null, // fill this in with one of the colors
      pointBackgroundColor: null, // fill this in with one of the colors
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: null, // fill this in with one of the colors
      pointHoverBorderColor: null, // fill this in with one of the colors
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: null // fill this in with an array of all the data points for each day of the year.
    }

    this.state.alternatives.forEach((alt, index) => {
      // create a copy of the chartDataTemplate
      // we will create a new version of this for each alternative
      // then it can be pushed onto the chartDataArray
      let copy = ObjectUtil.copy(chartDataTemplate)
      copy.label = alt
      // set the copy chartData objects data key with the value of the response objects array
      copy.data = data[alt];
      copy.backgroundColor = colorArray[index];
      copy.borderColor = colorArray[index];
      copy.pointBorderColor = colorArray[index];
      copy.pointBackgroundColor = colorArray[index];
      copy.pointHoverBackgroundColor = colorArray[index];
      copy.pointHoverBorderColor = colorArray[index];
      chartDataArray.push(copy)
    })

    let dates = this.state.dates;
    const newDateArray = dates.slice(startDate - 1, endDate)

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


  setParams(year, location, startDate, endDate, type){
    Api.post('/projects', {
      "year": year,
      "location": location,
      "startDate": startDate,
      "endDate": endDate,
      "type": type
    }).then(response => {
      this.buildChartData(response.data, year, location, startDate, endDate, type)
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
            models = { this.state.models }
            dates={ this.state.dates }
            years={ this.state.years }
            locations={ this.state.locations }
            alternatives={ this.state.alternatives }
            dataType={ this.state.dataType }/>
        </Row>
      </Grid>
    );
  }
}
export default App;
