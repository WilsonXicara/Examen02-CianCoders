import React from 'react';

const LoginForm = (props) => (
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <form
                    onSubmit={props.handleSubmit}
                >
                    <div className="form-group">
                        <label
                            htmlFor="inputEmail"
                            >Email address</label>
                        <input
                            id="inputEmail"
                            type="email"
                            name="email"
                            className="form-control"
                            ref={props.setRef}
                            defaultValue={props.email}
                            onChange={props.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label
                            htmlFor="inputPassword"
                        >Password</label>
                        <input
                            id="inputPassword"
                            type="password"
                            name="password"
                            className="form-control"
                            ref={props.setRef}
                            defaultValue={props.password}
                            onChange={props.handleChange}
                        />
                    </div>
                    <div className="form-group form-check">
                        <input
                            id="inputCheckMe"
                            type="checkbox"
                            className="form-check-input"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="inputCheckMe"
                        >Check me out</label>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >Submit</button>
                </form>
            </div>
        </div>
    </div>
)

export default LoginForm;