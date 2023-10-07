const { Car } = require("../../models");
const { Op } = require("sequelize");
const imagekit = require("../../lib/imagekit");

const getAllCars = async (req, res) => {
  try {
    const { category, search } = req.query;

    let cars;

    const searchCriteria = {};

    if (category === "small" || category === "medium" || category === "large") {
      searchCriteria.category = category;
    }

    if (search) {
      searchCriteria.name = { [Op.iLike]: `%${search}%` };
    }

    cars = await Car.findAll({ where: searchCriteria });

    res.status(200).json({
      status: "success",
      data: {
        cars,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

const getCarById = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Car.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        car,
      },
    });
  } catch (error) {}
};

const createCar = async (req, res) => {
  const { name, price, category } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      status: "failed",
      message: "File image is required.",
    });
  }

  // Get extension file
  const split = file.originalname.split(".");
  const extension = split[split.length - 1];

  // Upload file to imagekit
  const img = await imagekit.upload({
    file: file.buffer,
    fileName: `IMG-${Date.now()}.${extension}`,
  });

  try {
    const car = await Car.create({
      name,
      price,
      category,
      image: img.url,
    });
    res.status(201).json({
      status: "success",
      data: {
        car,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

const editCar = async (req, res) => {
  const { name, price, category } = req.body;
  const file = req.file;

  // Get extension file
  const split = file.originalname.split(".");
  const extension = split[split.length - 1];

  // Upload file to imagekit
  const img = await imagekit.upload({
    file: file.buffer,
    fileName: `IMG-${Date.now()}.${extension}`,
  });

  try {
    const id = req.params.id;
    await Car.update(
      {
        name,
        price,
        category,
        image: img.url,
      },
      { where: { id } }
    );
    res.status(200).json({
      status: "success",
      message: `Data with ID ${id} is updated`,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

const removeCar = async (req, res) => {
  try {
    const id = req.params.id;
    await Car.destroy({ where: { id } });
    res.status(200).json({
      status: "success",
      message: `Data with ID ${id} is removed`,
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  editCar,
  removeCar,
};
