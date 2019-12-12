import express from 'express';
import React from 'react';
import { StaticRouter } from 'react-router';
// import App from './pages/containers/app';
import App from '../dist/ssr/app';
import reactDOMServer from 'react-dom/server';

// Creando la aplicación de Express
const app = express();


// Para que reaccione a las acciones del Usuario
app.get('*', (request, response) => {
    const html = reactDOMServer.renderToString(
        <StaticRouter
            location={request.url}
            context={{
                name: 'Wilson'
            }}
        >
            <App />
        </StaticRouter>
    );
    // const html = reactDOMServer.renderToString(<h1>HOLA MUNDO</h1>);
    console.log('HTML:', html);
    response.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <!-- <link rel="stylesheet" href="dist/css/home.c268b13f1f3bc881a5f9.css"> -->
            <title>React Router</title>
        </head>
        <body>
            <div id="home-container">${html}</div>
            <div id="modal-container"></div>
            
            <!--
                Esta configuración requiere que el servidor de desarrollo esté activo.
                El servidor de desarrollo tiene accesso al CSS de desarrollo, por lo que no es necesario importarlo desde aquí.
            -->
            <!-- <script src="http://localhost:9000/js/app.js"></script> -->
            <!-- <script src="dist/js/home.c268b13f1f3bc881a5f9.js"></script> -->
        </body>
        </html>
    `);
    // response.write("Hello World!!!!");
    response.end();
});

// Puerto en que se levantará el servidor
app.listen(3000);

console.log('Servidor activo');