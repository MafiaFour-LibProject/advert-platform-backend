const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ads",           // Folder name in your Cloudinary account
    allowed_formats: ["jpeg", "png", "jpg", "mp4", "mov", "avi"],
  },
});

const upload = multer({ storage });

module.exports = upload;