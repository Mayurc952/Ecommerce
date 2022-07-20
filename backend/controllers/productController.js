const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');

const catchAsyncError = require('../middlware/catchAsyncErrors');//try catch for async
const ApiFeatures = require('../utils/apifeatures');

//create product--admin
exports.createProduct = catchAsyncError(async(req,res,next)=>{
    
    req.body.user = req.user.id;
    
    
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product,
    })
});
//get all products
exports.getAllProducts = catchAsyncError (async(req,res) =>{
const resultPerPage = 5;
const productCount = await Product.countDocuments();
    const apifeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
// const products= await Product.find();---change bcz shows double results
const products= await apifeature.query;

    res.status(200).json({
        success:true,
        products
    })
});

//get single product detail
exports.getProductDetails = catchAsyncError( async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404) );
    }
    res.status(200).json({
        success:true,
        product,
        productCount,
    })
});

//update product=admin
exports.updateProduct= catchAsyncError (async(req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404) );
    }
    product= await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
});

//delete product
exports.deleteProduct = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404) );
    } 

await product.remove();

res.status(200).json({
    success:true,
    message: "Product Delete Sucessful"
})
})

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  });

  // Create New Review or Update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;//4,5,5,2=16/4=4
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
  
  // Get All Reviews of a product
  exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });
  
  // Delete Review
  exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });