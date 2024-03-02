const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  //first check request headers has authorization or not

  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ error: "Token not Found" });
  }

  //extract the jwt token from the request headers
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorised" });
  }

  try {
    //verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Attach user information to the request object
    req.user = decoded;

    //decoded payload wapas se server me bhejna h to next
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid Token" });
  }
};

//Function to generate JWT Token
const generateToken = (userData) => {
  return jwt.sign({userData}, process.env.JWT_SECRET, { expiresIn: 30 });
};

module.exports = { jwtAuthMiddleware, generateToken };
