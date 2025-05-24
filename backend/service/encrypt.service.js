const bcrypt = require  ('bcrypt');
const SALT_ROUNDS = 10; // A mayor numero mas segura pero mas lento

module.exports =
{
/**
 * Encripta la contraseña con bcrypt
 * @param {string} contraseña en texto plano
 * @returns {string} hash contraseña
 */
  encriptar: async (contraseña) => {
    return await bcrypt.hash(contraseña ,SALT_ROUNDS);
  },
  /**
 * Desencripta y compara contraseña ingresada con verdadera
 * @param {string} contraseña en texto plano
 * @param {string} hash correspondiente
 * @returns {boolean} true si es igual, false si no
 */
  controlContraseña: async (contraseña, hash) => {
    return await bcrypt.compare(contraseña, hash);
}
}