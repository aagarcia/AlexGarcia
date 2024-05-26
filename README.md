# Prueba Angular Devsu - Alex García Arias

Prueba de Angular para la empresa Devsu para aplicar al cargo de Angular Developer

## Resumen de lo realizado

Se realizo todo el tema de crud en Angular de lo indicado en el requerimiento. Solo se quedo pendiente el tema de test unitarios y la paginación de la tabla.

## Elementos utilizados

- [Angular 16](https://angular.io/)
- [Typescript 5](https://www.typescriptlang.org/)
- El codigo esta en el repositorio de GitHub [AlexGarcia](https://github.com/aagarcia/AlexGarcia)

## Comentarios

Al utilizar el servicio que enviaron para la prueba, se encontro que no esta habilitado el tema de **CORS**. Donde lo habilite para poder realizar las peticiones HTTP. Que esta en el archivo main.ts.

    // Crea la configuración de CORS
    const corsOptions = {
        origin: 'http://localhost:4200', // Permitir solicitudes solo desde este origen
        optionsSuccessStatus: 200 
    };

    // creates express app, registers all controller routes and returns you express app instance
    const app = createExpressServer({
        cors: corsOptions, // Configura CORS
        routePrefix: "/bp", 

        controllers: [
            __dirname + "/controllers/*{.js,.ts}",
        ], // we specify controllers we want to use
    });


## Instalación

    npm install

## Ejecución

    ng serve -o
