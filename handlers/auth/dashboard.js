const jwt = require('jsonwebtoken');
const User = require("../../models/User");

exports.dashboard = async function (req, res, next) {
    try {
        const token = req.cookies.session;
        jwt.verify(token, process.env.JWT_SECRET_KEY, async function (err, decoded) {
            if (!decoded) {
                return res.redirect("/")
            }
            const user = await User.findById(decoded.id);
            return res.render('dashboard', {
                data: {
                    user
                }
            });
        })
    } catch (err) {
        return res.redirect("/");
    }
}