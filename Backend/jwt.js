const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token not found" });

  //Extract the jwt token from the request headers
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    //Verify the jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Attach user information to the request object
    req.user = decoded; //any name can be given other than like req.userPayload etc.
    console.log(decoded);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = { generateToken, jwtAuthMiddleware };
