const express = require("express");
let app = express();
const { use } = require('express/lib/application'); 
let moment = require("moment");
const morgan = require('morgan')


app.set('PORT' , process.env.PORT || 8080)


app.use(morgan('dev'))
app.use(express.json)
app.use(express.urlencoded({extended: false}))

//route
app.use('/api/productos',require('./routes/index'));
app.use('/api/cart',require('./routes/cart'));


app.listen(app.get('PORT'), (err) => {
    console.log(`Server on http://localhost:${PORT}`);
  });
  