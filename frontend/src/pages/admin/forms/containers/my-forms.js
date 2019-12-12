import React, { Component } from  'react';
// Components
import MyFormsLayout from '../components/my-forms-layout';
import MyFormsTable from '../components/my-forms-table';
// Error handler
import HandleError from '../../../../errors/containers/handle-error';
// React Redux
import { connect } from 'react-redux';
// Immutable
import { List as list } from 'immutable';
// Actions creator
import * as actions_forms from '../../../../actions/my-forms';
import { bindActionCreators } from 'redux';

class MyFormsContainer extends Component {
    constructor(props) {
        super(props);
        this.handleViewForm = this.handleViewForm.bind(this);
        this.handleDeleteForm = this.handleDeleteForm.bind(this);
    }
    componentWillMount() {
        // Se obtiene el listado de todos los Forms del usuario logueado
        this.props.actions.getAllMyForms();
    }
    handleViewForm(codeForm) {
        this.props.actions.getFormByCode(codeForm);
	}
    handleDeleteForm(codeForm) {
        // ELIMINAR EL FORMULARIO
	}
    render() {
        return (
            <HandleError>
                <MyFormsLayout>
                    <MyFormsTable
                        listForms={this.props.listForms}
                        handleViewForm={this.handleViewForm}
                        handleDeleteForm={this.handleDeleteForm}
                    />
                </MyFormsLayout>
            </HandleError>
        )
    }
}

function mapStateToProps(state, props) {
    // Devolviendo nuevas propiedades para Home
    return {
        listForms: state.get('forms').get('myForms'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions_forms, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFormsContainer);