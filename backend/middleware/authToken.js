const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    console.log("token:", token);

    // ❌ No token
    if (!token) {
      return res.status(401).json({
        message: "Please Login...!",
        error: true,
        success: false,
      });
    }

    // ✅ Verify token
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid or expired token",
          error: true,
          success: false,
        });
      }

      // ✅ Attach user id to request
      req.userId = decoded?._id;

      // ✅ Continue to next middleware / route
      next();
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Authentication error",
      error: true,
      success: false,
    });
  }
};

module.exports = authToken;
