const router = require("express").Router();
const userController = require("./userController");
const {auth} = require("./../middleware/auth");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.delete("/delete/:userId", auth, userController.deleteUser);

module.exports = router;