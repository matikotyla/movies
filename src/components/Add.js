import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cam from '../resources/images/cam.png';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            year: '',
            genre: '',
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
            url: 'http://localhost:7000/api/movie/create',
            data: JSON.stringify({
                title: this.state.title,
                year: this.state.year,
                genre: this.state.genre
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then(res => {
            if(res.status === 200) {
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
            });
        });
    }

    render() {
        return (
            <div className="jumbotron login-jumbo text-center">
                <img alt="cinema" width="128" height="128" src={cam} />
                <p className="lead login-info">Add movie</p>
                <hr className="my-4" />
                {this.state.errors !== undefined && 
                this.state.errors.title !== undefined &&
                this.state.errors.title.map(error => {
                    return (
                        <div key={error} className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )
                })}
                {this.state.errors !== undefined && 
                this.state.errors.year !== undefined &&
                this.state.errors.year.map(error => {
                    return (
                        <div key={error} className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )
                })}
                {this.state.errors !== undefined && 
                this.state.errors.genre !== undefined &&
                this.state.errors.genre.map(error => {
                    return (
                        <div key={error} className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )
                })}
                <form onSubmit={this.onSubmit} className="form-login">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Title</label>
                        <input value={this.state.title} onChange={this.onChange} type="text" name="title" className="form-control" id="exampleInputTitle" placeholder="Enter title"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Year</label>
                        <input value={this.state.year} onChange={this.onChange} type="number" name="year" className="form-control" id="exampleInputYear" placeholder="Enter year"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Genre</label>
                        <input value={this.state.genre} onChange={this.onChange} type="text" name="genre" className="form-control" id="exampleInputGenre" placeholder="Enter genre"/>
                    </div>
                    <button type="submit" className="btn btn-outline-info">Add</button>
                    <Link className="btn btn-outline-secondary" to="/list">Back</Link>
                </form>
            </div>
        )
    }
}

export default Add;