const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(filePath); // Delete local file
    return result.secure_url;
  } catch (error) {
    fs.unlinkSync(filePath);
    throw error;
  }
};

module.exports = uploadToCloudinary;