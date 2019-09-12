import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

// Redirects user if the user is not authenticated
function Auth(Component) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
                redirect: false
            }
        }

        componentDidMount() {
            axios.get('http://localhost:7000/api/user/token')
                .then(res => {
                    if(res.data.token !== null) {
                        this.setState({
                            loading: false
                        });
                    } else {
                        // REDIRECT THE USER
                        this.setState({
                            loading: false,
                            redirect: true
                        });
                    }
                })
                .catch(err => {
                    this.setState({
                        loading: false,
                        redirect: true
                    });
                })
        }

        render() {
            const { loading, redirect } = this.state;
            if(loading) {
                return null;
            }
            if(redirect) {
                return <Redirect to="/login" />;
            }
            return (
                <React.Fragment>
                    <Component {...this.props} />
                </React.Fragment>
            )
        }
    }
};

// Redirects user if the user is authenticated
function NoAuth(Component) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
                redirect: false
            }
        }

        componentDidMount() {
            axios.get('http://localhost:7000/api/user/token')
            .then(res => {
                if(res.data.token === null) {
                    // REDIRECT THE USER
                    this.setState({
                        loading: false
                    });
                } else {
                    this.setState({
                        loading: false,
                        redirect: true
                    });
                }
            })
            .catch(err => {
                alert(err);
                this.setState({
                    loading: false,
                    redirect: true
                });
            })
        }

        render() {
            const { loading, redirect } = this.state;
            if(loading) {
                return null;
            }
            if(redirect) {
                return <Redirect to="/list" />;
            }
            return (
                <React.Fragment>
                    <Component {...this.props} />
                </React.Fragment>
            )
        }
    }
}

export  { Auth, NoAuth };