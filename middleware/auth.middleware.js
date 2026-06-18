const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Check Authorization header first, then cookie as fallback
  let token = null;

  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    token = req.cookies?.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized Access!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized Access!" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
