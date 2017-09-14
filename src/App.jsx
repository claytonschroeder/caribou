import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Grid, Col, Row, OverlayTrigger, Popover, Panel } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

import Api from './lib/api.js';
import store from './flux/store.js';
import actions from './flux/actions.js';

import Info from './components/Info.jsx'

const ObjectUtil = require('./utilities/objectCopy.js');



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: ''
    }

    this.getZone = this.getZone.bind(this);
    this.search = this.search.bind(this);

  }

  componentDidMount(){
    Api.json('/data').then(response => {
      this.setState({
        data: response.data
      })
    })
  }

  getZone(name){
    function findZone(element) {
      return element.herd_name === name;
    }
    const zone = this.state.data.find(findZone)
    this.setState({zone: zone})
  }

  search(){
    const input = findDOMNode(this.refs.input).value;
    this.setState({
      searchBar: input
    })
    console.log('set new state', input)
  }


  render() {
    const areas = this.state.data? this.state.data : null

    /* arrays for population, range size data, and labels */
    const labelArray = [];
    const populationArray = [];
    const rangeArray = [];

    /* arrays for population and range size data */

    /* map over each chuck of area data */
    const ecozones = areas ? areas.map((area, index) => {
      /* push data into correct array for charts */
      labelArray.push(area.herd_name)
      populationArray.push(area.population)
      rangeArray.push(area.range)
      /* return and individual area object */
      return (
        <area
          key={ index }
          shape="poly"
          onClick={ () => { this.getZone(area.herd_name) } }
          coords={ area.coords }
          href="#_"
          target="_self"
          alt={ area.herd_name }>
        </area>
      )
    }) : null

    function getColor(eco){
      if(eco === 'Mountain'){
        return '#E09FD9'
      }
      if(eco === 'Boreal'){
        return '#C29B4C'
      }
      if(eco === 'Northern'){
        return '#CBE399'
      }
      if(!eco){
        return '#FFF'
      }
    }

    const list = areas ? areas.map((area, index) => {
    const name = area.herd_name.toUpperCase();
    const searchParams = this.state.searchBar.toUpperCase();
    const color = getColor(area.eco_type);
    const display = name.includes(searchParams) ? { display: '', backgroundColor: color } : { display: 'none' }
      return (
        <div className="list-item"
          style={ display }
          key={ index }
          onClick={ () => { this.getZone(area.herd_name) } }
          alt={ area.herd_name }>
          { area.herd_name }
        </div>
      )
    }) : (
      <div className="list-item">No Matches Found</div>
    )

    const searchBar = (
      <input
        className='input'
        type="text"
        ref="input"
        onChange={ this.search }
        value={ this.state.searchBar }>
      </input>
    )

    const data = {
      labels: labelArray,
      datasets: [{
        label: 'Population of Herd',
        type:'line',
        data: populationArray,
        fill: false,
        borderColor: '#EC932F',
        backgroundColor: '#EC932F',
        pointBorderColor: '#EC932F',
        pointBackgroundColor: '#EC932F',
        pointHoverBackgroundColor: '#EC932F',
        pointHoverBorderColor: '#EC932F',
        yAxisID: 'y-axis-2'
      },
      {
        type: 'bar',
        label: 'Size of Region (km2)',
        data: rangeArray,
        fill: false,
        backgroundColor: '#71B37C',
        borderColor: '#71B37C',
        hoverBackgroundColor: '#71B37C',
        hoverBorderColor: '#71B37C',
        yAxisID: 'y-axis-1'
      }]
    };

    const options = {
      responsive: true,
      tooltips: {
        mode: 'label'
      },
      elements: {
        line: {
          fill: false
        }
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          }
        ],
        yAxes: [
          {
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          },
          {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-2',
            gridLines: {
              display: false
            },
            labels: {
              show: true
            }
          }
        ]
      }
    };


    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <Panel header='BC Caribou Data Tool' className='map'>
              <img src="/images/caribou_by_ecotype_2011map_sm.jpg" alt="caribou distribution by ecotype" useMap="#caribou_ecotype_range"></img>
              <map name="caribou_ecotype_range">
                { ecozones }
              </map>
            </Panel>
          </Col>
          <Col xs={6} md={2}>
            <Info
              zone={ this.state.zone }
            />
          </Col>
          <Col xs={6} md={2}>
            <Panel header={ searchBar } className='info'>
              <div id="herd-list">
                { list }
              </div>
            </Panel>
          </Col>
        </Row>

        <Row className="show-grid">
          <Col xs={12} md={8}>
            <Panel header='Population and Range Size Data' className='chart'>
              <Bar
                data={ data }
                options={ options }
              />
            </Panel>
          </Col>
          <Col xs={12} md={4}>
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default App;
