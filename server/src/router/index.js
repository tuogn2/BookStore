const users = require('./users');
const products = require('./product');
const store = require('./store')
function router(app){
    app.use('/api/user',users)
    app.use('/api/product',products)
    app.use('/api/store',store)
    app.use('/',(req,res)=>{
        res.send('hi')
    })
} 

module.exports =  router;