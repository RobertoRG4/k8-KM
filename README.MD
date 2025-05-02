# 📦 k8-km

**k8-km** es una aplicación que integra **Java 21**, **Node.js v23.9.0**, **MySQL 9** y **Docker**. Su arquitectura está diseñada para ejecutarse fácilmente en entornos locales utilizando **Docker Compose** y **Kubernetes**.

## 🚀 Requisitos

Asegúrate de tener instalado lo siguiente en tu sistema:

- [Java 21](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html)
- [Node.js v23.9.0](https://nodejs.org/en/download)
- [MySQL 9](https://dev.mysql.com/downloads/mysql/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [kubectl (Kubernetes CLI)](https://kubernetes.io/docs/tasks/tools/)

## ⚙️ Despliegue con Docker y Kubernetes

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/k8-km.git
cd k8-km
```

### 2. Levanta los servicios con Docker Compose

Ubícate en la carpeta `k8s`:

```bash
cd k8s
docker-compose up -d
```

Esto iniciará los servicios necesarios, como la base de datos y la aplicación.

### 3. Despliega el stack de Kubernetes

Con los servicios corriendo, ejecuta:

```bash
kubectl apply -f .
```

> > Asegúrate de tener un clúster de Kubernetes activo (por ejemplo, usando Minikube o Docker Desktop con Kubernetes habilitado).

## 🛠 Tecnologías utilizadas

- **Java 21** – Lógica de negocio y servicios backend.
- **Node.js v23.9.0** – Herramientas de frontend o utilidades adicionales.
- **MySQL 9** – Base de datos relacional.
- **Docker & Kubernetes** – Contenerización y orquestación.

## 📂 Estructura del proyecto

```
k8-km/
├── backend/
├── frontend/
├── k8s/
│ ├── docker-compose.yml
│ └── *.yaml (manifiestos de Kubernetes)
└── README.md
```

## 📄 Licencia

Este proyecto está licenciado bajo la MIT License. Consulta el archivo `LICENSE` para más detalles.
