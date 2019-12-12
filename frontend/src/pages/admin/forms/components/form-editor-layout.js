import React from 'react';
import { Link } from 'react-router-dom';
// Styles
import './form-editor-layout.css';

const FormEditorLayout = (props) => (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center mb-2">
                <Link
                    to={{
                        pathname: `/forms/mine/${props.form.code}/participants`,
                        state: {
                            codeForm: props.form.code
                        }
                    }}
                >
                    <button
                        type="button"
                        className="btn btn-secondary btn-lg"
                    >¿QUIÉNES HAN RESPONDIDO?</button>
                </Link>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 text-center mb-3">
                <Link
                    to={{
                        pathname: `/forms/mine/${props.form.code}/results`,
                        state: {
                            codeForm: props.form.code
                        }
                    }}
                >
                    <button
                        type="button"
                        className="btn btn-secondary btn-lg"
                    >VER RESULTADOS</button>
                </Link>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <input
                    type="text"
                    name="title"
                    className="form-control FormEditor-title mb-2"
                    placeholder="Título del formulario"
                    defaultValue={props.form.title}
                    onChange={props.handleChangeValue}
                />
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <textarea
                    className="form-control FormEditor-description mb-3"
                    name="description"
                    rows="2"
                    placeholder="Descripción del formulario"
                    defaultValue={props.form.description}
                    onChange={props.handleChangeValue}
                ></textarea>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                {props.children}
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 text-center">
                <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={props.handleSaveOrUpdate}
                >GUARDAR CAMBIOS</button>
            </div>
        </div>
    </div>
)

export default FormEditorLayout;