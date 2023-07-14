const store = require('../modal/store')
class storecontroller {
    getallcart(req, res, next) {
        store.find({})
            .then((product) => {
                res.status(200).json(product)
            })
            .catch(err => res.status(500).json(err))
    }
    //get cart theo user 
    getcartuser(req, res, next) {
        store.find({ userid: req.params.userid })
            .then(value => {
                return res.status(200).json(value)
            })
            .catch(err => res.status(500).json(err))
    }
    //truyeenf id so luong ma san pham
    addcart(req, res, next) {
        store.find({ userid: req.body.userid })
            .then(cart => {
                //chua them san pham nao
                if (!cart[0]) {
                    const item = new store({
                        userid: req.body.userid,
                        products: [{
                            productID: req.body.productID,
                            quantity: req.body.quantity
                        }]
                    })
                    item.save()
                        .then(product => {
                            return res.status(200).json(product)
                        })
                        .catch(err => res.status(500).json(err))

                } else {
                    //có rồi và phải check xem có trong mảng không
                    const length = cart[0].products.length
                    //kiểm tra xem có trong mảng products không
                    let found = false
                    for (let i = 0; i < length; i++) {
                        if (req.body.productID === cart[0].products[i].productID) {
                            found = true;
                            break;
                        }
                    }

                    //có trong mảng
                    if (found) {
                        store.findOneAndUpdate(
                            { userid: req.body.userid },
                            { $inc: { "products.$[dk].quantity": req.body.quantity } },
                            { arrayFilters: [{ 'dk.productID': req.body.productID }] },{new:true})
                            .then(value => {
                                return res.status(200).json(value)
                            })
                            .catch(err => res.status(500).json(err))
                    } else {
                        store.findOneAndUpdate({ userid: req.body.userid },
                            {
                                $addToSet: {
                                    products: {
                                        productID: req.body.productID,
                                        quantity: req.body.quantity
                                    }
                                }
                            },{new:true})
                            .then(value => {
                                return res.status(200).json(value)
                            })
                            .catch(err => res.status(500).json(err))
                    }
                }
            })
            .catch(err => res.status(500).json(err))

    }

    deleteproduct(req, res, next) {
        store.updateOne({ userid: req.body.userid },
            {
                $pull: {
                    "products": { "productID": req.body.ProductID }
                }
            })
            .then(value => {
                return res.status(200).json(value)
            })
            .catch(err=> res.status(500).json(err))
    }


    deletecart(req,res,next){
        store.findOneAndDelete({userid:req.body.userid })
        .then(value => res.status(200).json(value))
        .catch(err=>res.status(500).json(err))
    }
    
}

module.exports = new storecontroller;