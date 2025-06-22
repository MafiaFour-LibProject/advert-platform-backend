const jwt = require("jsonwebtoken");

const auth = (roles = []) => {
  // Ensure roles is an array
  if (!Array.isArray(roles)) {
    roles = [roles];
  }

  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ error: "No authorization header" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Missing token" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Role-based access
      if (roles.length && !roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ error: "Access forbidden for your role" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };
};

module.exports = auth;