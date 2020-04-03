import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';

const UpdatePost = props => {

    const [state, setState] = useState({
        title: '',
        content: '',
        slug: '',
        user: ''
    })

    const { title, content, slug, user} = state;

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
            .then(response => {
                const {title, content, slug, user} = response.data
                setState({...state, title, content, slug, user})
            })
            .catch(err => console.error(err));
    }, []);

    // Onchange event handler
    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.value });
    }

    const handleSubmit = event => {
        event.preventDefault();

        axios
            .put(`${process.env.REACT_APP_API}/post/${slug}`, {title, content, user})
            .then(response => {
                console.log(response);
                const { title, content, slug, user} = response.data;

                // empty the state
                setState({ ...state, title, content, slug, user });

                //success
                alert(`Post titled "${title}" was updated`);
                
            })
            .catch(error => {
                console.error(error.response);
                console.error(error.response.data.error);
            })
    };

    const showUpdateForm = () => (
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
                <input onChange={handleChange('user')} value={user} type='text' className='form-control' placeholder='Your name' required/>
            </div>
            <div>
                <button className='btn btn-primary'>Create</button>
            </div>
        </form>
    )

    return (
        <div>
            <Nav />
            <div className='container p-5'>
                <h1>Update Post</h1>
                { showUpdateForm() }
            </div>
        </div>
    )
}

export default UpdatePost;