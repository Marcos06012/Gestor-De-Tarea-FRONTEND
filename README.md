### Gestor de Tareas-FRONTEND
Aplicación desarrollada con React.js para gestionar tareas personales. Permite registrarse, iniciar sesión, crear, editar, eliminar y marcar tareas como completadas, con autenticación mediante JWT.

### Instalación

### Requisitos previos
- Node.js v18+
- MySQL
- npm
---
### Tecnologías utilizadas
- React.js (Vite)
- Axios (para las peticiones HTTP)
- React Router DOM (para navegación)
- Tailwind CSS (para estilos)
- jwt-decode (para validar tokens JWT)
--- 
### Instalación y ejecución
1. Clonar el repositorio
   ```
   git clone <https://github.com/Marcos06012/Gestor-De-Tarea.git> cd <CARPETA_DEL_FRONTEND>
   ```
 2. Instalar dependencias
    ```
     npm install
    ```
4. Configurar conexión con el backend
   
   Abrimos el archivo: ``` src/pages/api/AxiosConfig.js``` y verificamos que la URL del backend sea correcta ``` const API = axios.create({ baseURL: "http://localhost:3001", });```

6. Ejecutar la aplicación
    ```npm run dev``` y abrimos en el navegador: ```http://localhost:5173```
---

 ### Funcionalidades principales
- Registro e inicio de sesión con JWT
- Creación de tareas
- Edición y eliminación de tareas
- Marcado de tareas completadas
- Protección de rutas con ProtectedRoute
- Diseño adaptable con Tailwind CSS
---
### Usuario de prueba 
Correo Electronico: marcos@test.com Contraseña: 12345 
- Puede registrar un nuevo usuario donde dice "Registrate"
---
### Dependencias principales 
| Paquete          | Versión (aprox.) | Uso                          |
| ---------------- | ---------------- | ---------------------------- |
| react            | ^18              | Librería base                |
| react-router-dom | ^6               | Navegación entre páginas     |
| axios            | ^1               | Peticiones HTTP              |
| jwt-decode       | ^4               | Decodificación de tokens JWT |
| tailwindcss      | ^3               | Estilos CSS                  |

---
### Desarrollador 
Proyecto creado por Marcos Alas como parte del sistema de gestión de tareas con autenticación.
