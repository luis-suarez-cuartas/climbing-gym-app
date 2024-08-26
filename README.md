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


Crear un entorno virtual y activar:

```bash
python -m venv env
source env/bin/activate  # En Windows: env\Scripts\activate
```

Instalar dependencias:
```bash
pip install -r requirements.txt
```

Configurar las variables de entorno en un archivo .env:

```bash
DJANGO_SECRET_KEY=tu-clave-secreta
DATABASE_URL=mysql://usuario:contraseña@localhost:3306/tu_base_de_datos
```

Aplicar migraciones y ejecutar el servidor de desarrollo:

```bash
python manage.py migrate
python manage.py runserver
```


### Configuración del Frontend

Navegar al directorio del frontend y ejecutar:

```bash
cd frontend/myapp
npm install
npm start
```

## Despliegue
Este proyecto está configurado para ser desplegado en plataformas como Heroku. A continuación, se detallan los pasos para un despliegue en Heroku:

Crear una aplicación en Heroku:

```bash
heroku create nombre-de-tu-aplicacion
```

Establecer las variables de entorno en Heroku:

```bash
heroku config:set DJANGO_SECRET_KEY=tu-clave-secreta
heroku config:set DATABASE_URL=mysql://usuario:contraseña@servidor/db
```

Realizar el despliegue:

```bash
git push heroku main
Heroku ejecutará los scripts definidos en el package.json y desplegará tanto el frontend como el backend.
```


## Control de Versiones

Este proyecto sigue la metodología Git Flow para la gestión del ciclo de vida del software. Las principales ramas utilizadas son:

main: Contiene la versión estable y en producción de la aplicación.
develop: Rama principal para el desarrollo activo.
feature/*: Ramas dedicadas para el desarrollo de nuevas funcionalidades.
hotfix/*: Ramas utilizadas para corregir errores críticos en producción.
release/*: Ramas utilizadas para preparar una nueva versión estable.

### Ramas Actuales
main: Rama principal para producción.
develop: Rama principal para el desarrollo continuo.
feature/authentication: Desarrollo de la autenticación de usuarios.
feature/training: Desarrollo de la gestión de entrenamientos.
feature/publication: Desarrollo de la gestión de publicaciones.
feature/ranking: Desarrollo de la gestión de clasificaciones.
hotfix/errorDespliegue: Corrección de un error crítico relacionado con el despliegue.
release/1.0.0: Preparación para el primer lanzamiento oficial.



## Tecnologías Utilizadas

Backend: Django 5.0.4, Django REST Framework, MySQL.
Frontend: React, Redux, Material-UI, Styled Components.
Control de Versiones: Git, GitHub.
Despliegue: Heroku, WhiteNoise.


## Colaboración
Las contribuciones son bienvenidas. Por favor, sigue los siguientes pasos para contribuir:

Crea un fork del proyecto.
Crea una nueva rama desde develop para tu feature (git checkout -b feature/tu-feature).
Realiza tus cambios y haz commit (git commit -m 'Añadir nueva feature').
Envía tus cambios (git push origin feature/tu-feature).
Abre un pull request en el repositorio original.

## Licencia
Este proyecto está licenciado bajo los términos de la Licencia MIT.