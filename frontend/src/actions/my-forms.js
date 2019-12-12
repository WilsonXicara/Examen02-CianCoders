import {
    GET_MY_FORMS,
    GET_FORM_BY_CODE,
    UPDATE_FORM_BY_CODE,
    SEND_ANSWER_TO_FORM_BY_CODE,
    GET_PARTICIPANTS_FORM_BY_CODE,
    GET_AVERAGE_FORM_RESPONSES,
} from '../action-types/my-forms';
import { api } from "api";
// Code status
import { statusCode, statusInfo } from '../codes/status-api'

export function dispatchGetAllMyForms(statusCode, statusInfo, response = []) {
    return {
        type: GET_MY_FORMS,
        payload: {
            statusCode,
            statusInfo,
            myForms: response
        }
    }
}
export function dispatchGetFormByCode(statusCode, statusInfo, response = {}) {
    return {
        type: GET_FORM_BY_CODE,
        payload: {
            statusCode,
            statusInfo,
            form: response
        }
    }
}
export function dispatchUpdateForm(statusCode, statusInfo, response = {}) {
    return {
        type: UPDATE_FORM_BY_CODE,
        payload: {
            statusCode,
            statusInfo,
            form: response
        }
    }
}
export function dispatchPostFormAnswerByCode(statusCode, statusInfo, response = {}) {
    return {
        type: SEND_ANSWER_TO_FORM_BY_CODE,
        payload: {
            statusCode,
            statusInfo,
            form: response
        }
    }
}
export function dispatchGetAllParticipantsByForm(statusCode, statusInfo, response = {}) {
    return {
        type: GET_PARTICIPANTS_FORM_BY_CODE,
        payload: {
            statusCode,
            statusInfo,
            participants: response
        }
    }
}
export function dispatchGetAverageResultsByForm(statusCode, statusInfo, response = {}) {
    return {
        type: GET_AVERAGE_FORM_RESPONSES,
        payload: {
            statusCode,
            statusInfo,
            averageResults: response
        }
    }
}

