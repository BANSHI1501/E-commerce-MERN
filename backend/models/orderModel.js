const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderId : {
        type : String,
        unique : true,
        sparse: true
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : 'user',
        required : true
    },
    products : [
        {
            productId : {
                type : mongoose.Schema.ObjectId,
                ref : 'product'
            },
            quantity : Number,
            price : Number
        }
    ],
    totalAmount : {
        type : Number,
        required : true
    },
    totalQty : {
        type : Number,
        required : true
    },
    orderStatus : {
        type : String,
        enum : ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
        default : 'Confirmed'
    },
    paymentStatus : {
        type : String,
        enum : ['Pending', 'Completed', 'Failed'],
        default : 'Pending'
    },
    orderDate : {
        type : Date,
        default : Date.now
    },
    shippingAddress : {
        type : String
    },
    phoneNumber : {
        type : String
    }
},{
    timestamps : true
})

// Static method to get next order ID in format A1, B2, C3, etc.
orderSchema.statics.getNextOrderId = async function() {
    const lastOrder = await this.findOne().sort({ _id: -1 }).lean()
    const count = await this.countDocuments()
    const nextCount = count + 1
    
    // Generate format like A1, B2, C3, etc.
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const letterIndex = Math.floor((nextCount - 1) / 26) % letters.length
    const numberIndex = ((nextCount - 1) % 26) + 1
    
    return letters[letterIndex] + numberIndex
}

// Pre-save hook to generate order ID in format A1, B2, etc.
orderSchema.pre('save', async function(next) {
    if (!this.orderId) {
        try {
            this.orderId = await this.constructor.getNextOrderId()
            console.log("✅ Generated order ID:", this.orderId)
        } catch (err) {
            console.error("❌ Error generating orderId:", err.message)
            this.orderId = 'A1'
        }
    }
    next()
})

const order = mongoose.model('order', orderSchema)

module.exports = order