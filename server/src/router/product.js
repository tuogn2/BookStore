
const express = require('express');
const productcontroller = require('../app/controllers/productcontroller')
const multer  = require('multer')
const upload = multer({ dest: './src/public/img' })
const route = express.Router()


route.post('/addproduct',upload.single('picture'),productcontroller.addproduct)
route.get('/findproduct/:id',productcontroller.findproduct)
route.get('/',productcontroller.getproduct)



module.exports =route;
