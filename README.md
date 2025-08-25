# EcoLATAM Backend

## ¿Qué es EcoLATAM?
EcoLATAM es una iniciativa latinoamericana que integra tecnología y responsabilidad ambiental para impulsar acciones sostenibles. Promueve la colaboración entre comunidades, empresas y entidades públicas con el fin de generar proyectos transparentes y socialmente justos.

## Descripción del API
Este repositorio implementa un API REST desarrollado con Node.js y Express que soporta las funcionalidades de la plataforma EcoLATAM. Proporciona endpoints para gestionar usuarios, negocios y reseñas, y utiliza JSON Web Tokens (JWT) para autenticar solicitudes. La información se almacena en una base de datos MySQL.

## Variables de entorno
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
PORT=<puerto_servidor>
JWT_SECRET=<secreto_jwt>
JWT_EXPIRES_IN=<duracion_jwt>
MYSQL_HOST=<host_mysql>
MYSQL_USER=<usuario_mysql>
MYSQL_PASSWORD=<password_mysql>
MYSQL_DB=<base_de_datos_mysql>
```

Estas variables definen el puerto del servidor, el secreto y la duración del token JWT, así como la configuración de la conexión a MySQL. `JWT_EXPIRES_IN` acepta cualquier valor soportado por `jsonwebtoken` (por defecto `1h`).

## Instalación y ejecución
1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
El API se ejecutará en `http://localhost:<PORT>`.

## Uso del API
### Autenticación
- `POST /api/auth/login`
  - **Cuerpo:** `{ "username": "usuario", "password": "clave" }`
  - **Respuesta:** `{ token, data, id }`
  - El token se utiliza para solicitudes autenticadas.

Incluye el token en la cabecera `Authorization` de las rutas protegidas:
```
Authorization: Bearer <token>
```

### Endpoints de ejemplo
- `GET /api/users` – Obtiene todos los usuarios (público).
- `PUT /api/users/:id` – Actualiza un usuario (requiere token en `Authorization`).
- `GET /api/businesses` – Lista los negocios registrados y verificados.
Consulta el código fuente para más módulos y rutas disponibles.

## Contribuir
Las contribuciones son bienvenidas. Abre un issue o envía un pull request. Procura que cualquier cambio esté documentado y, cuando sea posible, probado. Cualquier uso del código requiere autorización del autor.

## Licencia y uso
El código de este repositorio se publica únicamente con fines de transparencia. Todos los derechos reservados; su reproducción o distribución está prohibida sin consentimiento expreso.
