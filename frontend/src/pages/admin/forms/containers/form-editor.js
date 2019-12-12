import React, { Component } from  'react';
// Components
import FormEditorLayout from '../components/form-editor-layout';
import FormTableQuestions from '../components/form-table-question';
// Error handler
import HandleError from '../../../../errors/containers/handle-error';
// React Redux
import { connect } from 'react-redux';
// Immutable
import { List as list } from 'immutable';
// Actions creator
import * as actions_forms from '../../../../actions/my-forms';
import { bindActionCreators } from 'redux';

class FormEditorContainer extends Component {
    state = {
        form: {},
        questions: {},
        newQuestions: {},
        deleteQuestions: {}
    }
    constructor(props) {
        super(props);
        this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
    }
    UNSAFE_componentWillMount() {
        // Se obtiene la información del Form proporcionado en los parámetros
        const codeForm = this.props.location.state.codeForm;
        this.props.actions.getFormByCode(codeForm);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        // Se agrega todos los questions del form al state del componente
        const newState = {
            ...this.state,
            form: nextProps.form,
            questions: nextProps.questions
        }
        this.setState(newState);
    }
    handleAddQuestion = (event) => {
        // Agrega una nueva pregunta al formulario.
        // Esto es en memoria, para luego ser enviada hacia la API
        const newState = {...this.state};
        // IMPORTANTE:
        // Las nuevas preguntas se generan con un ID aleatorio y negativo para evitar repetirlos con registros ya persistidos (y cargados al formulario)
        const newQuestion = {
            id: Math.round(Math.random()*-10000) - 1,
            question: '',
            description_help: ''
        }
        newState.questions[newQuestion.id] = newQuestion;
        newState.newQuestions[newQuestion.id] = newQuestion;
        this.setState(newState);
    }
    handleDeleteQuestion(idQuestion) {
        // Elimina una pregunta del formulario. Hay 2 casos:
        // - Si la pregunta está registrada en BD, se elimina de la vista y se mueve a otra sección del state
        // - Si la pregunta no está en BD, sólo se elimina del state
        const newState = {...this.state}
        const question = newState.questions[idQuestion];
        if (idQuestion > 0) {
            // Es una pregunta ya persistida. Se mueve a otra sección del state para su posterior eliminación
            newState.deleteQuestions[idQuestion] = question;
        } else {
            delete newState.newQuestions[idQuestion];
        }
        delete newState.questions[idQuestion];
        this.setState(newState);
    }
    handleSaveOrUpdateForm = (event) => {
        const newState = {...this.state};
        Object.values(newState.questions).forEach(question => {
            if (question.id < 0) {
                delete newState.questions[question.id]
            }
        });
        this.setState(newState);
        console.log('NUEVOS VALORES:', this.state)
        this.props.actions.updateForm(this.state.form, this.state.questions, this.state.newQuestions, this.state.deleteQuestions);
    }
    handleChangeDataForm = (event) => {
        const newSatate = {...this.state};
        newSatate.form[event.target.name] = event.target.value;
        this.setState(newSatate);
    }
    handleChangeDataQuestion = (event) => {
        const newSatate = {...this.state};
        newSatate.questions[event.target.id][event.target.name] = event.target.value;
        this.setState(newSatate);
    }
    render() {
        return (
            <HandleError>
                <FormEditorLayout
                    form={this.state.form}
                    handleSaveOrUpdate={this.handleSaveOrUpdateForm}
                    handleChangeValue={this.handleChangeDataForm}
                >
                    <FormTableQuestions
                        listQuestions={this.state.questions}
                        handleDelete={this.handleDeleteQuestion}
                        handleAdd={this.handleAddQuestion}
                        handleChangeValue={this.handleChangeDataQuestion}
                    />
                </FormEditorLayout>
            </HandleError>
        )
    }
}

function mapStateToProps(state, props) {
    // Se mapean los props para adecuarse a la estructura del state
    const formResponse = state.get('forms').toJS().form
    const form = formResponse.form;
    const questions = {};
    formResponse.questions.forEach(question => {
        questions[question.id] = question;
    });
    return {
        form,
        questions
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions_forms, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormEditorContainer);