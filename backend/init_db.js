const {Cuartel,Rol,Bombero} = require('./models');
async function initData() {
  try {
    // Crear cuartel (si no existe)
    const [cuartel] = await Cuartel.findOrCreate({
      where: { numero: 113 },
      defaults: {
        nombre: 'Asociación Bomberos Voluntarios de La Granja',
        email: 'contacto@bomberoslagranja.com',
        telefono: 3511234567,
        localidad: 'La Granja',
        provincia: 'Córdoba'
      }
    });

    // Crear roles (admin y usuario)
    const [rolAdmin] = await Rol.findOrCreate({
      where: { nombre: 'admin' }
    });

    const [rolUsuario] = await Rol.findOrCreate({
      where: { nombre: 'usuario' }
    });

    // Crear bomberos
    const [adminBombero] = await Bombero.findOrCreate({
      where: { email: 'admin@bomberos.com' },
      defaults: {
        contraseña: '12345678',
        dni: 12345678,
        nombre: 'Juan Admin',
        rango: 'Sargento',
        id_cuartel: cuartel.id_cuartel,
        id_rol: rolAdmin.id_rol
      }
    });

    const [usuarioBombero] = await Bombero.findOrCreate({
      where: { email: 'usuario@bomberos.com' },
      defaults: {
        contraseña: '87654321',
        dni: 87654321,
        nombre: 'Pedro Usuario',
        rango: 'Bombero',
        id_cuartel: cuartel.id_cuartel,
        id_rol: rolUsuario.id_rol,
        id_superior: adminBombero.id_bombero
      }
    });

    console.log('Datos de prueba cargados correctamente.');
    process.exit();
  } catch (error) {
    console.error('Error al inicializar los datos:', error);
    process.exit(1);
  }
}
initData();
