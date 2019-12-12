import React from 'react';

const ParticipantsFormTable = (props) => (
    <table className="table">
        <thead className="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Respondido por</th>
                <th scope="col">Correo electónico</th>
                <th scope="col">Fecha</th>
                {/* @Pendiente. La API no tiene un EndPoint para obtener la respuesta de un usuario */}
                {/* <th scope="col" className="text-center">Acciones</th> */}
            </tr>
        </thead>
        <tbody>
            {
                props.participants.map((participant, index) => {
                    return (    
                        <tr key={participant.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{participant.answered_by.first_name} {participant.answered_by.last_name}</td>
                            <td>{participant.answered_by.email}</td>
                            <td>{participant.answered_at}</td>
                            {/* @Pendiente. La API no tiene un EndPoint para obtener la respuesta de un usuario */}
                            {/* <td>
                                <button
                                    type="button"
                                    className="btn btn-primary mr-3"
                                    onClick={() => props.handleViewAnswers(participant.id)}
                                >Ver</button>
                            </td> */}
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
)

export default ParticipantsFormTable;