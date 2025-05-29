const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review = require("./review.js")


const listingSchema= new Schema({
    title: {
        type:String,  
        required:true },
    description: String,
    image: {
        filename: String,
        url: {
          type: String,
          default: "https://unsplash.com/photos/seashore-during-golden-hour-KMn4VEeEPR8",
          set: v => v === "" ? "https://unsplash.com/photos/seashore-during-golden-hour-KMn4VEeEPR8" : v
        }
      },
      
    price: Number,
    location: String,
    country: String,
    reviews:[
      {
        type: Schema.Types.ObjectId,
        ref:"Review"

      }
    ],
    owner:{
      type:Schema.Types.ObjectId,
      ref:"User",
    }
});


listingSchema.post("findOneAndDelete", async(listing)=>{
  if(listing){
    await Review.deleteMany({_id : {$in: listing.reviews}})
  }
})  


const Listing= mongoose.model("Listing", listingSchema);
module.exports= Listing;