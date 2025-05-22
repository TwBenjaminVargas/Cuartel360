const authService = require('../service/auth.service')
const authMiddleware = (requiredRole = null) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'];
            const tokenPayload = await authService.validateToken(authHeader);

            if (requiredRole !== null && tokenPayload.id_rol !== requiredRole)
                return res.status(403).send('Acceso denegado');

            next();
        } catch (error) {
            // problemas con los tokens
            console.log(error);
            return res.status(401).sendFile(path.join(__dirname, '../../frontend/views/index.html'));;
        }
    };
};

module.exports = authMiddleware;