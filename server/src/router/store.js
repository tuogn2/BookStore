
const express = require('express');
const storecontroller = require('../app/controllers/storecontroller');
const store = require('../app/modal/store');
const route = express.Router()



route.post('/addcart',storecontroller.addcart)
route.put('/deleteproduct',storecontroller.deleteproduct)
route.delete('/deletecart',storecontroller.deletecart)
route.get('/getcartofuser/:userid',storecontroller.getcartuser)
route.get('/',storecontroller.getallcart)



module.exports =route;
