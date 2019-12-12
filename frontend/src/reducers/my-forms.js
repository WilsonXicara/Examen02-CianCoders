import { fromJS } from 'immutable';
import {
    GET_MY_FORMS,
    GET_FORM_BY_CODE,
    UPDATE_FORM_BY_CODE,
    SEND_ANSWER_TO_FORM_BY_CODE,
    GET_PARTICIPANTS_FORM_BY_CODE,
    GET_AVERAGE_FORM_RESPONSES,
} from '../action-types/my-forms';

const initialState = fromJS({
    statusCode: '',
    statusInfo: '',
    myForms: [],
    form: {
        form: {},
        number_questions: 0,
        questions: []
    },
    participants: {
        form: {},
        participants: []
    },
    averageResults: {
        form: {},
        results: []
    }
});

function listMyForms(state = initialState, action) {
    switch (action.type) {
        case GET_MY_FORMS:
            return state.merge({
                statusCode: action.payload.statusCode,
                statusInfo: action.payload.statusInfo,
                myForms: action.payload.myForms
            });
        case GET_FORM_BY_CODE:
            return state.merge({
                statusCode: action.payload.statusCode,
                statusInfo: action.payload.statusInfo,
                form: action.payload.form
            });
        // Estas acciones realizan cambios en la BD, pero no se actualiza el store
        case UPDATE_FORM_BY_CODE:
        case SEND_ANSWER_TO_FORM_BY_CODE:
            return state.merge({
                statusCode: action.payload.statusCode,
                statusInfo: action.payload.statusInfo,
            });
        case GET_PARTICIPANTS_FORM_BY_CODE:
            return state.merge({
                statusCode: action.payload.statusCode,
                statusInfo: action.payload.statusInfo,
                participants: {
                    form: action.payload.participants.form,
                    participants: action.payload.participants.participants
                }
            });
        case GET_AVERAGE_FORM_RESPONSES:
            return state.merge({
                statusCode: action.payload.statusCode,
                statusInfo: action.payload.statusInfo,
                averageResults: {
                    form: action.payload.averageResults.form,
                    results: action.payload.averageResults.results
                }
            });
        default:
            return state;
    }
}

export default listMyForms;