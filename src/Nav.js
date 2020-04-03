import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
    <nav >
        <ul className='nav nav-tabs'>
            <li className='nav-item p-2'>MERN CRUD</li>
            <li className='nav-item p-2'>
                <Link to='/'>Home</Link>
            </li>
            <li className='nav-item p-2'>
                <Link to='/create'>Create</Link>
            </li>
            <li className='nav-item ml-auto p-2'>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    </nav>
)

export default Nav;