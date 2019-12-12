import React from 'react';

const FormTableQuestions = (props) => (
    <table className="table">
        <thead className="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Preguntas ({Object.keys(props.listQuestions).length} en total)</th>
                <th scope="col">Descripción</th>
                <th scope="col" className="text-center">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={props.handleAdd}
                    >Agregar...</button>
                </th>
            </tr>
        </thead>
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
                                    onChange={props.handleChangeValue}
                                />
                            </td>
                            <td className="align-middle">
                                <textarea
                                    id={props.listQuestions[idQuestion].id}
                                    className="form-control"
                                    name="description_help"
                                    rows="2"
                                    defaultValue={props.listQuestions[idQuestion].description_help}
                                    onChange={props.handleChangeValue}
                                ></textarea>
                            </td>
                            <td className="align-middle text-center">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => props.handleDelete(props.listQuestions[idQuestion].id)}
                                >Eliminar</button>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
)

export default FormTableQuestions;