# Sistema de Acogimiento Familiar (SAF)
## Aplicaciones Web Avanzadas con Angular 20 / Proyecto Individual

---

### Identidad del Proyecto
- **Nombre del sistema:** SAF – Sistema de Acogimiento Familiar  
- **Versión:** 1.0.0  
- **Duración del desarrollo:** 2025  
- **Tecnologías:** Angular 20, TypeScript, AdminLTE 3 | Panel de control, JWT  
- **Backend asociado:** Spring Boot / API REST (Java + PostgreSQL)  

---

## Objetivo General
Construir una aplicación web moderna que gestione el **proceso de acogimiento familiar**, permitiendo registrar, consultar y administrar **infantes, familias acogedoras, profesionales y expedientes sociales**, bajo un modelo seguro, modular y escalable con **Angular 20**.

---

## Flujo de la Aplicación SAF

flowchart LR
  L["Login JWT"] --> D["Dashboard principal"]
  D --> I["Gestión de Infantes"]
  D --> F["Gestión de Familias Acogedoras"]
  D --> P["Gestión de Profesionales"]
  D --> E["Gestión de Expedientes Sociales"]
  D --> S["Seguimientos y Reportes"]
  D --> C["Configuración del Sistema"]

---

## ⚙️ Estructura Base del Proyecto

src/
├─ main.ts
├─ app/
│  ├─ app.routes.ts
│  ├─ core/
│  │  ├─ models/              # Interfaces y DTOs
│  │  ├─ services/            # Servicios REST y controladores de API
│  │  ├─ auth/                # AuthGuard, Interceptores y TokenService
│  │  └─ http/                # Interceptores de error y autenticación
│  ├─ shared/
│  │  ├─ components/          # Componentes reutilizables (tablas, modales, toasts)
│  │  ├─ ui/                  # Elementos visuales comunes
│  │  └─ utils/               # Funciones de apoyo y constantes
│  └─ features/
│     ├─ auth/                # Login / logout / recuperación
│     ├─ dashboard/           # Layout principal
│     ├─ infantes/            # CRUD completo de infantes
│     ├─ familias/            # CRUD de familias acogedoras
│     ├─ profesionales/       # Registro y control de profesionales
│     ├─ expedientes/         # Módulo de expedientes sociales
│     └─ seguimientos/        # Seguimientos sociales y reportes
└─ styles.scss

---

## Flujo de Autenticación

sequenceDiagram
  participant U as Usuario
  participant A as Angular SAF
  participant API as Backend SAF
  participant J as JWT Core

  U->>A: Login (usuario, contraseña)
  A->>API: POST /auth/login
  API-->>A: accessToken + refreshToken + roles
  A->>A: Guarda sesión (AuthStore + LocalStorage)
  A->>API: GET /infantes (Bearer Token)
  API-->>A: Retorna datos protegidos
  Note over A,J: Si el token expira → Refresh automático + reintento

---

## Comandos de Desarrollo

# Instalar dependencias
npm install

# Servir aplicación localmente
ng serve

# Compilar para producción
ng build --configuration production

# Ejecutar pruebas
ng test

# Linter
npm run lint
