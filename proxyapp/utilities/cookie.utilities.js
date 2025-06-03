const createSessionCookie = (res, token, refresh) => {
    res.cookie('session', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 1 * 60 * 1000
    });
    if (refresh) {
        res.cookie('refresh', refresh, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000
        });
    }
}
module.exports = {
    createSessionCookie
}