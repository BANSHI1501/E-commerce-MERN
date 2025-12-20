const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')

const app = express()

// Log CORS configuration
console.log("CORS Origin:", process.env.FRONTEND_URL)
console.log("NODE_ENV:", process.env.NODE_ENV)

// Trust proxy (useful on Render / behind proxies)
app.set('trust proxy', true)

// Dynamic CORS config using FRONTEND_URL (no trailing slash) and localhost
const allowedOrigins = ['http://localhost:3000']
if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL.replace(/\/+$/, ''))
}

// Regex for matching localhost origins (any port)
const localhostRegex = /^https?:\/\/(localhost|127\.0\.1|127\.0\.0\.1)(:\d+)?$/

const corsOptions = {
    origin: (origin, callback) => {
        console.log('Incoming Origin:', origin)
        // allow requests with no origin (curl, server-to-server)
        if (!origin) return callback(null, true)

        // allow explicitly configured origins
        if (allowedOrigins.includes(origin)) return callback(null, true)

        // during development accept any localhost origin (any port)
        if (process.env.NODE_ENV !== 'production' && localhostRegex.test(origin)) return callback(null, true)

        return callback(new Error('CORS policy: This origin is not allowed'))
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}

// Use CORS and explicitly enable preflight handling
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

// Middleware: explicit CORS response headers + logging for debugging
app.use((req, res, next) => {
    const origin = req.get('Origin')
    console.log(`[CORS DEBUG] ${req.method} ${req.path} - Origin:`, origin)

    if (origin) {
        // allow if included in allowedOrigins or matches localhost during dev
        if (allowedOrigins.includes(origin) || (process.env.NODE_ENV !== 'production' && localhostRegex.test(origin))) {
            res.setHeader('Access-Control-Allow-Origin', origin)
            res.setHeader('Access-Control-Allow-Credentials', 'true')
            res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS')
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With,Accept')
        } else {
            console.warn(`[CORS DEBUG] Blocking origin: ${origin}`)
        }
    }

    // Immediately respond to preflight requests to ensure proper headers
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204)
    }

    app.set('json spaces', 0)
    next()
})

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))
app.use(cookieParser())

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
    next()
})

// Catch malformed URLs (e.g., full URLs being sent as paths)
app.use((req, res, next) => {
    if (req.path.startsWith('http')) {
        console.error(`Malformed request detected: ${req.path}`)
        return res.status(400).json({
            success: false,
            message: "Invalid request - full URLs should not be sent as paths"
        })
    }
    next()
})

// Root route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Electronic Shop API", version: "1.0.0" })
})

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "Server is running" })
})

app.use("/api",router)

// 404 handler for undefined routes
app.use((req, res) => {
    console.warn(`404 - Route not found: ${req.method} ${req.originalUrl}`)
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.originalUrl
    })
})

// Global error handler
app.use((err, req, res, next) => {
    console.error("Error:", err)
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === 'development' ? err : {}
    })
})

const PORT = process.env.PORT || 8080;

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("✓ Connected to DB")
        console.log(`✓ Server is running on port ${PORT}`)
        console.log(`✓ API available at http://localhost:${PORT}`)
    })
}).catch((err) => {
    console.error("✗ Failed to connect to database:", err.message)
    process.exit(1)
})
