import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../resources/css/Home.css';

class Home extends Component {
    render() {
        return (
            <div className="jumbotron jumbo text-center">
                <h1 className="display-4">Home!</h1>
                <p className="lead">This is a simple application where you can store your favourite movies.</p>
                <hr className="my-4" />
                <p>To start using the application you have to register or log in if you already have an account.</p>
                {document.cookie.includes('token') ?
                <p>
                    <Link className="btn-home btn btn-outline-info btn-lg" to="/list">Back to List</Link>
                </p> :
                <p className="lead">
                    <Link className="btn-home btn btn-outline-info btn-lg" to="/login">Login</Link>
                    <Link className="btn-home btn btn-outline-success btn-lg" to="/register">Register</Link>
                </p>}
            </div>
        )
    }
}

export default Home;