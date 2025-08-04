# Cuartel 360

<p align="center">
  <img src="frontend/public/img/Logo2.png" alt="Logo Cuartel 360" width="400" />
</p>

Gestión básica de un cuartel de bomberos: calendario de guardias, lista de tareas e inventario.

---

## 💡 Descripción

Cuartel 360 es una aplicación web diseñada para simplificar las operaciones internas de un cuartel de bomberos. Permite al **Jefe del Cuartel** (administrador) y a los **Bomberos** (usuarios comunes) gestionar:

* 📅 **Calendario de guardias**: Programación, edición y consulta de turnos.
* ✅ **Lista de tareas**: Asignación y seguimiento de actividades diarias.
* 📦 **Inventario**: Control de equipos y materiales.

---

## 🛠 Tecnologías
* **Front-end**:
  * HTML + CSS
  * Bootstrap
  * Javascript
  * fullcalendar
    
* **Back‑end**:

  * Node.js + Express
  * Sequelize (ORM)
  * PostgreSQL (contenedorizado con Docker)

* **Autenticación y seguridad**:

  * JWT (JSON Web Tokens)
  * bcrypt (hash de contraseñas)

* **Contenedores**:

  * Docker & docker-compose para la base de datos PostgreSQL

---

## 📂 Estructura de carpetas backend

```plain
backend/
├── middlewares/      # JWT, validaciones
├── models/           # Definición de entidades Sequelize
├── routes/           # Rutas Express
├── services/         # Lógica de negocio
├── docker-compose.yml# Servicio de PostgreSQL
├── db.js             # Configuraciones base de datos
├── jwt               # Exportacion de variables de entorno para jwt
├── init_db.js        # Inicializacion de bases de datos
├── sync_db.js        # Sincronizacion de configuracion de bases de datos
└── app.js          # Punto de entrada del servidor 
```
## 📂 Estructura de carpetas front end

```plain
frontend/
├── public/              # Archivos estáticos (HTML, favicon, etc.)
├── js/                  # Código front
├── views/               # Archivos HTML principales (vistas) 
```

---

## 🚀 Instalación y puesta en marcha

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/TwBenjaminVargas/Cuartel360.git
   cd Cuartel360
   ```

2. **Configurar variables de entorno**

   * Crear `.env` y ajustar:

     ```env
     PORT=3000
     DB_USER=postgres
     DB_PASSWORD=tu_contraseña
     DB_NAME=cuartel360
     DB_HOST=localhost
     JWT_SECRET=tu_secreto_jwt
     JWT_EXPIRES_IN = tiempo_expiracion
     ```

3. **Instalar dependencias**

   ```bash
   npm install
   ```

4. **Levantar la base de datos con Docker**

   ```bash
   docker-compose up -d
   ```

   Inicia un contenedor de PostgreSQL según `config/docker-compose.yml`.

5. **Incializa base de datos**

   ```bash
   node sync_db.js
   node init_db.js
   ```

6. **Iniciar el servidor**

   ```bash
   node app.js
   ```

   Accede en `http://localhost:3000`.
   El gestor de Bases de datos estara en: `http://localhost:8080`.

---

## 🔒 Autenticación

* **Administrador (Jefe del Cuartel)**: Crear, editar y eliminar guardias, tareas e inventario.
* **Bombero (Usuario común)**: Consultar y actualizar sus propias asignaciones.
* Todas las rutas protegidas requieren un token JWT válido.

---

## ✨ Funcionalidades destacadas

* Generación y verificación de tokens con expiración configurable.
* Hash seguro de contraseñas con bcrypt.
* Contenedorización de PostgreSQL para despliegue sencillo.

---

## 👩‍💻 Autoría

* **Antonella Badami** – [cbadami845@alumnos.iua.edu.ar](mailto:cbadami845@alumnos.iua.edu.ar)
* **Benjamin Vargas** – [bvargas161@alumnos.iua.edu.ar](mailto:bvargas161@alumnos.iua.edu.ar)

---

> Si encuentras un problema o tienes sugerencias, no dudes en contactarnos!
