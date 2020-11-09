const { Router } = require("express");
const RoboController = require("../Controllers/RoboController")

const router = Router();


router.get("/startRobo", RoboController.getTemtem);
router.get("/index", RoboController.getTemtem);


module.exports = router;