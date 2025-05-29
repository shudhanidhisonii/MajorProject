const express= require("express");
// const router= express.Router();
const reviewController=require("../controllers/reviews.js")
const router = express.Router({ mergeParams: true });
const wrapAsync= require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
// const { reviewSchema } = require("../views/schema.js");


const Listing= require("../models/listing.js")
const Review= require("../models/review.js")
const {validateReview, isLoggedIn, isAuthor}= require("../middleware.js")
// const validateReview=(req,res,next)=>{
//     let {error}= reviewSchema.validate(req.body);
//     if(error){
//         let errMsg= error.details.map((el)=> el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     }
//     else{
//         next();
//     }
// }
//Reviews
//Post route
router.post("/", isLoggedIn,validateReview ,wrapAsync(reviewController.createReview))
 // Delete review route
router.delete("/:reviewId",isLoggedIn,isAuthor, wrapAsync(reviewController.destroyR))
module.exports= router;
