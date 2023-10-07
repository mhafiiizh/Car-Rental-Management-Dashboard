const router = require("express").Router();
const carController = require("../../controllers/api/carController");
const uploader = require("../../middlewares/uploader");

const checkId = require("../../middlewares/checkId");

router.route("/api/v1/cars/").get(carController.getAllCars);
router
  .route("/api/v1/cars/")
  .post(uploader.single("image"), carController.createCar);

router.route("/api/v1/cars/:id").get(checkId, carController.getCarById);
router
  .route("/api/v1/cars/:id")
  .put(uploader.single("image"), carController.editCar);
router.route("/api/v1/cars/:id").delete(checkId, carController.removeCar);

module.exports = router;
