import React, { Fragment } from 'react';
import { render } from 'react-dom'; // Esta importación es posible gracias a la habilidad de desestructuración de JavaScript
// Components
import App from '../pages/containers/app';
// React Router
import { BrowserRouter } from 'react-router-dom';

render(
    // High order component. Heredan cosas a los componentes hijos
    <BrowserRouter
        basename="/"
    >
        <App></App>
    </BrowserRouter>,
    document.getElementById('app-container')
);