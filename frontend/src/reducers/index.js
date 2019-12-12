import listMyForms from './my-forms';
import userAcountReducers from './user_account';
// Redux Immutable
//     De esta forma, es definitivo que los estados serán inmutables
//     Por lo tanto, hay que utilizar métodos especiales para acceder a los estados
import { combineReducers } from 'redux-immutable';

// El initialState se almacena en el Store de la siguiente forma:
// store: {
//     data: { ... },
//     modal: { ... },
//     isLoading: { ... }
// }
const rootReducer = combineReducers({
    forms: listMyForms,
    users: userAcountReducers,
});

export default rootReducer;