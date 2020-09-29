import React, { Component } from 'react';

class Login extends Component {

    state = {
        credentials: { username: '', password: '' },
        login: false
    }

    // user login
    login = e => {
        console.log('credent:', this.state.credentials)
        fetch('http://127.0.0.1:8000/auth/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.credentials)
        })
            .then(data => data.json())
            .then(data => { this.props.userLogin(data.id, this.state.credentials.username, this.state.credentials.password) })
        this.setState({
            credentials: {
                username: '',
                password: '',
                login: true
            }
        })

    }
    // user register
    register = e => {
        fetch('http://127.0.0.1:8000/account/users/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.credentials)
        })
            .then(data => data.json())
            .then(data => { console.log(data) })
            .catch(err => console.log(err))
        this.setState({
            credentials: {
                username: '',
                password: ''
            }
        })
    }

    inputChanged = e => {
        const cred = this.state.credentials;
        cred[e.target.name] = e.target.value;
        this.setState({
            credentials: cred
        })
    }

    render() {
        return (
            <div>
                <h4 style={{ marginBottom: '20px', marginTop: '10px', marginLeft: '40%' }}>Login / Register User</h4>
                <div style={{ marginLeft: '30%', marginTop: '10px' }}>
                    <label>User Name: </label>
                    <input style={{ marginLeft: '5px' }} type="text" name="username" value={this.state.credentials.username} onChange={this.inputChanged} />
                    <label style={{ marginLeft: '5px' }}>Password: </label>
                    <input style={{ marginLeft: '5px' }} type="password" name="password" value={this.state.credentials.password} onChange={this.inputChanged} />
                    <button button onClick={this.login} style={{ marginBottom: '10px', marginLeft: '5px' }}>Login</button>
                    <button onClick={this.register} style={{ marginBottom: '10px', marginLeft: '5px' }}>Register</button>
                </div>
            </div >
        )
    }
}

export default Login;