# atom-backend-challenge

Backend API para el challenge técnico de Atom — gestor de tareas con Express, TypeScript y Firebase.

---

## Decisiones de diseño

Este proyecto está estructurado de forma modular, inspirado en cómo NestJS organiza sus módulos y en cómo Angular separa responsabilidades por feature. La idea es que cualquier desarrollador que venga de ese ecosistema se sienta cómodo navegando el código.

Cada módulo (`user`, `task`) contiene su propio `model`, `repository`, `service` y `controller` — separación clara de responsabilidades sin agregar capas innecesarias. No es Clean Architecture puro, pero sí aplica sus principios donde aportan valor real.

### ¿Por qué esta estructura y no otra?

El challenge pedía DDD, repositorios y factories. En lugar de implementarlo de forma forzada con carpetas `domain/`, `application/` e `infrastructure/` considero que en un proyecto de este tamaño generan ruido, se optó por una arquitectura modular donde esos conceptos viven dentro de cada módulo de forma natural. El resultado es un proyecto más fácil de leer, mantener y escalar.

---

## Seguridad

- **CORS** configurado para permitir únicamente el origen del frontend. Si se despliega en otro dominio, se actualiza `ALLOWED_ORIGINS` en las variables de entorno.
- **Helmet** para asegurar los headers HTTP.
- **Rate limiting** global (100 requests / 15 min) y estricto en endpoints de autenticación (10 requests / 15 min) para evitar abuso.
- **Variables de entorno** para manejo de secretos. Nunca se versiona `.env` ni `serviceAccount.json` — solo `.env.example` como referencia.
- **JWT no implementado** de forma intencional: el flujo de autenticación es por email sin contraseña, por lo que un sistema de tokens completo sería overengineering para este caso. Si el proyecto escala a manejo de contraseñas, JWT sería el siguiente paso natural.

---

## Tecnologías

- Node.js 20
- Express
- TypeScript
- Firebase Admin SDK
- Firestore
- express-validator
- express-rate-limit
- Helmet
- dotenv

---

## Endpoints

### Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/users/:email` | Busca un usuario por email |
| POST | `/api/users` | Crea un nuevo usuario |

### Tareas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/tasks/user/:userId` | Obtiene todas las tareas de un usuario |
| POST | `/api/tasks` | Crea una nueva tarea |
| PUT | `/api/tasks/:taskId` | Actualiza una tarea existente |
| DELETE | `/api/tasks/:taskId` | Elimina una tarea |

---

## Configuración local

**1. Clona el repositorio**
```bash
git clone https://github.com/marvinseb/atom-backend-challenge.git
cd atom-backend-challenge
```

**2. Instala dependencias**
```bash
npm install
```

**3. Configura las variables de entorno**
```bash
cp .env.example .env
```

Edita `.env` con tus valores:
```
PORT=3001
ALLOWED_ORIGINS=http://localhost:4200
SERVICE_ACCOUNT_PATH=./serviceAccount.json
```

**4. Agrega el serviceAccount.json**

Descárgalo desde Firebase Console → Configuración del proyecto → Cuentas de servicio → Generar nueva clave privada. Colócalo en la raíz del proyecto.

**5. Levanta el servidor**
```bash
npm run dev
```

---

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto donde corre el servidor |
| `ALLOWED_ORIGINS` | Orígenes permitidos por CORS (separados por coma) |
| `SERVICE_ACCOUNT_PATH` | Path al serviceAccount.json de Firebase |

---

## Scripts

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia en modo desarrollo con nodemon |
| `npm run build` | Compila TypeScript a JavaScript |
| `npm start` | Inicia el servidor compilado |

---

## Autor

Marvin Seb