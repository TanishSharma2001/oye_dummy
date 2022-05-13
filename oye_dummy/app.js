const express = require('express')
var bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const app = express()
let port = 3000;

const cors = require("cors");

require('dotenv').config()
// console.log(process.env.JWT_KEY)

const userRoute = require('./modules/users/userRoutes');
const productRoute = require("./modules/products/productRoute");
const orderRoute = require("./modules/orders/orderRoute");


app.use(cors());

app.use('/api/user', jsonParser, userRoute);
app.use('/api/product', jsonParser, productRoute);
app.use('/api/order', jsonParser, orderRoute);




app.get('/home',jsonParser, (req, res) => {

    let message = {
        "health" : "SUCCESS",
        "LISTENING" : "/home"
    }
    console.log(req.query);
    message.req = req.body
    
    res.send(message);

    

})


console.log("LISTENING AT PORT 3000")
app.listen(3000)