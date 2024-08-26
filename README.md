# climbing-gym-app

Climbing Gym App es una aplicación integral de gestión de gimnasios de escalada. Esta aplicación proporciona funcionalidades para la gestión de usuarios, sesiones de entrenamiento, publicaciones, rankings y más.

## Tabla de Contenidos
- [Descripción General](#descripción-general)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Despliegue](#despliegue)
- [Control de Versiones](#control-de-versiones)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Colaboración](#colaboración)
- [Licencia](#licencia)

## Descripción General
El Climbing Gym App es una solución completa para la gestión de gimnasios de escalada, permitiendo a los administradores y usuarios gestionar entrenamientos, publicaciones, clasificaciones y más a través de una interfaz amigable. Este sistema está dividido en dos componentes principales: backend (Django) y frontend (React).

## Estructura del Proyecto
El proyecto está organizado en dos secciones principales:

### Backend

**Django Framework**: El backend está desarrollado en Django 5.0.4 y proporciona las APIs necesarias para todas las funcionalidades de la aplicación.

**Estructura de Carpetas:**
- `authentication/`: Módulo para la gestión de usuarios y autenticación.
- `training/`: Módulo para la gestión de sesiones de entrenamiento.
- `publication/`: Módulo para la gestión de publicaciones y comentarios.
- `ranking/`: Módulo para la gestión de clasificaciones de usuarios.
- `myproject/`: Configuraciones principales del proyecto, incluyendo `settings.py`, `urls.py`, etc.

### Frontend

**React**: El frontend está desarrollado utilizando React con soporte de bibliotecas adicionales como Redux, MUI, y styled-components.

**Estructura de Carpetas:**
- `src/`: Contiene todos los componentes, servicios, hooks, y vistas de la aplicación.
- `public/`: Contiene recursos estáticos como imágenes y el archivo `index.html`.

## Instalación y Configuración

### Requisitos Previos
- **Python 3.8+**: Requerido para ejecutar el backend.
- **Node.js 14+**: Requerido para ejecutar el frontend.
- **MySQL**: Utilizado como base de datos en el entorno de producción.

### Configuración del Backend

Clonar el repositorio y navegar al directorio del backend:

```bash
git clone https://github.com/tu-usuario/climbing-gym-app.git
cd climbing-gym-app/backend
```