// Actions para las Peticiones HTTP
export function getAllMyForms() {
    return dispatch => {
        api.get('forms/').then((response) => {
            dispatch(
                dispatchGetAllMyForms(statusCode.STATUS_OK, statusInfo.OK, response.results)
            );
            // localStorage.setItem('token', response.token);
            // dispatch(push("/"));
        }).catch((error) => {
            console.log('==== ERROR EN getAllMyForms():', error.response);
            switch(error.response.statusCode) {
                case 401:
                    dispatch(
                        dispatchGetAllMyForms(statusCode.STATUS_ERROR, statusInfo.NOT_AUTHORIZED)
                    )
                    break;
                case 504:
                    dispatch(
                        dispatchGetAllMyForms(statusCode.STATUS_ERROR, statusInfo.SERVER_ERROR)
                    )
                    break;
            }
            // NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
        }).finally(() => {
            // dispatch(setLoader(false));
        });
    }
}
export function getFormByCode(codeForm) {
    return dispatch => {
        api.get(`forms/${codeForm}/`).then((response) => {
            dispatch(
                dispatchGetFormByCode(statusCode.STATUS_OK, statusInfo.OK, response)
            );
            // localStorage.setItem('token', response.token);
            // dispatch(push("/"));
        }).catch((error) => {
            console.log('==== ERROR EN getFormByCode():', error.response);
            switch(error.response.statusCode) {
                case 401:
                    dispatch(
                        dispatchGetFormByCode(statusCode.STATUS_ERROR, statusInfo.NOT_AUTHORIZED)
                    )
                    break;
                case 504:
                    dispatch(
                        dispatchGetFormByCode(statusCode.STATUS_ERROR, statusInfo.SERVER_ERROR)
                    )
                    break;
            }
            // NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
        }).finally(() => {
            // dispatch(setLoader(false));
        });
    }
}
export function postFormAnswerByCode(codeForm, answers) {
    return dispatch => {
        api.post(`forms/${codeForm}/answer/`, answers).then((response) => {
            dispatch(
                dispatchPostFormAnswerByCode(statusCode.STATUS_OK, statusInfo.OK, response)
            );
            // localStorage.setItem('token', response.token);
            // dispatch(push("/"));
        }, error => {
            console.log('==== ERROR PRINCIPAL EN postFormAnswerByCode():', error);
            dispatch(
                dispatchPostFormAnswerByCode(statusCode.STATUS_ERROR, statusInfo.SERVER_ERROR)
            )
        }).catch((error) => {
            console.log('==== ERROR por código EN postFormAnswerByCode():', error.response);
            switch(error.response.statusCode) {
                case 401:
                    dispatch(
                        dispatchPostFormAnswerByCode(statusCode.STATUS_ERROR, statusInfo.NOT_AUTHORIZED)
                    )
                    break;
                case 504:
                    dispatch(
                        dispatchPostFormAnswerByCode(statusCode.STATUS_ERROR, statusInfo.SERVER_ERROR)
                    )
                    break;
            }
            // NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
        }).finally(() => {
            // dispatch(setLoader(false));
        });
    }
}
export function updateForm(form, questions, newQuestions = {}, deleteQuestions = {}) {
    return dispatch => {
        let continuar = false;
        // Se actualiza la información del Form
        console.log('Actualizando el FORM');
        api.patch(`forms/${form.code}/`, form).then((response) => {
            console.log('FORM actualizado');
            // Se actualizan los Questions existentes
            console.log('Actualizando el QUESTION', questions);
            Object.values(questions).forEach(question => {
                api.patch(`forms/${form.code}/questions/${question.id}/`, question).then((response) => {
                    continuar = true;
                    console.log('QUESTION actualizado');
                    // localStorage.setItem('token', response.token);
                    // dispatch(push("/"));
                }, error => {
                    console.log('==== ERROR PRINCIPAL EN updateForm->Question():', error.response);
                }).catch((error) => {
                    console.log('==== ERROR EN updateForm->Question():', error.response);
                    continuar = false;
                    switch(error.response.statusCode) {
                        case 401:
                            dispatch(
                                dispatchUpdateForm(statusCode.STATUS_ERROR, statusInfo.NOT_AUTHORIZED)
                            )
                            break;
                        case 504:
                            dispatch(
                                dispatchUpdateForm(statusCode.STATUS_ERROR, statusInfo.SERVER_ERROR)
                            )
                            break;
                    }
                    // NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
                }).finally(() => {
                    // dispatch(setLoader(false));
                });
            });
            Object.values(newQuestions).forEach(question => {
                console.log('Creando el QUESTION');
                api.post(`forms/${form.code}/questions/`, question).then((response) => {
                    continuar = true;
                    console.log('QUESTION creado');
                    // localStorage.setItem('token', response.token);
                    // dispatch(push("/"));
                }, error => {
                    console.log('==== ERROR PRINCIPAL EN updateForm->newQuestion():', error.response);
                }).catch((error) => {
                    console.log('==== ERROR EN updateForm->newQuestion():', error.response);
                    continuar = false;
                    switch(error.response.statusCode) {
                        case 401:
                            dispatch(
                                dispatchUpdateForm(statusCode.STATUS_ERROR, statusInfo.NOT_AUTHORIZED)
                            )
                            break;
                        case 504:
                            dispatch(
                                dispatchUpdateForm(statusCode.STATUS_ERROR, statusInfo.SERVER_ERROR)
                            )
                            break;
                    }
                    // NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
                }).finally(() => {
                    // dispatch(setLoader(false));
                });
            });
            Object.values(deleteQuestions).forEach(question => {
                console.log('Eliminando el QUESTION');
                api.eliminar(`forms/${form.code}/questions/${question.id}/`).then((response) => {
                    continuar = true;
                    console.log('QUESTION borrado');
                    // localStorage.setItem('token', response.token);
                    // dispatch(push("/"));
                }).catch((error) => {
                    console.log('==== ERROR EN updateForm->deleteQuestion():', error.response);
                    continuar = false;
                    switch(error.response.statusCode) {
                        case 401:
                            dispatch(
                                dispatchUpdateForm(statusCode.STATUS_ERROR, statusInfo.NOT_AUTHORIZED)
                            )
                            break;
                        case 504:
                            dispatch(
                                dispatchUpdateForm(statusCode.STATUS_ERROR, statusInfo.SERVER_ERROR)
                            )
                            break;
                    }
                    // NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
                }).finally(() => {
                    // dispatch(setLoader(false));
                });
            });
            // localStorage.setItem('token', response.token);
            // dispatch(push("/"));
        }, error => {
            console.log('==== ERROR PRINCIPAL EN updateForm():', error.response);
        }).catch((error) => {
            console.log('==== ERROR EN updateForm():', error.response);
            switch(error.response.statusCode) {
                case 401:
                    dispatch(
                        dispatchUpdateForm(statusCode.STATUS_ERROR, statusInfo.NOT_AUTHORIZED)
                    )
                    break;
                case 504:
                    dispatch(
                        dispatchUpdateForm(statusCode.STATUS_ERROR, statusInfo.SERVER_ERROR)
                    )
                    break;
            }
            // NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
        }).finally(() => {
            // dispatch(setLoader(false));
            console.log('finally en FORM');
        });
    }
}
export function getAllParticipantsByForm(codeForm) {
    return dispatch => {
        api.get(`forms/${codeForm}/participants/`).then((response) => {
            dispatch(
                dispatchGetAllParticipantsByForm(statusCode.STATUS_OK, statusInfo.OK, response)
            );
        }, error => {
            switch(error.response.statusCode) {
                case 401:
                    dispatch(
                        dispatchGetAllParticipantsByForm(statusCode.STATUS_ERROR, statusInfo.NOT_AUTHORIZED)
                    )
                    break;
                case 504:
                    dispatch(
                        dispatchGetAllParticipantsByForm(statusCode.STATUS_ERROR, statusInfo.SERVER_ERROR)
                    )
                    break;
            }
        }).catch((error) => {
            console.log('==== ERROR EN getAllMyForms():', error.response);
            switch(error.response.statusCode) {
                case 401:
                    dispatch(
                        dispatchGetAllParticipantsByForm(statusCode.STATUS_ERROR, statusInfo.NOT_AUTHORIZED)
                    )
                    break;
                case 504:
                    dispatch(
                        dispatchGetAllParticipantsByForm(statusCode.STATUS_ERROR, statusInfo.SERVER_ERROR)
                    )
                    break;
            }
            // NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
        }).finally(() => {
            // dispatch(setLoader(false));
        });
    }
}
export function getAverageResultsByForm(codeForm) {
    return dispatch => {
        api.get(`forms/${codeForm}/average_responses/`).then((response) => {
            dispatch(
                dispatchGetAverageResultsByForm(statusCode.STATUS_OK, statusInfo.OK, response)
            );
        }, error => {
            console.log('==== ERROR PRINCIPAL EN getAverageResultsByForm():', error.response);
            switch(error.response.statusCode) {
                case 401:
                    dispatch(
                        dispatchGetAverageResultsByForm(statusCode.STATUS_ERROR, statusInfo.NOT_AUTHORIZED)
                    )
                    break;
                case 504:
                    dispatch(
                        dispatchGetAverageResultsByForm(statusCode.STATUS_ERROR, statusInfo.SERVER_ERROR)
                    )
                    break;
            }
        }).catch((error) => {
            console.log('==== ERROR EN getAverageResultsByForm():', error.response);
            switch(error.response.statusCode) {
                case 401:
                    dispatch(
                        dispatchGetAverageResultsByForm(statusCode.STATUS_ERROR, statusInfo.NOT_AUTHORIZED)
                    )
                    break;
                case 504:
                    dispatch(
                        dispatchGetAverageResultsByForm(statusCode.STATUS_ERROR, statusInfo.SERVER_ERROR)
                    )
                    break;
            }
            // NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
        }).finally(() => {
            // dispatch(setLoader(false));
        });
    }
}