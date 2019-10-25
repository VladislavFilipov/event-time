import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { inputHandler, focusHandler, blurHandler } from '../usingFuncs';
import auth from '../../auth';

export default function () {

    let history = useHistory();

    let onLoginClick = (event) => {
        const parent = event.currentTarget.parentElement;
        const email = parent.querySelector('.LogIn__input_name').value;
        const psw = parent.querySelector('.LogIn__input_psw').value;

        axios({
            method: 'POST',
            url: 'http://195.123.221.101:8080/api/v1/auth/sign-in',
            data: {
                "username": email,
                "password": psw
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
                let name = response.data.user.firstName + ' ' + response.data.user.lastName;
                auth.login(response.data.accessToken, name, () => {
                    history.push("/events-list");
                });
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="LogIn">
            <label>
                <div>name</div>
                <input
                    className="LogIn__input LogIn__input_name"
                    onInput={inputHandler}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                />
            </label>
            <label>
                <div>password</div>
                <input
                    type="password"
                    className="LogIn__input LogIn__input_psw"
                    onInput={inputHandler}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                />
            </label>
            <button onClick={onLoginClick}>log in</button>
            <div className="LogIn__alternative">Or Log in with</div>
            <div className="LogIn__icons">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-vk"></i>
                <i className="fab fa-instagram"></i>
            </div>
        </div>
    );
};