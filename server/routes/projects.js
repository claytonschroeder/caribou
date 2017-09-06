const express = require('express');
const router = express.Router();
const db = require('../db');

const data = require('../data/converted.json')

const multer  = require('multer')

module.exports = () => {

  router.post('/', (request, response) => {
    const year = request.body.year;
    const location = request.body.location;
    const startDate = parseInt(request.body.startDate);
    const endDate = parseInt(request.body.endDate);
    const type = request.body.type;
    const alternatives = ['1 NO ACTION', '2 2003 BIOP PROJECTED A', '3 ALL MECHANICAL', '4 SPRING 42MAF', '5 FALL 35SL', '6 SPAWNING CUE' ];

    let dataObject = {
      '1 NO ACTION': null,
      '2 2003 BIOP PROJECTED A': null,
      '3 ALL MECHANICAL': null,
      '4 SPRING 42MAF': null,
      '5 FALL 35SL': null,
      '6 SPAWNING CUE': null
    }

    //filter the data by the parameters provided
    const filtered = data.filter(function(item){
      let itemDate = parseInt(item.Day)
      return((item.Location === location) && (item['Flow-Stage'] === type) && (itemDate >= startDate) && (itemDate <= endDate))
    })

    //seperate the data into alternatives and their data points
    alternatives.forEach((alt, index) => {
      let altDataArray = [];
      filtered.forEach((item, i) => {
        if(item.Alternative === alt){
          altDataArray.push(item[year])
        }
      })
      dataObject[alt] = altDataArray
    })



    response.json({
      'status': 'success',
      'data': dataObject
    })
  });

  return router;
};