## Crear imagen de la api en docker

Asegurate que estas en la siguiente ruta `K8-KM/api`

Importante antes de ejecutar el siguiente comando

```
mvn clean install
```

```
docker build -t spring-boot .
```

Iniciar el contenedor

```
docker run -d --name api-spring -p 8080:8080 spring-boot
```

## Crear imagen del frontend en docker

Asegurate que estas en la siguiente ruta `K8-KM/frontend`

```
docker build -t nextjs .
```

```
docker run -d --name frontend-app -p 3001:3000 nextjs

```
