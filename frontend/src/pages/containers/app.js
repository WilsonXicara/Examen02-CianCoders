import React, { Fragment, Component } from 'react';
// Components
import Header from '../components/header';
import NotFound from '../components/not-found';
import MyFormsContainer from '../admin/forms/containers/my-forms';
import FormEditorContainer from '../admin/forms/containers/form-editor';
import AnswerFormContainer from '../profile/containers/answer-form-container';
import ParticipantsFormContainer from '../admin/forms/containers/participants-form-container';
import ResultsFormContainer from '../admin/forms/containers/results-form-container';
// User account
import LoginContainer from '../login-register/login/containers/login';
// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// Reducers
import reducer from '../../reducers/index';
import { Map as map } from 'immutable';
// Middlewares
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
// Async middleware
import thunk from 'redux-thunk';
// React Router
import { Route, Switch, Redirect } from 'react-router-dom';
import GOOGLE_FORMS_USER_TOKEN from 'api';

const store = createStore(
    reducer,    // Reducer
    // Al manejar 'immutable' el estado se maneja como un mapa propio de 'immutable'
    map(),      // El estado inicial se inicializa en cada reducer
    composeWithDevTools(
        // Esta función aplica el middleware de las herramientas de desarrollo
        applyMiddleware(
            // Se proporcionan los demás Middleware como parámetro
            // logger,
            thunk
        )   // Convierte mi middleware en un enhancer
    )
);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Fragment>
                    {/* {
                        localStorage.getItem(GOOGLE_FORMS_USER_TOKEN) &&
                        <Header />
                    } */}
                    <Header />
                    <Switch>
                        <Route exact path="/account/login" component={LoginContainer} />
                        <Route exact path="/" component={MyFormsContainer} />
                        <Route exact path="/forms/mine/:codeForm" component={FormEditorContainer} />
                        <Route exact path="/forms/mine/:codeForm/participants" component={ParticipantsFormContainer} />
                        <Route exact path="/forms/mine/:codeForm/results" component={ResultsFormContainer} />
                        <Route exact path="/forms/answer" component={AnswerFormContainer} />
                        {/* <Redirect from="/v" to="/videos" /> */}
                        <Route component={NotFound} />
                    </Switch>
                </Fragment>
            </Provider>
        )
    }
}

export default App;