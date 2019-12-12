import React, { Component } from  'react';
// Components
import AnswerFormLayout from '../components/answer-form-layout';
import AnswerFormTable from '../components/answer-form-table';
// Error handler
import HandleError from '../../../errors/containers/handle-error';
// React Redux
import { connect } from 'react-redux';
// Immutable
import { List as list } from 'immutable';
// Actions creator
import * as actions_forms from '../../../actions/my-forms';
import { bindActionCreators } from 'redux';

class AnswerFormContainer extends Component {
    state = {
        form: {},
        questions: {},
        answers: {},
        statusCode: '',
        statusInfo: '',
        codeSearchForm: ''
    }
    constructor(props) {
        super(props);
    }
    UNSAFE_componentWillMount() {
        // Se obtiene el listado de todos los Forms del usuario logueado
        // const codeForm = 'stkAYVvqfSrlX0DvmwWy5b2jAzv7YW';
        // this.props.actions.getFormByCode(codeForm);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        // Se agrega todos los questions del form al state del componente
        const newState = {
            ...this.state,
            form: nextProps.form,
            questions: nextProps.questions,
            answers: nextProps.answers,
            statusCode: nextProps.statusCode,
            statusInfo: nextProps.statusInfo
        }
        this.setState(newState);
    }
    handleSendAnswers = (event) => {
        // const newState = {...this.state};
        // Object.values(newState.questions).forEach(question => {
        //     if (question.id < 0) {
        //         delete newState.questions[question.id]
        //     }
        // });
        // this.setState(newState);
        // Llamar al Endpoint para crear la respuesta
        const answers = {
            answers: Object.values(this.state.answers)
        }
        this.props.actions.postFormAnswerByCode(this.props.form.code, answers);
    }
    handleChangeCodeSearch = (event) => {
        const newSatate = {...this.state};
        newSatate.codeSearchForm = event.target.value;
        this.setState(newSatate);
    }
    handleSearchForm = (event) => {
        // Se obtiene el listado de todos los Forms del usuario logueado
        const codeForm = this.state.codeSearchForm;
        this.props.actions.getFormByCode(codeForm);
    }
    handleChangeAnswer = (event) => {
        const newSatate = {...this.state};
        newSatate.answers[event.target.id][event.target.name] = event.target.value;
        this.setState(newSatate);
    }
    render() {
        return (
            <HandleError>
                <AnswerFormLayout
                    codeSearch={this.state.codeSearchForm}
                    handleChangeSearchValue={this.handleChangeCodeSearch}
                    handleSearchForm={this.handleSearchForm}
                    >
                    <AnswerFormTable
                        form={this.state.form}
                        listQuestions={this.props.questions}
                        listAnswers={this.state.answers}
                        statusCode={this.state.statusCode}
                        statusInfo={this.state.statusInfo}
                        handleChangeAnswerValue={this.handleChangeAnswer}
                        handleSendAnswers={this.handleSendAnswers}
                    />
                </AnswerFormLayout>
            </HandleError>
        )
    }
}

function mapStateToProps(state, props) {
    // Se mapean los props para adecuarse a la estructura del state
    const formResponse = state.get('forms').toJS().form
    const form = formResponse.form;
    const questions = {};
    const answers = {};
    formResponse.questions.forEach(question => {
        questions[question.id] = question;
        answers[question.id] = {
            question_id: question.id,
            answer: 10
        }
    });
    return {
        form,
        questions,
        answers,
        statusCode: state.get('forms').toJS().statusCode,
        statusInfo: state.get('forms').toJS().statusInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions_forms, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerFormContainer);