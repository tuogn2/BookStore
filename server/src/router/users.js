
const express = require('express');
const usercontroller = require('../app/controllers/usercontroller');
const route = express.Router()


route.post('/createuser',usercontroller.adduser)
route.post('/login',usercontroller.loginuser)
route.get('/user/:id',usercontroller.getuser)
route.get('/',usercontroller.getusers)


module.exports =route;
