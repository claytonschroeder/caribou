const express = require('express');
const router = express.Router();
const db = require('../db');

const multer  = require('multer')

module.exports = () => {

  router.get('/', (request, response) => {
    db('projects').where('id', 1).then(project => {
      response.json({
        "status": "success",
        "nodes": project[0].nodes,
        "image": project[0].image,
        "name": project[0].name
      });
    })
  });

  router.post('/update', (request, response) => {
    const requestBody = request.body;
    db('projects').where('id', 1).then(project => {
      const nodeObject = project[0].nodes.nodes;
      if(JSON.stringify(nodeObject) === JSON.stringify(requestBody)){
        response.json({
          "status": "No Changes"
        })
      } else {
        db('projects').where('id', 1).then(project => {
          const nodesObj = project[0].nodes
          nodesObj.nodes = requestBody
          return db('projects').where('id', 1).update({
            nodes: nodesObj
          }).then(results => {
            response.json({
              "status": "Updated"
            })
          })
        })
      }
    })
  });

  // Function to add filetype to end of file name
  function getType(type){
    switch(type){
      case 'image/jpeg':
        return '.jpg'
      break;
      case 'application/pdf':
        return '.pdf'
      break;
    }
  }

  // Storage config
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + getType(file.mimetype))
    }
  })

  // Upload config with storage
  var upload = multer({ storage: storage }).single('file')

  router.post('/upload', (request, response) => {
    upload(request, response, function (err) {
      if (err) {
        console.log('err:', err)
        response.json({'status': 'error'})
        // An error occurred when uploading
        return
      }
      const file = request.file
      response.json({
        'status': 'success',
        'originalName': file.originalname,
        'path': file.path
      })
      // Everything went fine
    })
  })

  return router;
};