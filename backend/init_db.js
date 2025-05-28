const { Cuartel, Rol, Bombero, Guardia, Estado, Tarea } = require('./models');
const estado = require('./models/estado');
const encryptService = require('./service/encrypt.service');

const TURNOS = [
  { inicio: 7, fin: 14 },
  { inicio: 14, fin: 21 },
  { inicio: 21, fin: 7 }
];

function setHour(date, hour) {
  const newDate = new Date(date);
  newDate.setHours(hour, 0, 0, 0);
  return newDate;
}


async function initData() {
  try {
    // Crear cuartel (si no existe)
    const [cuartel] = await Cuartel.findOrCreate({
      where: { numero: 113 },
      defaults: {
        codigo: 6113,
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
        contraseña: await encryptService.encriptar('12345678'),
        dni: 12345678,
        nombre: 'Juan',
        apellido: 'Admin',
        rango: 'Sargento',
        id_cuartel: cuartel.id_cuartel,
        id_rol: rolAdmin.id_rol
      }
    });

    const [usuarioBombero] = await Bombero.findOrCreate({
      where: { email: 'usuario@bomberos.com' },
      defaults: {
        contraseña: await encryptService.encriptar('87654321'),
        dni: 87654321,
        nombre: 'Pedro',
        apellido: 'Usuario',
        rango: 'Bombero',
        id_cuartel: cuartel.id_cuartel,
        id_rol: rolUsuario.id_rol,
        id_superior: adminBombero.id_bombero
      }
    });

    //tareas
    const tarea1 = await Tarea.create(
    {
      id_bombero: usuarioBombero.id_bombero,
      descripcion: 'Revisar equipo de respiración',
      estado: 0
    });

    let fecha = new Date(2025, 0, 1); // 1 enero 2025, 00:00
    const fin = new Date(2025, 11, 31); // 31 diciembre 2025

    while (fecha <= fin) {
      for (const turno of TURNOS) {
        const start = setHour(fecha, turno.inicio);
        let end;

        if (turno.fin > turno.inicio) {
          end = setHour(fecha, turno.fin);
        } else {
          // Turno nocturno que cruza al día siguiente
          const diaSiguiente = new Date(fecha);
          diaSiguiente.setDate(diaSiguiente.getDate() + 1);
          end = setHour(diaSiguiente, turno.fin);
        }

        await Guardia.create({
          start,
          end,
          id_bombero: usuarioBombero.id_bombero
        });
      }
      // Avanzar al día siguiente para el próximo ciclo
      fecha.setDate(fecha.getDate() + 1);
    }

    console.log('Guardias continuas insertadas para todo el año 2025');

    console.log('Datos de prueba cargados correctamente.');
    process.exit();
  } catch (error) {
    console.error('Error al inicializar los datos:', error);
    process.exit(1);
  }
}
initData();

