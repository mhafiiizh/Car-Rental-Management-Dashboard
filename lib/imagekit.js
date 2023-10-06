// SDK initialization

var ImageKit = require("imagekit");

var imagekit = new ImageKit({
  publicKey: "public_7uKrZDBKSjbVzIDmg7paJbEq6Qw=",
  privateKey: "private_AmO4amwEiNuAwaco0dwQ8P2GVQo=",
  urlEndpoint: "https://ik.imagekit.io/cbtfkvupm4",
});

module.exports = imagekit;
