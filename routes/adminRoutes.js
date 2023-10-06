const express = require("express");
const adminController = require("../controllers/adminController");
const uploader = require("../middlewares/uploader");

const router = express.Router();

// API function for render page
router.route("/dashboard").get(adminController.carsPage);
router.route("/dashboard/create").get(adminController.createPage);
router.route("/dashboard/edit/:id").get(adminController.editPage);

// API functions for action in page
router
  .route("/cars/add")
  .post(uploader.single("image"), adminController.createCar);
router.route("/cars/delete/:id").post(adminController.removeCar);
router
  .route("/cars/edit/:id")
  .post(uploader.single("image"), adminController.editCar);

module.exports = router;
