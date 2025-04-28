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

## Crear la imagen de prometheus

Asegurate que estas en la siguiente ruta `K8-KM/k8s/monitoring/prometheus`

```
docker run -d --name prometheus-metrics -p 9090:9090 -v $(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
```

## Prometheus deployment

```
docker run -d --name prometheus-metrics --network monitoring-net -p 9090:9090 \
  -v /c/Users/cds3h/Documents/k8-KM/k8s/monitoring/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus
```
