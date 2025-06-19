const authService = require('../service/auth.service')

const authMiddleware = (rol) => {
    return async (req, res, next) => {
        try 
        {
            const token = req.cookies.token;
            const tokenPayload = await authService.validateToken(token);
            if(tokenPayload.rol > rol)
                return res.status(401).json({ error: 'Rol no autorizado' });
            req.usuario = tokenPayload;
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