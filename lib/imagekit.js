// SDK initialization
const dotenv = require("dotenv");
dotenv.config;

var ImageKit = require("imagekit");

var imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBKEY,
  privateKey: process.env.IMAGEKIT_PRIVKEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});

module.exports = imagekit;
