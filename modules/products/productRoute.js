
const express =  require('express');
const router = express.Router();

const {auth} = require("./../middleware/auth");
const productController = require("./productController");

router.post('/', auth, productController.createProduct)
router.patch('/update/:productId', auth, productController.updateProduct)
router.patch('/updateStatus/:productId', auth, productController.updateProductStatus)
router.delete('/delete/:productId', auth, productController.deleteProduct);
router.get('/buy', auth, productController.buyProduct);

module.exports = router;