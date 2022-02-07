const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const app = express();
const route = require('./routes/app.route');

//connect database
const db = require('./config/database');
db.connect();

//cors
app.use(cors())
// app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

// body-parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);


// morgan
app.use(morgan('tiny'));

// route
route(app);

app.get('/', (req, res) => {
  res.send('Backend is working');
});


module.exports = app;
