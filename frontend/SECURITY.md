# 🔐 Seguridad de Tokens

## Almacenamiento de Tokens: Cookies vs LocalStorage

### ❌ LocalStorage (Menos Seguro)

**Vulnerabilidades:**

- **XSS (Cross-Site Scripting)**: Cualquier script malicioso puede acceder
- **No se limpia automáticamente**: Persiste indefinidamente
- **Accesible desde cualquier script**: `localStorage.getItem('token')`

```javascript
// ❌ Vulnerable a XSS
localStorage.setItem("access_token", token);
// Un script malicioso puede robar el token:
const stolen = localStorage.getItem("access_token");
```

### ✅ Cookies (Más Seguro)

**Ventajas:**

- **SameSite**: Protección contra CSRF
- **Secure flag**: Solo HTTPS en producción
- **Expiración automática**: Se elimina cuando expira
- **Path restriction**: Solo accesible en rutas específicas

```javascript
// ✅ Más seguro con flags de seguridad
document.cookie = `access_token=${token}; SameSite=Strict; Secure; path=/`;
```

### 🏆 HttpOnly Cookies (Máxima Seguridad)

**La mejor opción** - Requiere configuración en el backend:

```javascript
// Backend (NestJS)
response.cookie("access_token", token, {
  httpOnly: true, // ✅ No accesible desde JavaScript
  secure: true, // ✅ Solo HTTPS
  sameSite: "strict", // ✅ Protección CSRF
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
});
```

**Ventajas:**

- ✅ **Inmune a XSS**: JavaScript no puede leerla
- ✅ **Enviada automáticamente**: En cada request al mismo dominio
- ✅ **No requiere código cliente**: El navegador la maneja

## Implementación Actual

### 📍 Estado Actual: Cookies con JavaScript

Por ahora usamos **cookies con JavaScript** porque:

1. ✅ Más seguro que localStorage
2. ✅ Compatible con el middleware de Next.js
3. ✅ Fácil de implementar sin cambios en backend
4. ⚠️ Todavía accesible desde JavaScript (vulnerable a XSS)

### Archivos modificados:

- `lib/utils/cookies.ts` - Utilidades para manejo de cookies
- `lib/store/authStore.ts` - Store usa cookies en lugar de localStorage
- `lib/api/client.ts` - Cliente API lee tokens de cookies
- `middleware.ts` - Middleware lee tokens de cookies

### 🎯 Próxima Mejora: HttpOnly Cookies

Para máxima seguridad, implementar en el backend:

```typescript
// backend/src/core/auth/auth.controller.ts
@Post('login')
async login(
  @Body() loginDto: LoginDto,
  @Res({ passthrough: true }) response: Response
) {
  const { access_token, user } = await this.authService.login(loginDto);

  // Guardar en cookie HttpOnly
  response.cookie('access_token', access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
  });

  // No devolver el token en el body
  return { user };
}
```

## Comparación de Seguridad

| Característica         | localStorage | Cookies JS | HttpOnly Cookies |
| ---------------------- | ------------ | ---------- | ---------------- |
| Protección XSS         | ❌           | ⚠️         | ✅               |
| Protección CSRF        | ❌           | ✅         | ✅               |
| Automático en requests | ❌           | ✅         | ✅               |
| Expiración automática  | ❌           | ✅         | ✅               |
| Implementación         | Fácil        | Media      | Compleja         |
| Seguridad              | Baja         | Media      | Alta             |

## Recomendaciones

### Para Desarrollo:

✅ **Cookies con JavaScript** (implementación actual)

- Suficiente para desarrollo
- Fácil de debuggear
- Compatible con DevTools

### Para Producción:

✅ **HttpOnly Cookies**

- Modificar backend para set cookies
- Remover token del response body
- Usar HTTPS siempre
- Configurar CORS correctamente

### Configuración Adicional:

```typescript
// frontend/next.config.ts
module.exports = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};
```

## Prevención de XSS

Además del almacenamiento seguro:

1. **Sanitizar inputs**: Nunca confiar en datos del usuario
2. **CSP Headers**: Content Security Policy
3. **Validar en backend**: Nunca solo en frontend
4. **Escapar HTML**: Usar librerías como DOMPurify
5. **Actualizar dependencias**: Mantener paquetes al día

```typescript
// Ejemplo de sanitización
import DOMPurify from "dompurify";

const clean = DOMPurify.sanitize(userInput);
```

## Checklist de Seguridad

- [x] Tokens en cookies (no localStorage)
- [x] SameSite=Strict
- [x] Secure flag en producción
- [x] Expiración de 7 días
- [ ] HttpOnly cookies (requiere backend)
- [ ] HTTPS en producción
- [ ] CSP Headers
- [ ] Rate limiting
- [ ] Input sanitization

## Referencias

- [OWASP - XSS Prevention](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/01-Testing_for_Reflected_Cross_Site_Scripting)
- [OWASP - CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [MDN - HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
