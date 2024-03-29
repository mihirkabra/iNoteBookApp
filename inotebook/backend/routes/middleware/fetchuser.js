const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ msg: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "thisIsAJWTSecret");
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).send({ msg: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
