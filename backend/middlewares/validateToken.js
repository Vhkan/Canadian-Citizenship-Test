const SECRET = 'this_is_real_secret';
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  //header usertoken
  const { usertoken } = req.headers;

  jwt.verify(usertoken, SECRET, (err, decoded) => {
    if (err) {
      return res.status(406).json({ message: "Invalid token" });
    }
    //userInfo is a key
    req.userInfo = decoded;
    // return res.json(decoded);
    next(); //take it to the next callback in the route to the userontroller.get...
  });
};

module.exports = validateToken;