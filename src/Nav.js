import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
    <nav style={{position: 'fixed'}}>
        <ul className='nav nav-tabs'>
            <li className='nav-item p-2'>MERN CRUD</li>
            <li className='nav-item p-2'>
                <Link to='/'>Home</Link>
            </li>
            <li className='nav-item p-2'>
                <Link to='/create'>Create</Link>
            </li>
        </ul>
    </nav>
)

export default Nav;