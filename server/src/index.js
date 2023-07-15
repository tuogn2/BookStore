const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();
const path = require('path')
// const cors = require('cors');
const router = require('./router');
const db = require('./config/db/index.js')
const app = express()
const cookieParser = require('cookie-parser')
const port = process.env.port || 5000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors({
//   origin: 'https://main--whimsical-douhua-7f4fcd.netlify.app',
//   credentials: true
// }));
// app.options('*', cors());

app.use(cookieParser('dochituong'))
app.use(express.static(path.join(__dirname, 'public')));

db.connect()
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://main--whimsical-douhua-7f4fcd.netlify.app');
  // res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

router(app)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})