const jwt = require('jsonwebtoken');

exports.callback = async function (req, res, next) {
    try {
        // Passportjs sends back the user attached to the request object, I set it as part of the cookie session
        // console.log(req.user._id);
        const token = jwt.sign({
            id: req.user._id
        }, process.env.JWT_SECRET_KEY, { expiresIn: "3600000ms" });

        //set a session cookie
        res.cookie("session", token, {
            expires: new Date(Date.now() + 3600000),
            secure: false, //will be set to true in production
            httpOnly: true,
        });

        //Explicitly save the session before redirecting
        req.session.save(() => {
            res.redirect('/dashboard');
        });
    } catch (err) {
        return res.redirect("/");
    }
}