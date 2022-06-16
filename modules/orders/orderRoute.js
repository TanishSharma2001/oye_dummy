const router = require('express').Router();
const {auth} = require("./../middleware/auth");
const orderController = require("./orderController");

router.patch("/update/:orderId", auth, orderController.updateStatus);

module.exports = router;
