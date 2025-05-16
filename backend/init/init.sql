-- TABLA EJEMPLO

-- Crear tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Insertar un dato
INSERT INTO usuarios (nombre, email) VALUES ('Juan Perez', 'juan.perez@example.com');
