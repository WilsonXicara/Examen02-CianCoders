import React from 'react';
import {
    statusCode,
    statusInfo,
} from '../../../codes/status-api';

const AnswerFormTable = (props) => (
    <div className="container">
        <div className="row" hidden={props.statusCode !== statusCode.STATUS_ERROR}>
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
        </div>
        <div className="row">
            <div className="col-md-12">
                <table className="table">
                    <tbody>
                        {
                            Object.keys(props.listQuestions).map((idQuestion, index) => {
                                return (    
                                    <tr key={props.listQuestions[idQuestion].id}>
                                        <th scope="row" className="align-middle">{index + 1}</th>
                                        <td className="align-middle">
                                            <input
                                                id={props.listQuestions[idQuestion].id}
                                                type="text"
                                                name="question"
                                                className="form-control"
                                                defaultValue={props.listQuestions[idQuestion].question}
                                                readOnly
                                            />
                                            <small className="form-text text-muted">{props.listQuestions[idQuestion].description_help}</small>
                                        </td>
                                        <td className="align-middle">
                                            <input
                                                id={props.listQuestions[idQuestion].id}
                                                type="number"
                                                name="answer"
                                                className="form-control"
                                                defaultValue={props.listAnswers[idQuestion].answer}
                                                onChange={props.handleChangeAnswerValue}
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 text-center">
                <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={props.handleSendAnswers}
                    disabled={props.statusCode === statusCode.STATUS_ERROR}
                >ENVIAR RESPUESTA</button>
            </div>
        </div>
    </div>
)

export default AnswerFormTable;