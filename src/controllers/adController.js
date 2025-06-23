const Ad = require("../models/Ad"); 
const cloudinary = require("../config/cloudinary");

const createAd = async (req, res) => {
  try {
    const { title, category, price, description, media: mediaURLs } = req.body;

    // Validate required fields
    if (!title || !category || !price || !description) {
      return res.status(400).json({ error: "title, category, price, and description are required fields" });
    }

    const finalMedia = [];

    // Upload to Cloudinary 
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