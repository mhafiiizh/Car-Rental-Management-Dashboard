const checkId = async (req, res, next, val) => {
  const car = await Car.findOne({
    where: {
      id: val,
    },
  });

  if (!car) {
    return res.status(404).json({
      status: "failed",
      message: `Data with ID = ${val} is not found`,
    });
  }
  next();
};

module.exports = checkId;
