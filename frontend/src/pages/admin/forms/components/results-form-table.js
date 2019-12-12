import React from 'react';

const ResultsFormTable = (props) => (
    <table className="table">
        <thead className="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Pregunta</th>
                <th scope="col">Descripción</th>
                <th scope="col">Resultado</th>
            </tr>
        </thead>
        <tbody>
            {
                props.answers.map((answer, index) => {
                    return (    
                        <tr key={answer.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{answer.question}</td>
                            <td>{answer.description_help}</td>
                            <td>{answer.result}</td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
)

export default ResultsFormTable;