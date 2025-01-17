# Aplicación de Inventario

## Descripción

Esta aplicación es una plataforma para gestionar empresas, categorías y productos, proporcionando funcionalidades avanzadas como:
- Filtrar productos por categoría o empresa.
- Generar reportes en formato PDF.
- Paginación y personalización del número de filas por página.
- Soporte para administradores y usuarios.
- Interfaces responsivas y optimizadas para su uso.

---

## Tecnologías Utilizadas

- **Next.js**: Framework para React con renderizado del lado del servidor (SSR).
- **Zustand**: Manejo de estado para categorías, empresas y productos.
- **React Hook Form y Zod**: Validación y manejo de formularios.
- **React PDF**: Generación de reportes en formato PDF.
- **ShadCN UI**: Componentes UI preconfigurados.
- **Axios**: Realización de peticiones HTTP.
- **Tailwind CSS**: Diseño responsivo y estilizado.

---

## Características Principales

### 1. **Empresas**
- Crear, actualizar, deshabilitar y listar empresas.
- Roles definidos: Admin (acceso completo) y Usuario (acceso limitado).

### 2. **Inventario**
- Filtrar productos por empresa o categoría.
- Descarga de reportes en PDF.
- Paginación y selección de filas por página.

### 3. **Autenticación**
- Verificación de JWT en el middleware.
- Redirección automática basada en el rol del usuario.

### 4. **Responsive Design**
- Diseño responsivo que asegura una buena experiencia en diferentes dispositivos.

---

## Configuración Inicial

1. Clonar el repositorio:
   ```bash
   git clone <repositorio-url>
   ```
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Configurar las variables de entorno en un archivo `.env`:
   ```env
   JWT_SECRET=<clave-en-base64>
   API_BASE_URL=<url-base-de-la-api>
   ```
4. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

---

## Oportunidades de Mejora

### 1. **Pruebas Automatizadas**
- **Playwright**: Implementar pruebas de extremo a extremo para garantizar la funcionalidad de las rutas y formularios.

### 2. **Manejo de Estado Avanzado**
- **TanStack Query**: Mejorar el manejo de datos de la API con caché, sincronización y revalidación automática.

### 3. **Diseño Responsivo**
- Mejorar la experiencia en dispositivos móviles para formularios complejos y tablas con datos largos (scroll horizontal).

### 4. **Internacionalización (i18n)**
- Implementar soporte multilingüe utilizando `next-i18next` o `react-i18next`.

### 5. **Gestor de Roles**
- Crear un gestor más avanzado para asignación dinámica de roles y permisos.

---

## Estructura del Proyecto

```plaintext
/src
  /app
    /empresas
    /inventario
    /login
  /components
    ComboboxFiltro.tsx
    ProductosTable.tsx
  /context
    dialogsEmpresasProvider.tsx
  /services
    categorias-service.ts
    productos-categorias-service.ts
    productos.ts
  /store
    categoriasStore.ts
    empresasStore.ts
    inventarioStore.ts
```

---

## Autor
Este proyecto fue desarrollado como un sistema de gestión modular y escalable.

Si tienes alguna pregunta o sugerencia, por favor crea un *issue* o un *pull request*. ¡Gracias! 🎉

