@echo off
REM Activar entorno virtual
call .\env\Scripts\activate

REM Navegar al directorio backend
cd backend

REM Iniciar el servidor de Django
python manage.py runserver

REM Mantener la ventana abierta después de ejecutar el servidor
pause
