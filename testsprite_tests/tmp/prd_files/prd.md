# PRD – Academia de Natación (Swimming Academy Management System)

## Overview
A full-stack web application to manage a swimming academy. Built with Angular 20 (frontend) and Laravel 13 (backend API). Authentication is handled locally via Laravel Sanctum (Bearer token).

## Users
- **Admin**: single role, has full access to all CRUD features after login.

## Authentication
- Login page at `/login` with email + password fields.
- Credentials: admin@academia.com / admin123
- On success: token stored in localStorage, redirect to `/dashboard`.
- All other routes are protected by AuthGuard; unauthenticated users are redirected to `/login`.
- Logout button in topbar clears token and redirects to `/login`.

## Features

### 1. Dashboard (`/dashboard`)
- Displays 4 stat cards: total students, total instructors, total classes, total active enrollments.
- Quick-access navigation links to all sections via sidebar.

### 2. Students (`/estudiantes`)
- List with search by name/email, pagination.
- Create (`/estudiantes/nuevo`): fields: nombre (required), fecha_nacimiento (required), telefono, email.
- Edit (`/estudiantes/editar/:id`): pre-filled form.
- Delete: confirm dialog before deleting.

### 3. Instructors (`/instructores`)
- List with search by name, pagination.
- Create (`/instructores/nuevo`): fields: nombre (required), especialidad, email.
- Edit (`/instructores/editar/:id`): pre-filled form.
- Delete: confirm dialog before deleting.

### 4. Classes (`/clases`)
- List showing name, level badge, instructor name, capacity.
- Create (`/clases/nuevo`): fields: nombre_clase (required), id_nivel (required, dropdown), id_instructor (required, dropdown), cupo (required, 1–50).
- Edit (`/clases/editar/:id`): pre-filled form.
- Delete: confirm dialog.

### 5. Enrollments (`/inscripciones`)
- List with filter by estado (Activo / Suspendido / Baja), pagination.
- Create (`/inscripciones/nueva`): select student, select class, fecha_inscripcion, estado.
- Inline status change via dropdown in the list.
- Delete: confirm dialog.

### 6. Payments (`/pagos`)
- List with filter by estado (Pagado / Pendiente / Vencido), shows student name, amount, method, date.
- Create (`/pagos/nuevo`): select enrollment, monto (required), fecha_pago, metodo_pago (Efectivo/Tarjeta/Transferencia), estado.
- Delete: confirm dialog.

### 7. Attendance (`/asistencias`)
- List with filter by date, shows student name, class, date, attendance status (Si/No).
- Create (`/asistencias/nueva`): select active enrollment, fecha_clase (required), asistio (Si/No radio).
- Delete: confirm dialog.

## Tech Stack
- Frontend: Angular 20, Bootstrap 5, Bootstrap Icons, Reactive Forms
- Backend API: Laravel 13, MySQL, Sanctum
- API base URL: http://localhost:8000/api
- Frontend runs on: http://localhost:4200
