const express = require('express');
const router = express.Router();
const db = require('../db');

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

  return router;
};