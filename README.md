# Multi-Company Template

Template para aplicación multi-empresa con autenticación JWT, gestión de usuarios y empresas.

## Stack Tecnológico

### Backend

- **NestJS** - Framework Node.js para APIs
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos
- **JWT + Passport** - Autenticación
- **Swagger** - Documentación API
- **bcrypt** - Hash de contraseñas

### Frontend

- **Next.js 15** - Framework React con App Router
- **React 19** - Biblioteca UI
- **PrimeReact** - Componentes UI
- **Tailwind CSS 4** - Estilos
- **Zustand** - State management
- **Axios** - Cliente HTTP
- **TypeScript** - Tipado estático

## Estructura del Proyecto

```
multi-company-template/
├── backend/                 # API NestJS
│   ├── prisma/
│   │   ├── schema.prisma   # Esquema de base de datos
│   │   └── migrations/     # Migraciones
│   ├── src/
│   │   ├── core/          # Módulos core
│   │   │   ├── auth/      # Autenticación JWT
│   │   │   ├── user/      # Gestión de usuarios
│   │   │   └── company/   # Gestión de empresas
│   │   ├── prisma/        # Servicio Prisma
│   │   └── main.ts        # Bootstrap
│   └── package.json
│
└── frontend/               # App Next.js
    ├── app/
    │   ├── (full-page)/   # Rutas públicas
    │   │   └── auth/      # Login/Register
    │   └── (main)/        # Rutas protegidas
    │       └── dashboard/ # Dashboard
    ├── components/
    │   ├── forms/         # Formularios
    │   └── providers/     # Providers React
    ├── lib/
    │   ├── api/          # Clientes API
    │   ├── hooks/        # Custom hooks
    │   └── store/        # Zustand stores
    ├── types/            # TypeScript types
    └── package.json
```

## Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd multi-company-template
```

### 2. Configurar Backend

```bash
cd backend

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Editar .env con tus configuraciones
# DATABASE_URL="postgresql://user:password@localhost:5432/multicompany_db"
# JWT_SECRET="your-secret-key"

# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# (Opcional) Seed inicial
npx prisma db seed
```

### 3. Configurar Frontend

```bash
cd ../frontend

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.local.example .env.local

# Editar .env.local
# NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Desarrollo

### Ejecutar Backend

```bash
cd backend
npm run start:dev
```

El servidor estará disponible en `http://localhost:4000`

**Swagger:** `http://localhost:4000/api`

### Ejecutar Frontend

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Características

### Autenticación

- ✅ Registro de usuarios con roles (admin, user, viewer)
- ✅ Login con JWT
- ✅ Protección de rutas con middleware
- ✅ Refresh automático de token
- ✅ Logout y limpieza de sesión

### Usuarios

- ✅ CRUD completo de usuarios
- ✅ Asignación a empresas con roles específicos
- ✅ Gestión de permisos por rol

### Empresas

- ✅ CRUD completo de empresas
- ✅ Código único por empresa
- ✅ Estado activo/inactivo
- ✅ Asignación de usuarios con roles

### Multi-Tenancy

- ✅ Usuarios pueden pertenecer a múltiples empresas
- ✅ Roles específicos por empresa
- ✅ Relación many-to-many con tabla intermedia

## Endpoints API

### Auth (`/auth`)

- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Iniciar sesión
- `GET /auth/profile` - Obtener perfil (protegido)
- `GET /auth/me` - Obtener usuario actual (protegido)

### Users (`/users`)

- `GET /users` - Listar usuarios
- `GET /users/:id` - Obtener usuario
- `POST /users` - Crear usuario
- `PATCH /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario
- `POST /users/:id/companies` - Asignar a empresa
- `DELETE /users/:id/companies/:companyId` - Remover de empresa
- `GET /users/:id/companies` - Empresas del usuario

### Companies (`/companies`)

- `GET /companies` - Listar empresas
- `GET /companies/active` - Listar empresas activas
- `GET /companies/:id` - Obtener empresa
- `POST /companies` - Crear empresa
- `PATCH /companies/:id` - Actualizar empresa
- `DELETE /companies/:id` - Eliminar empresa
- `POST /companies/:id/users` - Asignar usuario
- `DELETE /companies/:id/users/:userId` - Remover usuario
- `GET /companies/:id/users` - Usuarios de la empresa

## Base de Datos

### Modelos Prisma

**User**

- id (String, UUID)
- email (String, único)
- password (String)
- firstName (String)
- lastName (String)
- role (UserRole: admin, user, viewer)
- userCompanies (Relación)

**Company**

- id (String, UUID)
- name (String)
- code (String, único)
- active (Boolean)
- userCompanies (Relación)

**UserCompany** (Tabla intermedia)

- id (String, UUID)
- userId (String)
- companyId (String)
- role (UserRole)

## Scripts Útiles

### Backend

```bash
npm run start:dev        # Desarrollo con hot-reload
npm run build           # Build producción
npm run start:prod      # Ejecutar producción
npx prisma studio       # Interfaz visual BD
npx prisma migrate dev  # Nueva migración
npx prisma db seed      # Seed database
```

### Frontend

```bash
npm run dev            # Desarrollo
npm run build          # Build producción
npm run start          # Ejecutar build
npm run lint           # Ejecutar linter
```

## Variables de Entorno

### Backend (.env)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/db"
JWT_SECRET="your-secret-key"
JWT_EXPIRATION="7d"
PORT=4000
NODE_ENV="development"
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ JWT con expiración configurable
- ✅ Guards para proteger rutas
- ✅ CORS configurado
- ✅ Validación de DTOs con class-validator
- ✅ Sanitización automática con ValidationPipe

## Próximos Pasos

- [ ] Implementar refresh tokens
- [ ] Agregar rate limiting
- [ ] Implementar roles y permisos granulares
- [ ] Agregar paginación en listados
- [ ] Implementar filtros y búsqueda
- [ ] Tests unitarios y e2e
- [ ] Deploy a producción
- [ ] CI/CD pipeline

## Licencia

MIT
