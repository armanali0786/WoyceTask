
const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');
// const mysql = require('mysql');
const app = express();
const Router = require('./Routes/routes');

//set views file
app.set('views', path.join(__dirname, 'views'));

//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(Router);

// Server Listening
app.listen(2020, () => {
    console.log('Server is running at port 2020');
});



