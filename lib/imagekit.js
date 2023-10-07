// SDK initialization

var ImageKit = require("imagekit");
const dotenv = require("dotenv").config();

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBKEY,
  privateKey: process.env.IMAGEKIT_PRIVKEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});

module.exports = imagekit;
