import React from 'react';
import { useSelector } from 'react-redux';

import Login from './Login';
import Logout from './Logout';

import "../styles/Header.css";
import logo from './Logo.png';

export default function Header() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <div className="header">
          <div className='firstRow'>
            <table align="center">
            <tr>
                <td align="right"><img src={logo} width='100px' ></img></td>
                <td align="left">+7-8352-20-12-09,  telegram &emsp;</td>
            </tr>
            </table>
            <div className="h-container">
                <div className={`h-wrapper${isAuthenticated ? ' with-margin' : ''}`}>
                    <div className="sign-up">
                        {isAuthenticated ? <Logout /> : <Login />}
                    </div>
                </div>
            </div>
         </div>

            <div className='title'>
                    <h1> Электронная сервисная книжка "Мой Силант" </h1>
            </div>
        </div >
    )
}
