import React from 'react';
import './answer-form-layout.css';

const AnswerFormLayout = (props) => (
    <div className="container">
        <div className="row">
            <div className="col-md-3">
                <input
                    type="text"
                    name="title"
                    className="form-control Form-code mb-2"
                    placeholder="Título del formulario"
                    value="Ingrese el código"
                    readOnly
                />
            </div>
            <div className="col-md-6">
                <input
                    type="text"
                    name="title"
                    className="form-control FormEditor-title mb-2"
                    placeholder="Título del formulario"
                    defaultValue={props.codeSearch}
                    onChange={props.handleChangeSearchValue}
                />
            </div>
            <div className="col-md-3">
                <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={props.handleSearchForm}
                >Buscar formulario</button>
            </div>
        </div>
        {/* <div className="row" hidden={props.statusCode !== statusCode.STATUS_ERROR}>
            <div className="col-md-12 text-center">
                <h1>El servidor respondió con un código de error: {props.statusCode}</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 text-center">
                <h1>{props.form.title}</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 text-center">
                <h4>{props.form.description}</h4>
            </div>
        </div> */}
        {/* <div className="row">
            <div className="col-md-12">
            </div>
        </div> */}
        {props.children}
        {/* <div className="row">
            <div className="col-md-12 text-center">
                <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={props.handleSendAnswers}
                    disabled={props.statusCode === statusCode.STATUS_ERROR}
                >ENVIAR RESPUESTA</button>
            </div>
        </div> */}
    </div>
)

export default AnswerFormLayout;