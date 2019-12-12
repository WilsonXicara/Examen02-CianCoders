import React from 'react';

function MyFormsLayout(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default MyFormsLayout;