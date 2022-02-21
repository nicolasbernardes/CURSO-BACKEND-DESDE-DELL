const express = require("express");
let app = express();
const { use } = require('express/lib/application'); 
let moment = require("moment");
const morgan = require('morgan')
require("dotenv").config();
const cors = require("cors");



app.use(cors());
app.use(morgan('dev'))
app.use(express.json)
app.use(express.urlencoded({extended: true}))

//routes
app.use('/api/productos',require('./routes/index'));
app.use('/api/cart',require('./routes/cart'));

//PORT
app.listen(app.get('PORT'), (err) => {
    console.log(`Server on http://localhost:${process.env.PORT}`);
  });
  