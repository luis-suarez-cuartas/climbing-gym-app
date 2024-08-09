@echo off
REM Activar entorno virtual
call .\env\Scripts\activate

REM Navegar al directorio frontend\myapp
cd frontend
cd myapp

REM Iniciar la aplicación frontend
npm start

REM Mantener la ventana abierta después de ejecutar npm start
pause
