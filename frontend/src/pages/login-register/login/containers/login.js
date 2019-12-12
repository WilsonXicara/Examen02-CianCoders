import React, { Component } from 'react';
// Component
import LoginForm from '../components/login-form';
// React Redux
import { connect } from 'react-redux';
// Actions creator
import * as actions_account from '../../../../actions/user-account';
import { bindActionCreators } from 'redux';
import { statusCode, statusInfo } from '../../../../codes/status-api';
import { GOOGLE_FORMS_USER_TOKEN, api } from 'api';

class LoginContainer extends Component {
    state = {
        // Estos nombres son similares al de la propiedad 'name' de los inputs
        email: '',
        password: '',
        statusCode: '',
        statusInfo: '',
        user: {},
        isLogin: false
    }
    UNSAFE_componentWillMount() {
        if (!api.getToken()) {
            window.location.assign('/account/login');
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const newState = {
            ...this.state,
            statusCode: nextProps.statusCode,
            statusInfo: nextProps.statusInfo
        }
        if (newState.statusCode != statusCode.STATUS_OK) {
            switch(newState.statusInfo) {
                case statusInfo.BAD_REQUEST:
                    newState.statusInfo = 'CREDENCIALES NO VÁLIDAS. VUELVA A INTENTARLO';
                    break;
                case statusInfo.SERVER_ERROR:
                    newState.statusInfo = 'ERROR EN EL SERVIDOR. INTENTE MÁS TARDE';
                    break;
                default:
                    newState.statusInfo = 'ERROR NO CONTEMPLADO. VUELVA A INTENTARLO';
                    break;
            }
            newState.isLogin = false;
            window.location.assign('/account/login');
        } else {
            newState.isLogin = true;
            window.location.assign('/');
        }
        this.setState(newState);
    }
    handleSubmit = event => {
        event.preventDefault();
        // Se realiza el Login con los valores proporcionados por el usuario
        this.props.actions.login(this.state.email, this.state.password);
        console.log('estado:', this.state);
    }
    setInputRef = element => {
        // @Pendiente. Por ahora, no he encontrado algún uso para esta acción
    }
    handleInputChange = event => {
        // Actualiza los valores de email y password proporcionados por el usuario
        const newState = {...this.state};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }
    render() {
        return (
            <LoginForm
                handleSubmit={this.handleSubmit}
                setRef={this.setInputRef}
                handleChange={this.handleInputChange}
                value={this.state.value}
            />
        )
    }
}

function mapStateToProps(state, props) {
    // Se mapean los props para adecuarse a la estructura del state
    const objResponse = state.get('users').toJS()
    return {
        statusCode: objResponse.statusCode,
        statusInfo: objResponse.statusInfo,
        user: objResponse.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions_account, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);