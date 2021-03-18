exports.logout = async function (req, res, next) {
    try {
        if (req.cookies.session) {
            res.clearCookie("session");
            return res.redirect("/");
        }

        return res.redirect("/");
    } catch (err) {
        return res.redirect("/"); 
    }
}