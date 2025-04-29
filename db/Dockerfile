# Usamos la imagen oficial de MySQL
FROM mysql:8.0

# Establecemos el directorio de trabajo dentro de la imagen
WORKDIR /docker-entrypoint-initdb.d/

# Copiamos el archivo SQL que contiene las instrucciones para crear la base de datos y tablas
COPY db/init.sql .

# Exponemos el puerto de MySQL
EXPOSE 3306

# Ejecutamos MySQL con las configuraciones predeterminadas
CMD ["mysqld"]

