import React, { Component } from  'react';
// Components
import ParticipantsFormLayout from '../components/participants-form-layout';
import ParticipantsFormTable from '../components/participants-form-table';
// Error handler
import HandleError from '../../../../errors/containers/handle-error';
// React Redux
import { connect } from 'react-redux';
// Immutable
import { List as list } from 'immutable';
// Actions creator
import * as actions_forms from '../../../../actions/my-forms';
import { bindActionCreators } from 'redux';

class ParticipantsFormContainer extends Component {
    constructor(props) {
        super(props);
        this.handleViewAnswers = this.handleViewAnswers.bind(this);
    }
    UNSAFE_componentWillMount() {
        // Se obtiene el listado de todos los Forms del usuario logueado
        const codeForm = this.props.location.state.codeForm;
        this.props.actions.getAllParticipantsByForm(codeForm);
    }
    handleViewAnswers(codeForm) {
        console.log('OBJETO THIS:', this);
        this.props.actions.getFormByCode(codeForm);
	}
    render() {
        return (
            <HandleError>
                <ParticipantsFormLayout
                form={this.props.form}
                countParticipants={this.props.participants.length}
                >
                    <ParticipantsFormTable
                        participants={this.props.participants}
                        handleViewAnswers={this.handleViewAnswers}
                    />
                </ParticipantsFormLayout>
            </HandleError>
        )
    }
}

function mapStateToProps(state, props) {
    // Se mapean los props para adecuarse a la estructura del state
    const objResponse = state.get('forms').toJS().participants
    const form = objResponse.form;
    const participants = objResponse.participants;
    return {
        form,
        participants
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions_forms, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsFormContainer);