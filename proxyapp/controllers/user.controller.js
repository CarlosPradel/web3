const { postLogin, postRefresh } = require("../services/auth.service");
const { createSessionCookie } = require("../utilities/cookie.utilities");

exports.login = (req, res) => {
    const { username, password } = req.body;
    postLogin(username, password).then((response) => {
        const token = response.access;
        const refresh = response.refresh;
        createSessionCookie(res, token, refresh);
        res.send({
            message: 'Login successful'
        })
    }).catch((error) => {
        console.log(error);
        res.status(401).send({
            message: 'Unauthorized'
        })
    });
}
exports.refreshToken = (req, res) => {
    const refreshCookie = req.cookies.refresh;
    if (!refreshCookie) {
        res.status(401).send({
            message: 'Unauthorized'
        });
        return;
    }
    console.log('refresh', refreshCookie)
    postRefresh(refreshCookie)
        .then((response) => {
            const token = response.access;
            console.log('token', token)
            createSessionCookie(res, token);
            res.send({
                message: 'Token refreshed'
            });
        }).catch((error) => {
            console.log(error);
            res.status(401).send({
                message: 'Unauthorized'
            });
        });
}