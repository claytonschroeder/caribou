require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8001;


app.use(express.static('build')); // This is actually a build directory in the parent
app.use(require('body-parser').json());

// app.use('/api/characteristics', require('./routes/characteristics')());


app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});