import React from 'react';

const ParticipantsFormLayout = (props) => (
    <div className="container">
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
            <div className="col-md-12 text-center">
                <h4>Total de respuestas: {props.countParticipants}</h4>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                {props.children}
            </div>
        </div>
    </div>
)

export default ParticipantsFormLayout;