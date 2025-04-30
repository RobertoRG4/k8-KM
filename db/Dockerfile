# Usamos la imagen oficial de MySQL 9.0
FROM mysql:9.0

# Permitimos explícitamente contraseña vacía para root
# (inseguro: solo para desarrollo/pruebas)
ENV MYSQL_ALLOW_EMPTY_PASSWORD=1

# Directorio donde el entrypoint busca scripts .sql para inicializar la BBDD
WORKDIR /docker-entrypoint-initdb.d

# Copiamos tu script de inicialización
COPY init.sql ./

# Exponemos el puerto por defecto de MySQL
EXPOSE 3306

# No es necesario redefinir CMD, la imagen base ya ejecuta mysqld
