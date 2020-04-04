import React, {useState, useEffect} from 'react';
import Nav from './Nav';
import axios from 'axios';
import {Link} from 'react-router-dom';
import renderHTML from 'react-render-html';
import {getUser} from './helpers';

const App = () => {

  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios
      .get(`${process.env.REACT_APP_API}/posts`)
      .then(response => {
        console.log(response);
        setPosts(response.data);
      })
      .catch(error => console.error(`Error fetching posts`))
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deleteConfirm = slug => {
    let answer = window.confirm('Delete post?');
    if (answer) {
      deletePost(slug);
    }
  }

  const deletePost = slug => {
    console.log('delete', slug, 'post');
    axios
      .delete(`${process.env.REACT_APP_API}/post/${slug}`)
      .then(response => {
        alert(response.data.message);
        fetchPosts();
      })
      .catch(error => alert(`${error}`));
  }

  return (
    <div>
      <Nav />
      <div className='container p-5'>
        <h1>MERN CRUD</h1>
        <br />
        {
          posts.map((post, i) => (
            <div className='row' key={post._id} style={{ borderBottom: '1px solid silver'}}>
              <div className='col pt-3 pb-2'>

                <div className='row'>
                  <div className='col-md-9'>
                    <Link to={`/post/${post.slug}`}><h2>{post.title}</h2></Link>
                    <div 
                      className='lead'
                    >
                        { renderHTML(post.content.substring(0, 100)) }
                    </div>
                    <p>
                      Author <span className='badge'>{post.user}</span> Published on {' '}
                      <span className='badge'>{new Date(post.createdAt).toLocaleString()}</span>
                    </p>
                  </div>
                  { getUser() && (
                  <div className='col-md-3'>
                    <Link 
                      to={`/post/update/${post.slug}`} 
                      className='btn btn-outline-warning m-1'>
                        Update
                    </Link>
                    <button 
                      onClick={ () => deleteConfirm(post.slug) } 
                      type="button" 
                      className="btn btn-outline-danger m-1">
                        Delete
                    </button>
                  </div>
                  )}
                </div>

              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
export default App;
