# Usar la imagen base de Amazon Corretto para Java 21
FROM amazoncorretto:21

# Copiar el archivo JAR del backend a la imagen
COPY target/api-0.0.1-SNAPSHOT.jar /app.jar

# Exponer el puerto 8080 para que la aplicación sea accesible
EXPOSE 8080

# Definir la variable de entorno BASE_URL_ORIGINS
ENV BASE_URL_ORIGINS=http://localhost:3001

# Comando para ejecutar el archivo JAR
ENTRYPOINT ["java", "-jar", "/app.jar"]
