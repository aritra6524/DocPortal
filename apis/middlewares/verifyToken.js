const jwt = require("jsonwebtoken");

//token verification middleware
const verifyToken = (req, res, next) => {
  //get token from req
  let bearerToken = req.headers.authorization;
  //search for bearer token from req
  let token = bearerToken.split(" ")[1];
  console.log(token);
  //if token is not existed, send res as 'unauthorized access'
  if (token == undefined) {
    res.send({ message: "Unauthorized access" });
  }
  //if token is there, but expired, send res as relogin
  try {
    let decodedToken = jwt.verify(token, "abcdef");
    console.log(decodedToken);
    //call next middleware
    next();
  } catch (err) {
    res.send({ message: "Token expired. Please relogin" });
  }
  //if token is there and valid, then forward to next middleware
};

module.exports = verifyToken;
