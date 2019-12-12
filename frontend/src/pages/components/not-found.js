import React, { PureComponent } from 'react';
// Styles
import './generic-page.css';

class NotFoud extends PureComponent {
    handleBackClick = () => {
        // this.props.history.goBack();
        this.props.history.go(-1);
    }
    handleForwardClick = () => {
        // this.props.history.goForward();
        this.props.history.go(1);
    }
    handleRandomClick = () => {
        const idRandom = Math.round(Math.random()*(10 - 1) + 1);
        this.props.history.push(`/videos?id=${idRandom}`, { id: idRandom });
    }
    render() {
        return (
            <div className="Page NotFoud">
                <h1>404</h1>
                <h3 className="SadFace">:'(</h3>
                <h2>No hemos encontrado la página que buscabas</h2>
                <button
                    className="Button"
                    onClick={this.handleForwardClick}
                >
                    Ir a la siguiente ruta 👉
                </button>
                <button
                    className="Button"
                    onClick={this.handleBackClick}
                >
                    Ir a la anterior ruta 👈
                </button>
                <button
                    className="Button"
                    onClick={this.handleRandomClick}
                >
                    Video randmo 🔱
                </button>
            </div>
        )
    }
}

export default NotFoud;