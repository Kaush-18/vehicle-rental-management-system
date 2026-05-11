const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  try {

    const authHeader =
      req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader) {

      return res.status(401).json({
        message: "No token provided"
      });

    }

    // Remove Bearer
    const token =
      authHeader.split(" ")[1];

    console.log("TOKEN:", token);

    const decoded = jwt.verify(
      token,
      "secretkey"
    );

    console.log("DECODED:", decoded);

    req.user = decoded;

    next();

  } catch (error) {

    console.log("AUTH ERROR:", error);

    res.status(401).json({
      message: "Invalid token"
    });

  }

};

module.exports = authMiddleware;