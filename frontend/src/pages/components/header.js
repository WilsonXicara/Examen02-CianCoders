import React, { Component } from 'react';
import './header.css';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../images/logo.png';
// Agregando un High Order Component
import { withRouter } from 'react-router';

class Header extends Component {
    handleBackClick = () => {
        this.props.history.go(-1);
    }
    handleForwardClick = () => {
        this.props.history.go(1);
    }
    handleRandomClick = () => {
        const idRandom = Math.round(Math.random()*(10 - 1) + 1);
        this.props.history.push(`/videos?id=${idRandom}`, { id: idRandom });
    }
    render() {
        return (
            <header className="Header">
                <nav>
                    <ul>
                        <li>
                            <NavLink exact to="/" activeClassName="is-selected">
                                Mis formularios
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/forms/answer" activeClassName="is-selected">
                                Responder
                            </NavLink>
                        </li>
                        <li>
                            <a onClick={this.handleBackClick}
                               title="Go to Back"
                            >
                                👈
                            </a>
                        </li>
                        <li>
                            <a onClick={this.handleForwardClick}
                               title="Go to Forward"
                            >
                                👉
                            </a>
                        </li>
                        <li>
                            <a onClick={this.handleRandomClick}
                               title="Go to Random video"
                            >
                                🔱
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}

// Entre las funcionalidades, hereda el historial de navegación a este componente
export default withRouter(Header);