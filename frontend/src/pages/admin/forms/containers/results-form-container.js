import React, { Component } from  'react';
// Components
import ResultsFormLayout from '../components/results-form-layout';
import ResultsFormTable from '../components/results-form-table';
// Error handler
import HandleError from '../../../../errors/containers/handle-error';
// React Redux
import { connect } from 'react-redux';
// Immutable
import { List as list } from 'immutable';
// Actions creator
import * as actions_forms from '../../../../actions/my-forms';
import { bindActionCreators } from 'redux';

class ResultsFormContainer extends Component {
    constructor(props) {
        super(props);
    }
    UNSAFE_componentWillMount() {
        // Se obtiene el listado de todos los Forms del usuario logueado
        const codeForm = this.props.location.state.codeForm;
        this.props.actions.getAverageResultsByForm(codeForm);
    }
    render() {
        return (
            <HandleError>
                <ResultsFormLayout
                form={this.props.form}
                countAnswers={this.props.results.length}
                >
                    <ResultsFormTable
                        answers={this.props.results}
                    />
                </ResultsFormLayout>
            </HandleError>
        )
    }
}

function mapStateToProps(state, props) {
    // Se mapean los props para adecuarse a la estructura del state
    const objResponse = state.get('forms').toJS()
    return {
        form: objResponse.averageResults.form,
        results: objResponse.averageResults.results
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions_forms, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsFormContainer);