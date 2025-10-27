# 🏗️ Estructura de Rutas - Multi-Company Platform

## 📁 Nueva Arquitectura

La aplicación ahora está organizada en **3 niveles principales**:

```
frontend/app/
├── page.tsx                           # 🌐 Landing Page Pública
├── layout.tsx                         # Root Layout
├── (auth)/                            # 🔐 Grupo: Autenticación
│   ├── login/page.tsx                # Inicio de sesión
│   └── register/page.tsx             # Registro de usuarios
│
├── (admin)/                           # 👨‍💼 Grupo: Dashboard Administrativo
│   ├── layout.tsx                    # Layout con navbar admin
│   ├── dashboard/page.tsx            # Dashboard principal + selector empresas
│   ├── users/                        # Gestión de usuarios (futuro)
│   └── companies/                    # Gestión de empresas (futuro)
│
└── (app)/                             # 🏢 Grupo: Aplicación Multi-Empresa
    └── [companyCode]/                # Ruta dinámica por empresa
        ├── layout.tsx                # Layout específico de empresa
        ├── page.tsx                  # Dashboard de la empresa
        ├── sales/                    # Módulo de ventas (futuro)
        ├── inventory/                # Módulo de inventario (futuro)
        ├── reports/                  # Módulo de reportes (futuro)
        └── settings/                 # Configuración (futuro)
```

## 🎯 Flujo de Navegación

### 1. **Landing Page** (`/`)

- ✅ Página pública accesible sin autenticación
- ✅ Información del producto
- ✅ Botones de Login y Registro
- ✅ Features y CTA sections

**Redirección:** Si el usuario está autenticado y visita `/`, permanece en la landing page.

### 2. **Autenticación** (`/auth/*`)

- `/auth/login` - Inicio de sesión
- `/auth/register` - Registro de nuevos usuarios

**Redirección:** Si el usuario ya está autenticado, se redirige a `/admin/dashboard`.

### 3. **Dashboard Administrativo** (`/admin/*`)

Área para **gestión global** de la plataforma:

#### `/admin/dashboard`

- Vista general del sistema
- **Selector de empresas**: Cards clickeables que redirigen a la app de cada empresa
- Métricas globales (usuarios, empresas)
- Información de la cuenta

#### Futuras rutas:

- `/admin/users` - CRUD de usuarios
- `/admin/companies` - CRUD de empresas
- `/admin/settings` - Configuración global

**Protección:** Requiere autenticación. Middleware verifica token en cookies.

### 4. **Aplicación por Empresa** (`/[companyCode]/*`)

Cada empresa tiene su **propia aplicación aislada** con:

#### `/{companyCode}` - Dashboard de Empresa

- Métricas específicas de la empresa
- Actividad reciente
- Gráficas de ventas
- Accesos rápidos a módulos

#### Módulos de Negocio (futuro):

**Ventas:**

- `/{companyCode}/sales/orders` - Pedidos
- `/{companyCode}/sales/customers` - Clientes
- `/{companyCode}/sales/invoices` - Facturas

**Inventario:**

- `/{companyCode}/inventory/products` - Productos
- `/{companyCode}/inventory/warehouses` - Almacenes
- `/{companyCode}/inventory/stock` - Control de stock

**Reportes:**

- `/{companyCode}/reports` - Reportes y analytics

**Configuración:**

- `/{companyCode}/settings` - Configuración de la empresa

**Características:**

- ✅ Ruta dinámica basada en `company.code`
- ✅ Layout con sidebar específico
- ✅ Navegación contextual por empresa
- ✅ Botón para volver al admin dashboard

## 🔒 Protección de Rutas

### Middleware (`middleware.ts`)

```typescript
Rutas Públicas:
- /
- /auth/login
- /auth/register

Rutas Protegidas (requieren token):
- /admin/*
- /{companyCode}/*
```

**Lógica:**

1. ✅ Si no hay token → Redirige a `/auth/login`
2. ✅ Si hay token en `/auth/*` → Redirige a `/admin/dashboard`
3. ✅ Si ruta dinámica sin token → Redirige a login con `?redirect`

### Layouts de Protección

**Admin Layout** (`app/(admin)/layout.tsx`):

- Verifica `isAuthenticated` con `useAuth()`
- Muestra spinner mientras carga
- Redirige si no está autenticado

**Company Layout** (`app/(app)/[companyCode]/layout.tsx`):

- Verifica autenticación
- Carga información de la empresa por código
- Redirige al admin si la empresa no existe
- Sidebar con módulos específicos

## 🎨 Características por Nivel

### Landing Page

