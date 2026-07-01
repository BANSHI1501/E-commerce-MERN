const mongoose = require('mongoose');
const productModel = require('./models/productModel');
require('dotenv').config();

// Sample products to add
const sampleProducts = [
    {
        productName: "Sony WH-1000XM4 Headphones",
        brandName: "Sony",
        category: "earphones",
        productImage: ["https://via.placeholder.com/300?text=Sony+WH1000XM4"],
        description: "Premium wireless noise-cancelling headphones",
        price: 35000,
        sellingPrice: 28000
    },
    {
        productName: "Apple AirPods Pro",
        brandName: "Apple",
        category: "airpodes",
        productImage: ["https://via.placeholder.com/300?text=Apple+AirPods+Pro"],
        description: "True wireless earbuds with noise cancellation",
        price: 25000,
        sellingPrice: 21000
    },
    {
        productName: "Samsung Galaxy S23",
        brandName: "Samsung",
        category: "mobiles",
        productImage: ["https://via.placeholder.com/300?text=Samsung+S23"],
        description: "Latest flagship smartphone",
        price: 75000,
        sellingPrice: 65000
    },
    {
        productName: "Logitech MX Master 3",
        brandName: "Logitech",
        category: "mouse",
        productImage: ["https://via.placeholder.com/300?text=Logitech+MX"],
        description: "Advanced wireless mouse",
        price: 8000,
        sellingPrice: 6500
    },
    {
        productName: "Canon EOS R5",
        brandName: "Canon",
        category: "camera",
        productImage: ["https://via.placeholder.com/300?text=Canon+EOS+R5"],
        description: "Professional mirrorless camera",
        price: 285000,
        sellingPrice: 250000
    },
    {
        productName: "JBL Flip 6",
        brandName: "JBL",
        category: "speakers",
        productImage: ["https://via.placeholder.com/300?text=JBL+Flip6"],
        description: "Portable waterproof Bluetooth speaker",
        price: 12000,
        sellingPrice: 10000
    },
    {
        productName: "MI Smart Band 7",
        brandName: "Xiaomi",
        category: "watches",
        productImage: ["https://via.placeholder.com/300?text=MI+Band7"],
        description: "Fitness tracking smartwatch",
        price: 3500,
        sellingPrice: 2999
    },
    {
        productName: "Philips 55-inch 4K TV",
        brandName: "Philips",
        category: "televisions",
        productImage: ["https://via.placeholder.com/300?text=Philips+4K+TV"],
        description: "55 inch 4K Ultra HD Smart TV",
        price: 35000,
        sellingPrice: 29999
    }
];

async function addProducts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");

        // Clear existing products
        await productModel.deleteMany({});
        console.log("Cleared existing products");

        // Add new products
        const result = await productModel.insertMany(sampleProducts);
        console.log(`Successfully added ${result.length} products`);

        // Verify
        const count = await productModel.countDocuments();
        console.log(`Total products in database: ${count}`);

        // Show categories
        const categories = await productModel.distinct('category');
        console.log("Categories in database:", categories);

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

addProducts();
