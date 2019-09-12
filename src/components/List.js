import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../resources/css/List.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
        this.counter = 0;
    }

    componentDidMount() {
        // Get all movies which belong to the user
        axios.get('http://localhost:7000/api/movie')
            .then(res => {
                this.counter = 0;
                this.setState({
                    list: res.data
                })
            })
            .catch(err => {
                throw err;
            });
    }

    onButtonClick = (e) => {
        axios.get('http://localhost:7000/api/user/logout')
            .then(res => {
                if(res.status === 200) {
                    this.props.history.push('/login');
                } else {
                    alert('Cannot logout the user');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    onDeleteClick = (id) => {
        axios.delete(`http://localhost:7000/api/movie/delete/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then(res => {
            axios.get('http://localhost:7000/api/movie')
            .then(res => {
                this.counter = 0;
                this.setState({
                    list: res.data
                })
            })
            .catch(err => {
                throw err;
            });
        })
        .catch(err => {
            throw err;
        });
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr className="text-center">
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Year</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.list.map(movie => {
                            return (
                                <tr key={movie._id} className="text-center">
                                    <th scope="row">{++this.counter}</th>
                                    <td>{movie.title}</td>
                                    <td>{movie.year}</td>
                                    <td>{movie.genre}</td>
                                    <td width="20%">
                                        <Link to={`/edit/${movie._id}`} className="btn btn-outline-success">Edit</Link>
                                        <button onClick={() => this.onDeleteClick(movie._id)} className="btn btn-outline-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Link to="/add" className="btn btn-outline-primary">Add</Link>
                <button onClick={this.onButtonClick} className="btn btn-outline-danger">Logout</button>
            </div>
        )
    }
}

export default List;