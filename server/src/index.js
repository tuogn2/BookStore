const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();
const path = require('path')
const cors = require('cors');
const router = require('./router');
const db = require('./config/db/index.js')
const app = express()
const cookieParser = require('cookie-parser')
const port = process.env.port || 5000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
app.options('*', cors());

app.use(cookieParser('dochituong'))
app.use(express.static(path.join(__dirname, 'public')));

db.connect()

router(app)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})