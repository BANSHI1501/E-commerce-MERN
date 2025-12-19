const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const { createOrder, getAllOrders, updateOrderStatus } = require('../controller/order/orderController')



router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get("/user-details", authToken, userDetailsController)
router.get("/userLogout", userLogout)

//admin panel 
router.get("/all-user", authToken, allUsers)
router.post("/update-user", authToken, updateUser)

//product
router.post("/upload-product", authToken, UploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product", getCategoryWiseProduct)
router.post("/product-details", getProductDetails)
router.get("/search", searchProduct)
router.post("/filter-product", filterProductController)

//user add to cart
router.post("/addtocart", authToken, addToCartController)
router.get("/countAddToCartProduct", authToken, countAddToCartProduct)
router.get("/view-card-product", authToken, addToCartViewProduct)
router.post("/update-cart-product", authToken, updateAddToCartProduct)
router.post("/delete-cart-product", authToken, deleteAddToCartProduct)

//order routes
router.post("/create-order", authToken, createOrder)
router.get("/get-orders", authToken, getAllOrders)
router.post("/update-order-status", authToken, updateOrderStatus)

//debug endpoint - check all orders in database (no auth required)
router.get("/debug-orders", async (req, res) => {
    try {
        const order = require('../models/orderModel')
        const allOrders = await order.find().populate('userId').populate('products.productId')
        
        console.log("DEBUG: Total orders in DB:", allOrders.length)
        console.log("DEBUG: Orders data:", JSON.stringify(allOrders, null, 2))
        
        res.json({
            totalOrders: allOrders.length,
            orders: allOrders
        })
    } catch (err) {
        res.json({
            error: err.message
        })
    }
})

router.post("/update", async (req, res) => {
    
})

// Debug endpoint to check orders
router.get("/debug/orders", async (req, res) => {
    try {
        const orderModel = require("../models/orderModel")
        const allOrders = await orderModel.find().lean()
        console.log("Debug - All orders from DB:", allOrders)
        res.json({
            success: true,
            message: "Orders found",
            data: allOrders,
            count: allOrders.length
        })
    } catch (err) {
        res.json({
            success: false,
            message: err.message,
            error: true
        })
    }
})

module.exports = router


module.exports = router