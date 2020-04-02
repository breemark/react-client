import React, { useState } from 'react';
import Nav from './Nav';
import axios from 'axios';

const Create = () => {

    // state
    const [state, setState] = useState({
        title: '',
        content: '',
        user: ''
    });

    // destructure values from state
    const {title, content, user} = state;

    // onChange event handler
    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.value });
    };

    // Handle the submit
    const handleSubmit = event => {
        event.preventDefault();

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
    }

    return (
        <div>
            <Nav />
            <div className='container p-5'>
                <h1>Create Post</h1>
                <br />
                <form onSubmit={handleSubmit} >
                    <div className='form-group'>
                        <label className='text-muted'>Title</label>
                        <input onChange={handleChange('title')} value={title} type='text' className='form-control' placeholder='Title' required />
                    </div>
                    <div className='form-group'>
                        <label className='text-muted'>Content</label>
                        <textarea onChange={handleChange('content')} value={content} type='text' className='form-control' placeholder='Content here' rows='5' required />
                    </div>
                    <div className='form-group'>
                        <label className='text-muted'>User</label>
                        <input onChange={handleChange('user')} value={user} type='text' className='form-control' placeholder='Your name' required />
                    </div>
                    <div>
                        <button className='btn btn-primary'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Create;