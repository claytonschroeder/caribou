const express = require('express');
const router = express.Router();
const db = require('../db');
const multer  = require('multer')

module.exports = () => {

  router.get('/', (request, response) => {
    db('herds').then(data => {
      response.json({
        'status': 'success',
        'data': data
      })
    })
  });

  return router;
};