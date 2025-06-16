const { Bombero } = require('../models'); // base de datos
const { Op } = require('sequelize');


module.exports =
{
    /**
     *  Busca bomberos por apellido
     * @param apellido solicitado
     * @return arreglo con coincidencias
     */
    searchBombero: async (term) => {
        const bomberos = await Bombero.findAll({
            where: {apellido: { [Op.iLike]: `%${term}%` }},
            attributes: ['nombre', 'apellido', 'email'],
            limit: 10
        });
        return bomberos;
    }
}