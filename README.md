# EcoLATAM Backend

## ¿Qué es EcoLATAM?

EcoLATAM es una iniciativa latinoamericana que integra tecnología y responsabilidad ambiental para impulsar acciones sostenibles. Promueve la colaboración entre comunidades, empresas y entidades públicas con el fin de generar proyectos transparentes y socialmente justos.

## Descripción del API

Este repositorio implementa un API REST desarrollado con Node.js y Express que soporta las funcionalidades de la plataforma EcoLATAM. Proporciona endpoints para gestionar usuarios, negocios y reseñas, y utiliza JSON Web Tokens (JWT) para autenticar solicitudes. La información se almacena en una base de datos MySQL.

Las rutas del API se cargan automáticamente desde `src/modules` y se montan bajo el prefijo `/api/v1`. Cada carpeta que contenga un archivo `routes.js` expone sus endpoints usando su nombre de carpeta como segmento de ruta.

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las variables necesarias para la ejecución:

```
PORT=3000                    # opcional, por defecto 3000
NODE_ENV=development         # obligatorio
JWT_SECRET=<secreto_jwt>     # obligatorio
JWT_EXPIRES_IN=1h            # opcional
JWT_ALGORITHM=HS256          # opcional, algoritmo de firma
JWT_AUDIENCE=<audiencia_jwt> # opcional
JWT_ISSUER=<emisor_jwt>      # opcional
MYSQL_HOST=<host_mysql>      # obligatorio
MYSQL_USER=<usuario_mysql>   # obligatorio
MYSQL_PASSWORD=<password_mysql> # requerido en producción
MYSQL_DB=<base_de_datos>     # obligatorio
CORS_ORIGIN=<origen1,origen2> # obligatorio
LOG_LEVEL=info               # obligatorio
LOG_EXTERNAL_URL=<url_logs>  # obligatorio
ALLOWED_TABLES=<tabla1,tabla2> # opcional
```

Las variables marcadas como **obligatorias** deben definirse; de lo contrario la aplicación no iniciará. `JWT_EXPIRES_IN` acepta cualquier valor soportado por `jsonwebtoken` y expira en `1h` si no se indica. `JWT_ALGORITHM` define el algoritmo de firma usado al emitir y validar tokens, y por defecto es `HS256`. Si se configuran `JWT_AUDIENCE` o `JWT_ISSUER`, los tokens incluirán y verificarán esos reclamos. `MYSQL_PASSWORD` solo es obligatorio cuando `NODE_ENV` es `production`. `CORS_ORIGIN` acepta una lista separada por comas de orígenes permitidos. `ALLOWED_TABLES` permite restringir las tablas accesibles; si no se define, se cargan todas las tablas existentes.

## Instalación y ejecución

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Inicia el servidor en producción:
   ```bash
   npm start
   ```
   El API se ejecutará en `http://localhost:<PORT>`.

## Scripts disponibles

- `npm test` ejecuta la suite de pruebas con Mocha.
- `npm run lint` analiza el código con ESLint.
- `npm run format` formatea los archivos con Prettier.

## Seguridad

Para proteger la aplicación se emplean middlewares de Express:

- **Helmet** establece encabezados HTTP seguros.
- **express-rate-limit** restringe a 100 solicitudes por IP cada 15 minutos.

## Registro y monitoreo

El sistema de logging usa [Winston](https://github.com/winstonjs/winston) con rotación diaria de archivos. Ajusta el nivel de detalle con la variable `LOG_LEVEL` y, si `LOG_EXTERNAL_URL` apunta a un endpoint HTTP válido, los registros también se envían a ese servicio.

### Consultas a la base de datos

La mayoría de las operaciones utilizan métodos parametrizados (`all`, `one`,
`create`, etc.) que validan la tabla y emplean placeholders. Evita usar el
método genérico `db.query`; si es necesario realizar una consulta manual,
primero valida los datos de entrada y usa siempre `?` o `??` para todos los
valores dinámicos. Las tablas permitidas se obtienen de la base de datos o se
pueden definir mediante la variable de entorno `ALLOWED_TABLES`.

## Uso del API

Todas las rutas se montan bajo el prefijo `/api/v1`. Los ejemplos siguientes ya incluyen dicho segmento.

### Autenticación

- `POST /api/v1/auth/login`
  - **Cuerpo:** `{ "username": "usuario", "password": "clave" }`
  - **Respuesta:** `{ token, data, id }`
  - El token se utiliza para solicitudes autenticadas.

Incluye el token en la cabecera `Authorization` de las rutas protegidas:

```
Authorization: Bearer <token>
```

### Endpoints de ejemplo

- `GET /api/v1/users` – Obtiene todos los usuarios (público).
- `PUT /api/v1/users/:id` – Actualiza un usuario (requiere token en `Authorization`).
- `GET /api/v1/businesses` – Lista los negocios registrados y verificados.
  Consulta el código fuente para más módulos y rutas disponibles.

### Paginación

Todos los endpoints que listan recursos aceptan parámetros de paginación opcionales `limit` y `offset`:

```
GET /recurso?limit=10&offset=20
```

- `limit` controla la cantidad máxima de elementos devueltos (por defecto `10`).
- `offset` indica desde qué registro iniciar (por defecto `0`).

Si no se envían estos parámetros, se aplican los valores por defecto. Esto permite navegar grandes colecciones de manera eficiente.

## Contribuir

Las contribuciones son bienvenidas. Abre un issue o envía un pull request. Procura que cualquier cambio esté documentado y, cuando sea posible, probado. Cualquier uso del código requiere autorización del autor.

## Licencia y uso

El código de este repositorio se publica únicamente con fines de transparencia. Todos los derechos reservados; su reproducción o distribución está prohibida sin consentimiento expreso.
