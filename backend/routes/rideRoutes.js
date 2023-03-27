const express = require("express");
const {
  registerRide,
  getAllRides,
} = require("../controllers/rideController");
// const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/newride", registerRide);
router.get("/getrides", getAllRides);

module.exports = router;