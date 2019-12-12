import React from 'react';
import { Link } from 'react-router-dom';

const MyFormsTable = (props) => (
    <table className="table">
        <thead className="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Código</th>
                <th scope="col">Título</th>
                <th scope="col">Abierto desde</th>
                <th scope="col" className="text-center">Acciones</th>
            </tr>
        </thead>
        <tbody>
            {
                props.listForms.map((myForm, index) => {
                    return (    
                        <tr key={myForm.code}>
                            <th scope="row">{index + 1}</th>
                            <td>{myForm.code}</td>
                            <td>{myForm.title}</td>
                            <td>{myForm.open_at}</td>
                            <td>
                                <Link
                                    to={{
                                        pathname: `/forms/mine/${myForm.code}`,
                                        state: {
                                            codeForm: myForm.code
                                        }
                                    }}
                                >
                                    <button
                                        type="button"
                                        className="btn btn-primary mr-3"
                                        onClick={() => props.handleViewForm(myForm.code)}
                                    >Ver</button>
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => props.handleDeleteForm(myForm.code)}
                                >Eliminar</button>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
)

export default MyFormsTable;