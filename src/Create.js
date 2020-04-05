import React, { useState } from 'react';
import Nav from './Nav';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { getUser, getToken } from './helpers';
import 'react-quill/dist/quill.snow.css';

const Create = () => {

    // state
    const [state, setState] = useState({
        title: '',
        user: getUser()
    });

    const [content, setContent] = useState('');

    // Rich text editor handle change
    const handleContent = event => {
        console.log(event);
        setContent(event);
    }

    // destructure values from state
    const {title, user} = state;

    // onChange event handler
    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.value });
    };

    // Handle the submit
    const handleSubmit = event => {
        event.preventDefault();

        axios
            .post(`${process.env.REACT_APP_API}/post`, { title, content, user }, {
                headers: {
                    authorization: `Bearer ${ getToken() }`
                }
            })
            .then(response => {
                console.log(response);

                //Now empty the space
                setState({ ...state, title: ''});
                setContent('');

                //Success message
                alert(`Post created ${response.data.title}`)
            })
            .catch(error => {
                console.error(error.response);
                console.error(error.response.data.error);
                alert(error);
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
                        <ReactQuill 
                            onChange = { handleContent } 
                            value = { content } 
                            theme = 'snow'
                            placeholder = 'Content here' 
                            required />
                    </div>
                    <div className='form-group'>
                        <label className='text-muted'>User</label>
                        <input 
                            onChange={handleChange('user')} 
                            value={ user || 'Anonymous 🤔' } 
                            type='text' 
                            className='form-control' 
                            placeholder='Your name' 
                            required />
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