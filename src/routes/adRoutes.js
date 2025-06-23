const express = require("express");
const upload = require("../middleware/upload");
const {
  createAd,
  getAllAds,
  getAdById,
  updateAd,
  deleteAd,
} = require("../controllers/adController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Public
router.get("/", getAllAds);
router.get("/:id", getAdById);

// Vendors Only
// router.post("/", authMiddleware(["vendor"]), createAd);
router.post("/", authMiddleware(["vendor"]), upload.array("media", 5), createAd);
router.put("/:id", authMiddleware(["vendor"]), upload.array("media", 5), updateAd);
// router.put("/:id", authMiddleware(["vendor"]), updateAd);
router.delete("/:id", authMiddleware(["vendor"]), deleteAd);

module.exports = router;