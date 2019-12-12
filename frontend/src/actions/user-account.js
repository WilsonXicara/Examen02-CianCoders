import { api } from "api";
import { constsUserAccount } from '../action-types/user-account';
import { statusCode, statusInfo } from '../codes/status-api';
import GOOGLE_FORMS_USER_TOKEN from 'api';

function dispatchLogin(statusCode, statusInfo, response = {}) {
    return {
        type: constsUserAccount.USER_LOGIN,
        payload: {
            statusCode,
            statusInfo,
            user: response.user,
        }
    }
}

// Actions para las Peticiones HTTP
export function login(email, password) {
    return dispatch => {
        const credentials = { email, password };
        api.post(`users/login/`, credentials).then((response) => {
            dispatch(
                dispatchLogin(statusCode.STATUS_OK, statusInfo.OK, response)
            );
            localStorage.setItem(GOOGLE_FORMS_USER_TOKEN, response.token);
        }, error => {
            console.log('==== ERROR PRINCIPAL EN login():', error);
            switch(error.statusCode) {
                case 400:
                    dispatch(
                        dispatchLogin(statusCode.STATUS_ERROR, statusInfo.BAD_REQUEST)
                    );
                    break;
                case 500:
                        dispatch(
                            dispatchLogin(statusCode.STATUS_ERROR, statusInfo.SERVER_ERROR)
                        );
                    break;
                default:
                        dispatch(
                            dispatchLogin(statusCode.STATUS_ERROR, statusInfo.ERROR_NO_CONTEMPLADO)
                        );
                    break;
            }
        }).catch((error) => {
            console.log('==== ERROR por código en Login():', error);
            // NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
        }).finally(() => {
            // dispatch(setLoader(false));
        });
    }
}