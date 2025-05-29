const Listing= require("../models/listing")
const { listingSchema } = require("../views/schema.js");

module.exports.index=async(req,res)=>{
 const allList= await  Listing.find({})
 res.render("listings/index.ejs",{allList})}

 module.exports.renderNewForm=(req,res)=>{
    // console.log(req.user)

    res.render("listings/new.ejs")
}

module.exports.showRoute=async(req,res)=>{
    let {id}= req.params;
   const list= await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner")
   if(!list){
    req.flash("error","Listing does not exist")
    res.redirect("/listings")
   }
   console.log(list)
   res.render("listings/show.ejs",{list})
}

module.exports.postListing=async(req,res,next)=>{
  //  let{title,description, image, price,country, location}=req.body;
// if(!req.body.listing || Object.keys(req.body).length === 0){
//     throw new ExpressError(400,"Send valid data for listing")
// }
let result=listingSchema.validate(req.body)
// console.log(result)
// if(result.error){
//     throw new ExpressError(400, result.error)
// }
let url= req.file.path;
let filename= req.file.filename;
console.log(url,"..",filename)
    const newListing= new Listing( req.body.listing)
    // console.log(req.user)
    newListing.owner=req.user._id
    newListing.image={url,filename}
    await newListing.save(); 
    // console.log(newListing)
    req.flash("success","New Listing created successfully")
    res.redirect("/listings")
    //   console.log(listing)
}

module.exports.renderEdit=async(req,res)=>{
    let {id}= req.params;
   const listing= await Listing.findById(id)
   if(!listing){
    req.flash("error","Listing does not exist")
    res.redirect("/listings")
   }

   let originalImageUrl= listing.image.url;
    originalImageUrl =originalImageUrl.replace("/upload","/upload/w_256")
   res.render("listings/edit.ejs",{listing,originalImageUrl })
}

module.exports.updateRoute=async(req,res)=>{
    let {id}=req.params;
   let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});
  if(typeof req.file!=="undefined"){
      let url= req.file.path;
let filename= req.file.filename;
listing.image={url,filename}
await listing.save();
  }
    req.flash("success","Listing Updated")
    res.redirect(`/listings/${id}`);
}

module.exports.deleteRoute=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id)
    req.flash("success","Listing deleted")
    res.redirect("/listings");
}

module.exports.destroy=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id)
    req.flash("success","Listing deleted")
    res.redirect("/listings");
}