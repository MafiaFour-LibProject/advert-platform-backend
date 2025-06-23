/*
const Ad = require("../models/Ad");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

// ------------------------------------------------------
// 🗂️ Create a New Ad (Vendor Only)
// ------------------------------------------------------
const createAd = async (req, res, next) => {
  try {
    const { title, category, price, description } = req.body;

    let mediaUrls = [];
    if (req.files && req.files.length) {
      const uploadPromises = req.files.map(file =>
        uploadToCloudinary(file.path)
      );
      mediaUrls = await Promise.all(uploadPromises);
    }

    const ad = await Ad.create({
      title,
      category,
      price,
      description,
      media: mediaUrls,
      vendorId: req.user.id,
      vendorName: req.user.username,
    });

    res.status(201).json({ message: "Ad Created", ad });
  } catch (error) {
    next(error);
  }
};

// ------------------------------------------------------
// 🔍 Get All Ads (Public)
// ------------------------------------------------------
const getAllAds = async (req, res, next) => {
  try {
    const {
      title,
      category,
      price_min,
      price_max,
      date_min,
      date_max,
      vendor_name,
    } = req.query;

    const filter = {};
    if (title) {
      filter.title = { $regex: `^${title}`, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }
    if (price_min && price_max) {
      filter.price = { $gte: Number(price_min), $lte: Number(price_max) };
    }
    if (date_min && date_max) {
      filter.dateCreated = {
        $gte: new Date(date_min),
        $lte: new Date(date_max),
      };
    }
    if (vendor_name) {
      filter.vendorName = { $regex: vendor_name, $options: "i" };
    }

    const ads = await Ad.find(filter);
    res.json({ ads });
  } catch (error) {
    next(error);
  }
};

// ------------------------------------------------------
// 👁️ Get a Single Ad by ID (Public)
// ------------------------------------------------------
const getAdById = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ error: "Ad not found" });
    }
    res.json({ ad });
  } catch (error) {
    next(error);
  }
};

// ------------------------------------------------------
// ✏️ Update an Ad (Vendor Only & Owner Restricted)
// ------------------------------------------------------
const updateAd = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ error: "Ad not found" });
    }
    if (ad.vendorId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this ad" });
    }

    const { title, category, price, description } = req.body;

    ad.title = title || ad.title;
    ad.category = category || ad.category;
    ad.price = price || ad.price;
    ad.description = description || ad.description;

    if (req.files && req.files.length) {
      const uploadPromises = req.files.map(file =>
        uploadToCloudinary(file.path)
      );
      ad.media = await Promise.all(uploadPromises);
    }

    await ad.save();
    res.json({ message: "Ad updated successfully", ad });
  } catch (error) {
    next(error);
  }
};

// ------------------------------------------------------
// 🗑️ Delete an Ad (Vendor Only & Owner Restricted)
// ------------------------------------------------------
const deleteAd = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ error: "Ad not found" });
    }
    if (ad.vendorId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this ad" });
    }

    await ad.deleteOne();
    res.json({ message: "Ad deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAd,
  getAllAds,
  getAdById,
  updateAd,
  deleteAd,
};
*/


/*
const Ad = require("../models/Ad");

// Create a new ad (Vendor only)
const createAd = async (req, res, next) => {
  try {
    const { title, category, price, description, media } = req.body;

    const newAd = new Ad({
      title,
      category,
      price,
      description,
      media,
      vendorId: req.user._id,
      vendorName: req.user.name,
    });

    const savedAd = await newAd.save();
    res.status(201).json({ message: "Ad created successfully", ad: savedAd });
  } catch (error) {
    next(error);
  }
};

// Get all ads (public)
const getAllAds = async (req, res, next) => {
  try {
    const { title, category, price_min, price_max, vendorName } = req.query;

    const query = {};
    if (title) {
      // Matches ads starting with title (case-insensitive)
      query.title = new RegExp("^" + title, "i");
    }
    if (category) {
      query.category = category;
    }
    if (vendorName) {
      query.vendorName = new RegExp("^" + vendorName, "i");
    }
    if (price_min || price_max) {
      query.price = {};
      if (price_min) query.price.$gte = Number(price_min);
      if (price_max) query.price.$lte = Number(price_max);
    }

    const ads = await Ad.find(query);
    res.json(ads);
  } catch (error) {
    next(error);
  }
};

// Get ad by ID (public)
const getAdById = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ error: "Ad not found" });
    }
    res.json(ad);
  } catch (error) {
    next(error);
  }
};

// Update an ad (Vendor only)
const updateAd = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ error: "Ad not found" });
    }

    // Check if this ad belongs to the logged-in vendor
    if (ad.vendorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized to update this ad" });
    }

    const { title, category, price, description, media } = req.body;

    ad.title = title ?? ad.title;
    ad.category = category ?? ad.category;
    ad.price = price ?? ad.price;
    ad.description = description ?? ad.description;
    ad.media = media ?? ad.media;

    const updatedAd = await ad.save();
    res.json({ message: "Ad updated successfully", ad: updatedAd });
  } catch (error) {
    next(error);
  }
};

// Delete an ad (Vendor only)
const deleteAd = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ error: "Ad not found" });
    }

    // Check if this ad belongs to the logged-in vendor
    if (ad.vendorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized to delete this ad" });
    }

    await ad.deleteOne();
    res.json({ message: "Ad deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAd,
  getAllAds,
  getAdById,
  updateAd,
  deleteAd,
};
*/



