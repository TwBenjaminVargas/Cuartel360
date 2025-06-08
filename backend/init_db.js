const { Cuartel, Rol, Bombero, Guardia, Estado, Tarea, InventarioPersonal, Elemento } = require('./models');
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
      where: { email: 'usuario1@bomberos.com' },
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

    await Bombero.findOrCreate({
      where: { email: 'usuario2@bomberos.com' },
      defaults: {
        contraseña: await encryptService.encriptar('87654321'),
        dni: 87654331,
        nombre: 'Antonella',
        apellido: 'Badami',
        rango: 'Cabo',
        id_cuartel: cuartel.id_cuartel,
        id_rol: rolUsuario.id_rol,
        id_superior: adminBombero.id_bombero
      }
    });
    await Bombero.findOrCreate({
      where: { email: 'usuario3@bomberos.com' },
      defaults: {
        contraseña: await encryptService.encriptar('87654321'),
        dni: 87652321,
        nombre: 'Benjamin',
        apellido: 'Vargas',
        rango: 'Bombero',
        id_cuartel: cuartel.id_cuartel,
        id_rol: rolUsuario.id_rol,
        id_superior: adminBombero.id_bombero
      }
    });

    await Bombero.findOrCreate({
      where: { email: 'usuario4@bomberos.com' },
      defaults: {
        contraseña: await encryptService.encriptar('87654321'),
        dni: 87754321,
        nombre: 'Pedro',
        apellido: 'Pascal',
        rango: 'Bombero',
        id_cuartel: cuartel.id_cuartel,
        id_rol: rolUsuario.id_rol,
        id_superior: adminBombero.id_bombero
      }
    });

    await Bombero.findOrCreate({
      where: { email: 'usuario5@bomberos.com' },
      defaults: {
        contraseña: await encryptService.encriptar('87654321'),
        dni: 87554321,
        nombre: 'Angelina',
        apellido: 'Jolie',
        rango: 'Bombero',
        id_cuartel: cuartel.id_cuartel,
        id_rol: rolUsuario.id_rol,
        id_superior: adminBombero.id_bombero
      }
    });

    await Bombero.findOrCreate({
      where: { email: 'usuario4@bomberos.com' },
      defaults: {
        contraseña: await encryptService.encriptar('87654321'),
        dni: 88654321,
        nombre: 'Brad',
        apellido: 'Pitt',
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

    await Tarea.create(
    {
      id_bombero: usuarioBombero.id_bombero,
      descripcion: 'Limpiar Camion',
      estado: 0
    });

    await Tarea.create(
    {
      id_bombero: usuarioBombero.id_bombero,
      descripcion: 'Ordenar sector estructural',
      estado: 0
    });
    
    await Tarea.create(
    {
      id_bombero: usuarioBombero.id_bombero,
      descripcion: 'Alimentar perros K-9',
      estado: 0
    });

        await Tarea.create(
    {
      id_bombero: usuarioBombero.id_bombero,
      descripcion: 'Limpieza movil 13',
      estado: 0
    });

    await Tarea.create(
    {
      id_bombero: usuarioBombero.id_bombero,
      descripcion: 'Descontaminacion de trajes estructurales',
      estado: 0
    });

    await Tarea.create(
    {
      id_bombero: usuarioBombero.id_bombero,
      descripcion: 'Reunion cuerpo activo',
      estado: 0
    });
    //estado
    await Estado.create(
    {
      nombre : 'Sano'
    });
    await Estado.create(
    {
      nombre : 'Dañado'
    });
    await Estado.create(
    {
      nombre : 'Contaminado'
    });
    await Estado.create(
    {
      nombre : 'Perdido'
    });
    await Estado.create(
    {
      nombre : 'Mantenimiento'
    });

    //elemento
    const elemento = await Elemento.create(
    {
      nombre : 'Casco',
      descripcion:'EPP para cabeza'
    });

    await Elemento.create(
    {
      nombre : 'Chaqueton Estructural',
      descripcion:'EPP'
    });

    await Elemento.create(
    {
      nombre : 'Pantalon Estructural',
      descripcion:'EPP'
    });
    await Elemento.create(
    {
      nombre : 'Monja Estructural',
      descripcion:'EPP'
    });
    await Elemento.create(
    {
      nombre : 'Botiquin Primeros Aux.',
      descripcion:'Salud personal y atención primaria de victimas'
    });

    //inventario
    const inventario = await InventarioPersonal.create(
    {
      id_bombero: usuarioBombero.id_bombero,
      id_cuartel: 1,
      id_estado : 1,
      id_elemento : 1,
    });
    await InventarioPersonal.create(
    {
      id_bombero: usuarioBombero.id_bombero,
      id_cuartel: 1,
      id_estado : 1,
      id_elemento : 2,
    });
    
    await InventarioPersonal.create(
    {
      id_bombero: usuarioBombero.id_bombero,
      id_cuartel: 1,
      id_estado : 1,
      id_elemento : 3,
    });

    await InventarioPersonal.create(
    {
      id_bombero: usuarioBombero.id_bombero,
      id_cuartel: 1,
      id_estado : 1,
      id_elemento : 4,
    });

    await InventarioPersonal.create(
    {
      id_bombero: usuarioBombero.id_bombero,
      id_cuartel: 1,
      id_estado : 1,
      id_elemento : 5,
    });
    // guardia
    await Guardia.create(
    {
          start:new Date(2025, 5, 10, 7, 0, 0),
          end:new Date(2025, 5, 10, 14, 0, 0),
          id_bombero: usuarioBombero.id_bombero
      });

    await Guardia.create(
    {
          start:new Date(2025, 5, 10, 14, 0, 0),
          end:new Date(2025, 5, 10, 21, 0, 0),
          id_bombero: 3
      });

    console.log('Datos de prueba cargados correctamente.');
    process.exit();
  } catch (error) {
    console.error('Error al inicializar los datos:', error);
    process.exit(1);
  }
}
initData();

