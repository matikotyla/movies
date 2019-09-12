import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import clapperboard from '../resources/images/clapperboard.png';

import '../resources/css/Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    onEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        axios({
            method: 'POST',
            url: 'http://localhost:7000/api/user/login',
            data: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then(res => {
            if(res.status === 200) {
                // console.log(res.data)
                this.props.history.push('/list');
            } else {
                this.setState({
                    errors: res.data.errors
                });
            }
        })
        .catch(err => {
            this.setState({
                errors: err.response.data.errors
            })
        })
    }

    render() {
        return (
            <div className="jumbotron login-jumbo text-center">
                <img alt="cinema" width="128" height="128" src={clapperboard} />
                <p className="lead login-info">Login Page</p>
                <hr className="my-4" />
                {this.state.errors !== undefined && 
                this.state.errors.email !== undefined &&
                this.state.errors.email.map(error => {
                    return (
                        <div key={error} className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )
                })}
                {this.state.errors !== undefined && 
                this.state.errors.password !== undefined &&
                this.state.errors.password.map(error => {
                    return (
                        <div key={error} className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )
                })}
                <form className="form-login">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input value={this.state.email} onChange={this.onEmailChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input value={this.state.password} onChange={this.onPasswordChange} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Enter password"/>
                    </div>
                    <button onClick={this.onSubmit} type="submit" className="btn btn-outline-info login-button">Log in</button>
                    <Link className="btn btn-outline-secondary" to="/">Back</Link>
                </form>
            </div>
        )
    }
}

export default Login;