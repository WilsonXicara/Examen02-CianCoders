import React, { Component } from 'react';
// Component
import RegularError from '../components/regular-error';

class HandleError extends Component {
    state = {
        handleError: false,
    }
    componentDidCatch(error, info) {
        // Envía este error a un servicio como Sentry
        this.setState({
            handleError: true,
        });
    }
    render() {
        if (this.state.handleError) {
            // El componente no debería manejar la UI, pero esto queda a modo de ejemplo
            return (
                <RegularError />
            )
        }
        // Si todo está bien, retorna los hijos del componente
        return this.props.children;
    }
}

export default HandleError;