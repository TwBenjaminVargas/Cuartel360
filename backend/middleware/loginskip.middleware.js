const authService = require('../service/auth.service');

const loginSkipMiddleware = () => {
    return async (req, res, next) => {

    try
    {

        const token = req.cookies.token;
        if(token)
        {
            const tokenPayload = await authService.validateToken(token);
            req.usuario = tokenPayload;

            if(tokenPayload.rol == 1)
                return res.redirect('/homeAdmin');
            if(tokenPayload.rol == 2)
                return res.redirect('/homeUser');
        }
        next();

    }
    catch(error)
    {
         console.log('Middleware detecto: ',error.message);
         next();
    }
};
}
module.exports = loginSkipMiddleware;