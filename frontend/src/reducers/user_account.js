import { fromJS } from 'immutable';
import { constsUserAccount } from '../action-types/user-account';

const initialState = fromJS({
    statusCode: '',
    statusInfo: '',
    user: {}
});

function userAcountReducers(state = initialState, action) {
    switch (action.type) {
        case constsUserAccount.LOGIN:
            return state.merge({
                statusCode: action.payload.statusCode,
                statusInfo: action.payload.statusInfo,
                user: action.payload.user
            });
        default:
            return state;
    }
}

export default userAcountReducers;