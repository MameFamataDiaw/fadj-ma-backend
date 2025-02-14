const { Signup, Login } = require("../controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signuP", Signup)
router.post('/login', Login)
router.post('/', userVerification)
router.get('/user', userVerification)

module.exports = router;