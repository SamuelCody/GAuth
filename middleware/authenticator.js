require("dotenv").config();
const jwt = require('jsonwebtoken');

exports.authenticator = async function (req, res, next) {
  try {
    const token = req.cookies.session;
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (decoded) {
        return next();
      } else {
        return res.redirect("/");
      }
    });
  } catch (err) {
    return res.redirect("/");
  }
};
