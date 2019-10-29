import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import auth from '../../auth';
import InputField from './InputField';

export default function () {

    let history = useHistory();

    let onLoginClick = (event) => {
        const parent = event.currentTarget.parentElement;
        const email = parent.querySelector('.LogIn__input_name');
        const psw = parent.querySelector('.LogIn__input_psw');

        axios({
            method: 'POST',
            url: 'http://195.123.221.101:8080/api/v1/auth/sign-in',
            data: {
                "username": email.value,
                "password": psw.value
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
            .catch(err => {
                console.log(err);

                email.classList.add('error');
                psw.classList.add('error');
            });
    }

    return (
        <div className="LogIn">
            <InputField title="name" type="text" class="LogIn__input_name" />
            <InputField title="password" type="password" class="LogIn__input_psw" />
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