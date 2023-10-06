const { Car } = require("../models");
const { Op } = require("sequelize");
const imagekit = require("../lib/imagekit");

const carsPage = async (req, res) => {
  try {
    const { category, search } = req.query;

    const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    let cars;

    const searchCriteria = {};

    if (category === "small" || category === "medium" || category === "large") {
      searchCriteria.category = category;
    }

    if (search) {
      searchCriteria.name = { [Op.iLike]: `%${search}%` };
    }

    cars = await Car.findAll({ where: searchCriteria });

    res.render("index.ejs", {
      fullUrl,
      cars,
      message: req.flash("message", ""),
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

const createPage = async (req, res) => {
  try {
    res.render("create.ejs");
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

const createCar = async (req, res) => {
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
    await Car.create({
      name,
      price,
      category,
      image: img.url,
    });
    req.flash("message", "Data Berhasil Disimpan");
    res.redirect("/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

const editPage = async (req, res) => {
  try {
    const car = await Car.findOne({ where: { id: req.params.id } });
    res.render("edit.ejs", {
      car,
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
    req.flash("message", "Data Berhasil Diupdate");
    res.redirect("/dashboard");
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
    req.flash("message", "Data Berhasil Dihapus");
    res.redirect("/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = {
  carsPage,
  createPage,
  createCar,
  editPage,
  editCar,
  removeCar,
};
