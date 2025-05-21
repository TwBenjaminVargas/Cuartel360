-- Se ejecuta unicamente al cargar por primera vez el contenedor docker, de lo contrario reiniciar el volumnen com docker-compose down -v
-- OBSOLETO desde 20/05/25, ahora se utilizan modelos de sequalize
create table cuarteles(
id_cuartel serial primary key,
nombre varchar(60) not null,
numero int not null,
email varchar(100) unique not null,
telefono bigint not null,
localidad varchar(100) not null,
provincia varchar(100) not null
);

create table bomberos(
id_bombero serial primary key,
id_superior integer references bomberos(id_bombero),
id_cuartel integer references cuarteles(id_cuartel),
email varchar(100) unique not null,
contraseña varchar(60) not null, -- contraseña cifrada en bcrypt
dni bigint unique not null,
nombre varchar(60) not null,
rango varchar(60) not null
);

create table tareas(
id_tarea serial primary key,
id_bombero integer references bomberos(id_bombero),
descripcion text not null, -- hasta 1GB de texto
estado int not null -- 0 no hecha, 1 hecha
);

create table estados(
id_estado serial primary key,
nombre varchar(50) unique not null
);

create table elementos(
id_elemento serial primary key,
nombre varchar(50) not null,
descripcion text
);

create table inventario_personal(
id_inventario serial primary key,
id_bombero integer references bomberos(id_bombero),
id_elemento integer references elementos(id_elemento),
id_estado integer references estados(id_estado)
);

create table guardias(
id_guardia serial primary key,
id_bombero integer references bomberos(id_bombero),
fecha_inicio date,
fecha_fin date,
hora_inicio time,
hora_fin time
);


-- DATOS DE PRUEBA
insert into cuarteles 
values
(
default,
'Asociacion Bomberos Voluntarios La Granja',
113,
'bvlagranja@gmail.com',
3543543232,
'La Granja',
'Cordoba'
);

-- usuario administrador
insert into bomberos 
values
(
default,
null, -- no tiene superior
1, -- id de cuartel (solo hay uno)
'adminbombero@gmail.com',
123, -- TO-DO Encriptar contraseña
00000000,
'admin',
'sargento'
);

-- usuario comun
insert into bomberos 
values
(
default,
1, -- tiene superior
1, -- id de cuartel (solo hay uno)
'bombero@gmail.com',
123, -- TO-DO Encriptar contraseña
00000001,
'usuario comun',
'bombero'
);

-- tarea
insert into tareas 
values
(
default,
null, -- nadie asignado
'Limpiar mascaras E.R.A',
0
);

-- estado de elementos
insert into estados 
values
(
default,
'sucio'
);

insert into estados 
values
(
default,
'dañado'
);

insert into elementos 
values
(
default,
'Casco cola de pato',
'EPP proteccion personal'
);

-- insertar un elemento de inventario
insert into inventario_personal 
values
(
default,
2,
1,
1
);

-- insertar una guardia
insert into guardias 
values
(
default,
2,
'2025-05-17',
'2025-05-17',
'14:00:00',
'21:00:00'
);