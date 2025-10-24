# 🚀 Gestor de Tareas Full-Stack

Este es un proyecto completo de gestión de tareas desarrollado utilizando la arquitectura Full-Stack, con **Angular** en el Frontend y **Spring Boot** en el Backend.

La aplicación permite a los usuarios crear, leer, actualizar y eliminar (CRUD) tareas, demostrando una integración exitosa entre dos de los frameworks más populares para el desarrollo web moderno.

## 🛠️ Tecnologías Utilizadas

| Componente | Tecnología | Versión / Tipo | Descripción |
| :--- | :--- | :--- | :--- |
| **Frontend** | Angular | 17+ | Interfaz de usuario dinámica. |
| **Backend** | Spring Boot | 3.x | API RESTful que gestiona la lógica de negocio. |
| **Persistencia** | Spring Data JPA | - | Capa de acceso a datos y ORM. |
| **Base de Datos** | H2 Database | (Embedded) | Base de datos en memoria para el desarrollo y pruebas. |
| **Build Tool** | Maven (mgn) | - | Gestión de dependencias y compilación del Backend. |

---

## 📋 Estructura del Proyecto

El proyecto está dividido en dos carpetas principales:

1.  **`frontend/`**: Contiene la aplicación Angular.
    * **`tarea.ts`**: Modelo de datos de la tarea.
    * **`tarea.service.ts`**: Lógica de comunicación HTTP con la API de Spring Boot.
    * **`app.componentes/`**: Vistas y lógica del lado del cliente.
2.  **`backend-spring/`**: Contiene la API REST de Spring Boot.
    * **`Tarea.java`**: Entidad JPA para el modelo de datos.
    * **`TareaRepository.java`**: Interfaz de Spring Data para el acceso a la base de datos.
    * **`TareaController.java`**: Controlador REST que define los endpoints `/api/tareas`.

---

## ⚙️ Configuración y Ejecución Local

Para levantar la aplicación completa, sigue estos dos pasos en dos terminales separadas.

### 1. Iniciar el Backend (Spring Boot)

El backend expone la API en el puerto `8082`.

1.  Abre la primera terminal y navega a la carpeta del backend:
    ```bash
    cd backend-spring
    ```
2.  Ejecuta la aplicación Spring Boot con Maven:
    ```bash
    mvn spring-boot:run
    ```
    *(Espera hasta ver el mensaje: "Tomcat started on port 8082")*

### 2. Iniciar el Frontend (Angular)

El frontend se conecta al backend en `8082` y corre en el puerto `4200`.

1.  Abre la segunda terminal y navega a la carpeta del frontend:
    ```bash
    cd frontend
    ```
2.  Ejecuta el servidor de desarrollo de Angular:
    ```bash
    ng serve
    ```

### 3. Acceder a la Aplicación

Una vez que ambos servidores estén activos, abre tu navegador y accede a:

[http://localhost:4200](http://localhost:4200)

---

## 💡 Endpoints de la API (Backend)

Todos los endpoints se encuentran bajo la ruta base `http://localhost:8082/api/tareas`.

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/tareas` | Obtiene la lista completa de tareas. |
| `GET` | `/api/tareas/{id}` | Obtiene una tarea por su ID. |
| `POST` | `/api/tareas` | Crea una nueva tarea (Body: Tarea JSON). |
| `PUT` | `/api/tareas/{id}` | Actualiza una tarea existente. |
| `DELETE`| `/api/tareas/{id}` | Elimina una tarea por su ID. |

*(Nota: Se implementó la configuración **CORS** en el `TareaController.java` para permitir peticiones desde el origen `http://localhost:4200`)*.