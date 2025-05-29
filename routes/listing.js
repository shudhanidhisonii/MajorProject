const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const listingController = require("../controllers/listings.js");

// ✅ STATIC ROUTES FIRST

// New listing form
router.get("/new", isLoggedIn, listingController.renderNewForm);

// ✅ Create listing route with image upload
router.post(
  "/",
  isLoggedIn,
  upload.single("image"),  // Use 'image' as the field name in your HTML form
  validateListing,
  wrapAsync(listingController.postListing)
);

// ✅ All listings (Index Route)
router.get("/", wrapAsync(listingController.index));

// ✅ DYNAMIC ROUTES LAST

router.route("/:id")
  // Show a listing
  .get(wrapAsync(listingController.showRoute))
  // Update listing
  .put(isLoggedIn, isOwner,upload.single("image"), validateListing, wrapAsync(listingController.updateRoute))
  // Delete listing
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroy));

// Edit form for a listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEdit));

module.exports = router;
