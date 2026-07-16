# Agenda Médica

Sistema web para la gestión de citas médicas y recordatorios de medicamentos, desarrollado como
proyecto del curso **Tópicos de Ingeniería de Sistemas** — Universidad Nacional Santiago Antúnez
de Mayolo (Facultad de Ingeniería de Sistemas e Informática, Huaraz – Perú).

## Objetivo

Facilitar la organización de citas médicas y la administración de medicamentos mediante una
interfaz sencilla e intuitiva, generando recordatorios oportunos que ayuden a reducir el olvido
de consultas y dosis de tratamiento.

## Stack tecnológico

| Capa | Tecnología |
| --- | --- |
| Frontend | React + Vite + TypeScript |
| Backend | Node.js + Express |
| Base de datos | PostgreSQL |
| ORM | Drizzle ORM |
| Gestor de paquetes / monorepo | pnpm workspaces |

## Estructura del repositorio

```
agenda-medica/
├── apps/
│   ├── client/     # Frontend React (Vite + TypeScript)
│   └── server/     # Backend Express + Drizzle ORM
├── packages/
│   └── shared/     # Tipos TypeScript compartidos (Cita, Medicamento, Recordatorio)
├── docker-compose.yml   # PostgreSQL para desarrollo local
└── pnpm-workspace.yaml
```

## Módulos funcionales

- **Citas médicas**: registrar, editar, eliminar y consultar citas (fecha, hora, descripción).
- **Medicamentos**: registrar, editar, eliminar y consultar medicamentos (nombre, horario,
  frecuencia, observaciones).
- **Recordatorios**: panel que unifica próximas citas y medicamentos en una línea de tiempo,
  favoreciendo la adherencia al tratamiento.

La API expone operaciones REST estándar (`GET`, `POST`, `PUT`, `DELETE`) sobre `/api/citas`,
`/api/medicamentos` y `/api/recordatorios`.

## Requisitos previos

- Node.js 18 o superior
- pnpm 9 (`npm install -g pnpm`)
- Docker (opcional, para levantar PostgreSQL rápidamente)

## Puesta en marcha

1. Instalar dependencias del monorepo:

   ```bash
   pnpm install
   ```

2. Levantar PostgreSQL (opción rápida con Docker):

   ```bash
   docker compose up -d
   ```

3. Configurar variables de entorno del backend:

   ```bash
   cp apps/server/.env.example apps/server/.env
   ```

4. Generar y aplicar las migraciones de la base de datos:

   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

5. Iniciar el backend y el frontend en paralelo:

   ```bash
   pnpm dev
   ```

   - API disponible en `http://localhost:4000`
   - Aplicación web disponible en `http://localhost:5173`

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Inicia frontend y backend en modo desarrollo |
| `pnpm build` | Compila `shared`, `server` y `client` |
| `pnpm db:generate` | Genera migraciones de Drizzle a partir del esquema |
| `pnpm db:migrate` | Aplica las migraciones pendientes a PostgreSQL |
| `pnpm db:studio` | Abre Drizzle Studio para inspeccionar la base de datos |

## Modelo de datos (simplificado)

**Cita**: `id`, `fecha`, `hora`, `descripcion`, `createdAt`

**Medicamento**: `id`, `nombre`, `horario`, `frecuencia`, `observaciones`, `createdAt`

## Empaquetado como aplicación Android (APK)

El cliente web se empaqueta como app Android mediante **Capacitor**, ya configurado en
`apps/client/capacitor.config.ts` y con la plataforma `apps/client/android` incluida en el repo.

### Opción A — Release automático en GitHub (recomendado)

El workflow [`Release APK`](.github/workflows/release-apk.yml) compila el proyecto y publica un
`.apk` como **GitHub Release**:

- Automático: al crear y subir un tag con formato `vX.Y.Z` (ej. `git tag v1.0.0 && git push origin v1.0.0`).
- Manual: desde la pestaña **Actions** del repositorio → *Release APK* → *Run workflow*.

El APK resultante queda disponible en la sección **Releases** del repositorio.

### Opción B — Generar el APK localmente

```bash
cd apps/client
pnpm build              # genera dist/
npx cap sync android     # copia los assets web al proyecto Android
cd android
./gradlew assembleDebug  # genera app/build/outputs/apk/debug/app-debug.apk
```

Requiere JDK 17 y el Android SDK (o Android Studio) instalados localmente. El APK generado con
`assembleDebug` no está firmado para producción; para una versión firmada de Play Store, configura
`assembleRelease` con tu propio keystore.

## Trabajo futuro

De acuerdo con las recomendaciones del informe del proyecto:

- Autenticación de usuarios mediante cuentas propias.
- Notificaciones push para dispositivos móviles.
- Sincronización con Google Calendar.
- Historial de consultas médicas.
- Almacenamiento en la nube y versión móvil nativa.

## Licencia

Proyecto académico de código abierto, disponible para fines educativos.
