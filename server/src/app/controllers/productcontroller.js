const products = require('../modal/product')

class productcontroller {

    getproduct(req, res, next) {
        products.find()
            .then(product => {
                return res.status(200).json(product)
            })
            .catch(err => res.status(500).json(err))
    }
    addproduct(req, res, next) {
        const picture = req.file.path.split(`\\`).slice(2).join('/');
        req.body.picture = picture
        const product = new products(req.body)
        product.save()
            .then(product =>
                res.status(200).json(product))
            .catch(err => res.status(500).json(err))
    }

    findproduct(req, res, next) {
        products.findById(req.params.id)
            .then(product => {
                if(!product){
                        res.status(403).json({name:'hi'})
    
                }
                res.status(200).json(product)
            })
            .catch(err => res.status(500).json({err:err}))

    }
}

module.exports = new productcontroller