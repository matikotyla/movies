import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import camera from '../resources/images/camera.png';

import '../resources/css/Register.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            errors: {}
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        axios({
            method: 'POST',
            url: 'http://localhost:7000/api/user/register',
            data: JSON.stringify({
                name: this.state.name,
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
                this.props.history.push('/login');
            } else {
                this.setState({
                    errors: res.data.errors
                });
            }
        })
        .catch(err => {
            this.setState({
                errors: err.response.data.errors
            });
        });
    }

    render() {
        return (
            <div className="jumbotron login-jumbo text-center">
            <img alt="cinema" width="128" height="128" src={camera} />
            <p className="lead login-info">Register Page</p>
            <hr className="my-4" />
            {this.state.errors !== undefined && 
                this.state.errors.name !== undefined &&
                this.state.errors.name.map(error => {
                    return (
                        <div key={error} className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )
                })}
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
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input value={this.state.name} onChange={this.onChange} type="text" name="name" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" placeholder="Enter name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input value={this.state.email} onChange={this.onChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input value={this.state.password} onChange={this.onChange} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Enter password"/>
                </div>
                <button onClick={this.onSubmit} type="submit" className="btn btn-outline-info login-button">Register</button>
                <Link className="btn btn-outline-secondary" to="/">Back</Link>
            </form>
        </div>
        )
    }
}

export default Register;