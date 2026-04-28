const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Access Denied: No token provided' });
  }

  try {
    // Extract the token from "Bearer <token>" format
    const tokenWithoutBearer = token.split(' ')[1];

    // Verify the token using the JWT secret
    const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

    // Attach the user data to the request
    req.user = verified;
    next(); // Move to the next route handler
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
