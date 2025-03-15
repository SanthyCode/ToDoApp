# TodoApp

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Development server

Ejecuta `ng serve` para iniciar un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si modificas alguno de los archivos fuente.

# Info About the App
Página creada como To-Do List para poder clonar y correr este proyecto. Como ya se mencionó anteriormente, es importante instalar `Angular v16` con el comando en consola `npm install -g @angular/cli@16` y contar con la última versión de Node `v22.14.0`. Una vez clonado el proyecto, se instalan las dependencias a través de `npm install` y se ejecuta con ng serve, como anteriormente se mencionó.

Cuenta con una arquitectura sencilla. Dentro de la carpeta `src` tenemos `app` y, a su vez, el componente `to-do`, donde se encuentra el HTML, SASS y TS del proyecto completo.

Al no contar con una API, decidí guardar las tareas en el LocalStorage para que, en caso de cerrar o actualizar la página, la información no desaparezca y se pueda seguir trabajando con esta.