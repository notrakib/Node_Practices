const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  let decoded;

  if (!authHeader) {
    throw Error("No Authorization Header Attached");
  }

  const token = authHeader.split(" ")[1];

  try {
    decoded = jwt.verify(token, "amiRakib");
  } catch (error) {
    throw error;
  }

  if (!decoded) {
    throw Error("Token Expired");
  }

  req.userId = decoded.userId;
  next();
};
