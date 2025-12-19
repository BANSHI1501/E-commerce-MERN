const productModel = require("../../models/productModel")

const getCategoryWiseProduct = async(req,res)=>{
    try{
        const { category } = req?.body || req?.query
        console.log("Requested category:", category)
        const product = await productModel.find({ category : { $regex : new RegExp(category,"i") } })
        console.log("Products found:", product.length, "for category:", category)

        res.json({
            data : product,
            message : "Product",
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = getCategoryWiseProduct