const Ad = require("../models/Ad"); 
const cloudinary = require("../config/cloudinary");

/*
const createAd = async (req, res) => {
  try {
    const { title, category, price, description, media: mediaURLs } = req.body;

    // Validate required fields
    if (!title || !category || !price || !description) {
      return res.status(400).json({ error: "title, category, price, and description are required fields" });
    }

    const finalMedia = [];

    // 1️⃣ Upload files to Cloudinary if any
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "auto",
        });
        finalMedia.push(result.secure_url);
      }
    }

    // 2️⃣ Accept media URLs from the request body
    if (mediaURLs && Array.isArray(mediaURLs)) {
      for (const url of mediaURLs) {
        finalMedia.push(url);
      }
    }

    // 3️⃣ Create the Ad
    const newAd = new Ad({
      title,
      category,
      price,
      description,
      media: finalMedia,
      vendorName: req.user.username,
    });

    await newAd.save();
    res.status(201).json(newAd);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
*/

const createAd = async (req, res) => {
  try {
    const { title, category, price, description, media: mediaURLs } = req.body;

    // Validate required fields
    if (!title || !category || !price || !description) {
      return res.status(400).json({ error: "title, category, price, and description are required fields" });
    }

    const finalMedia = [];

    // 1️⃣ Upload files to Cloudinary if any
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "auto",
        });
        finalMedia.push(result.secure_url);
      }
    }

    // 2️⃣ Accept media URLs from the request body
    if (mediaURLs && Array.isArray(mediaURLs)) {
      for (const url of mediaURLs) {
        finalMedia.push(url);
      }
    }

    // 3️⃣ Create the Ad
    const newAd = new Ad({
      title,
      category,
      price,
      description,
      media: finalMedia,
      vendorName: req.user.username,
      vendorId: req.user._id, // ✅ IMPORTANT!
    });

    await newAd.save();
    res.status(201).json(newAd);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};





const getAllAds = async (req, res) => {
  try {
    const { title, category, price, vendorName } = req.query;

    const filter = {};
    if (title) {
      // Regex for "starts with" match
      filter.title = { $regex: `^${title}`, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }
    if (price) {
      filter.price = { $lte: Number(price) };
    }
    if (vendorName) {
      filter.vendorName = vendorName;
    }

    const ads = await Ad.find(filter);
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ error: "Ad not found" });
    }
    res.json(ad);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const updateAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ error: "Ad not found" });
    }

    // Ensure the vendor can only update their own ads
    if (ad.vendorName !== req.user.username) {
      return res.status(403).json({ error: "Not authorized to update this ad" });
    }

    const { title, category, price, description, media: mediaURLs } = req.body;

    // Build final media array
    const finalMedia = ad.media ? [...ad.media] : [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "auto",
        });
        finalMedia.push(result.secure_url);
      }
    }

    if (mediaURLs && Array.isArray(mediaURLs)) {
      for (const url of mediaURLs) {
        finalMedia.push(url);
      }
    }

    ad.title = title || ad.title;
    ad.category = category || ad.category;
    ad.price = price || ad.price;
    ad.description = description || ad.description;
    ad.media = finalMedia;

    await ad.save();
    res.json(ad);
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

const deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ error: "Ad not found" });
    }

    // Ensure the vendor can only delete their own ads
    if (ad.vendorName !== req.user.username) {
      return res.status(403).json({ error: "Not authorized to delete this ad" });
    }

    await ad.remove();
    res.json({ message: "Ad deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = {
  createAd,
  getAllAds,
  getAdById,
  updateAd,
  deleteAd,
};