import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../resources/css/Nav.css';

// Zmienic wyglad nav w zaleznosci od tego czy uzytkownik jest zalogowany czy nie

class Nav extends Component {
    getCookie() {
        return document.cookie.includes('token');
    }

    render() {
        this.getCookie();
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/"><span className="navbar-brand">Movies</span></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {!this.getCookie() && 
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/login"><span className="nav-link">Login</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register"><span className="nav-link">Register</span></Link>
                        </li>
                    </ul>}
                    {this.getCookie() &&
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/list"><span className="nav-link">List</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/add"><span className="nav-link">Add</span></Link>
                        </li>
                    </ul>}
                </div>
            </nav>
        )
    }
}

export default Nav;