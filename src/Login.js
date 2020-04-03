import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from './Nav';

const Login = () => {

    // create a State
    const [state, setState] = useState({
        name: '',
        password: ''
    })

    const { name, password } = state;

    // onChange event handler
    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.value });
    };

    // Handle the submit
    const handleSubmit = event => {
        event.preventDefault();
        /*
        axios
            .post(`${process.env.REACT_APP_API}/post`, { title, content, user })
            .then(response => {
                console.log(response);

                //Now empty the space
                setState({ ...state, title: '', content: '', user: ''});

                //Success message
                console.log(`Post created ${response.data.title}`)
            })
            .catch(error => {
                console.error(error.response);
                console.error(error.response.data.error)
            });
        */
    }

    return (
        <div>
            <Nav />
            <div className='container p-5'>
                <h1>Log In</h1>
                <br />
                <form onSubmit={handleSubmit} >
                    <div className='form-group'>
                        <label className='text-muted'>Username</label>
                        <input 
                            onChange={handleChange('name')} 
                            value={name} 
                            type='text' 
                            className='form-control' 
                            placeholder='Username' 
                            required />
                    </div>
                    <div className='form-group'>
                        <label className='text-muted'>Password</label>
                        <input 
                            onChange={handleChange('password')} 
                            value={password} 
                            type='password' 
                            className='form-control' 
                            placeholder='Password' 
                            required />
                    </div>
                    <div>
                        <button className='btn btn-primary'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Login;