- ✅ Hero section con CTA
- ✅ Features grid (6 características)
- ✅ CTA section
- ✅ Footer completo
- ✅ Navbar con botones de auth

### Admin Dashboard

- ✅ Navbar con navegación global
- ✅ Cards de métricas
- ✅ **Selector visual de empresas**
- ✅ Información de cuenta
- ✅ Avatar de usuario

### Company App

- ✅ Header con nombre y código de empresa
- ✅ Sidebar desktop/mobile con menú contextual
- ✅ Dashboard con métricas específicas
- ✅ Gráficas de actividad
- ✅ Actividad reciente
- ✅ Accesos rápidos
- ✅ Botón para volver al admin

## 📊 Ejemplo de Uso

### Escenario: Usuario con 3 empresas

1. **Login** → `/auth/login`

   - Usuario ingresa credenciales
   - Redirige a `/admin/dashboard`

2. **Selector de Empresas** → `/admin/dashboard`

   ```
   ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
   │ Acme Corp       │ │ TechStart Inc   │ │ MegaSales LLC   │
   │ Código: ACME    │ │ Código: TECH    │ │ Código: MEGA    │
   │ [Acceder →]     │ │ [Acceder →]     │ │ [Acceder →]     │
   └─────────────────┘ └─────────────────┘ └─────────────────┘
   ```

3. **Click en "Acme Corp"** → `/acme`

   - Carga dashboard de Acme Corp
   - Sidebar con módulos de Acme
   - Datos aislados de Acme

4. **Navegación en Acme** → `/acme/sales/orders`

   - Ver pedidos de Acme Corp
   - Layout se mantiene

5. **Volver al Admin** → Botón "Admin" en header

   - Redirige a `/admin/dashboard`
   - Puede seleccionar otra empresa

6. **Cambiar a TechStart** → `/tech`
   - Nueva aplicación con datos de TechStart
   - Mismo layout, diferente contexto

## 🔄 Comparación: Antes vs Ahora

### Antes

```
❌ Solo un dashboard global
❌ No hay separación por empresa
❌ Landing page básico
❌ Rutas planas
```

### Ahora

```
✅ Landing page profesional
✅ Dashboard admin para gestión global
✅ App independiente por empresa
✅ Rutas dinámicas con [companyCode]
✅ Layouts específicos por contexto
✅ Multi-tenancy real
```

## 🚀 Próximos Pasos

### Módulos por Implementar

**Admin:**

- [ ] `/admin/users` - CRUD usuarios con tabla
- [ ] `/admin/companies` - CRUD empresas
- [ ] `/admin/reports` - Reportes globales
- [ ] `/admin/settings` - Configuración global

**Company App:**

- [ ] `/{code}/sales/*` - Módulo de ventas completo
- [ ] `/{code}/inventory/*` - Gestión de inventario
- [ ] `/{code}/reports` - Reportes de la empresa
- [ ] `/{code}/settings` - Configuración de empresa

### Mejoras Técnicas

- [ ] Validar permisos por empresa (UserCompany role)
- [ ] Cache de información de empresa
- [ ] Breadcrumbs en navegación
- [ ] Búsqueda global por empresa
- [ ] Notificaciones por empresa
- [ ] Theme customization por empresa

## 📝 Notas de Desarrollo

### Agregar Nuevo Módulo a una Empresa

1. Crear ruta en `app/(app)/[companyCode]/[modulo]/page.tsx`
2. Agregar item al menú en `layout.tsx`
3. Implementar lógica de negocio
4. Actualizar tipos si es necesario

**Ejemplo:**

```typescript
// app/(app)/[companyCode]/invoices/page.tsx
export default function InvoicesPage() {
  const params = useParams();
  const companyCode = params.companyCode;

  // Cargar facturas de esta empresa específica
  // ...
}
```

### Verificar Acceso a Empresa

El layout de empresa ya valida:

- ✅ Usuario autenticado
- ✅ Empresa existe
- ✅ Código de empresa válido

**Futuro:** Validar que el usuario tenga acceso a esa empresa específica mediante UserCompany.

## 🎯 Resumen

La nueva estructura permite:

1. **Separación clara de responsabilidades**

   - Landing → Marketing
   - Admin → Gestión global
   - Company App → Operaciones por empresa

2. **Escalabilidad**

   - Fácil agregar nuevos módulos
   - Cada empresa independiente
   - Código reutilizable

3. **UX Mejorada**

   - Navegación intuitiva
   - Contexto claro (en qué empresa estás)
   - Acceso rápido entre empresas

4. **Multi-Tenancy Real**
   - Datos aislados por empresa
   - Configuración independiente
   - Módulos personalizables por empresa
