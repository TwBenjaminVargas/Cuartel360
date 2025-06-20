const authService = require('../service/auth.service')

const authMiddleware = (rol) => {
    return async (req, res, next) => {
        try 
        {
            let tokenPayload = req.usuario;
            if(!tokenPayload)
            {
                const token = req.cookies.token;
                tokenPayload = await authService.validateToken(token);
                req.usuario = tokenPayload;
            }

            if(rol != 3 && tokenPayload.rol != rol)
                    return res.status(401).json({ error: 'Rol no autorizado' });
            next();
        }
        catch (error)
        {
            // problemas con los tokens
            console.log('Middleware detecto: ',error.message);
            return res.redirect('/');
        }
    };
};



module.exports = authMiddleware;