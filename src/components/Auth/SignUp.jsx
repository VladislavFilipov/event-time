import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import auth from '../../auth';

import { inputHandler, focusHandler, blurHandler } from '../usingFuncs';

export default function () {

    let history = useHistory();

    let onSignupClick = (event) => {
        const
            parent = event.currentTarget.parentElement,
            login = parent.querySelector('.LogIn__input_login').value,
            firstName = parent.querySelector('.LogIn__input_firstname').value,
            lastName = parent.querySelector('.LogIn__input_lastname').value,
            email = parent.querySelector('.LogIn__input_email').value,
            psw = parent.querySelector('.LogIn__input_psw').value,
            repPsw = parent.querySelector('.LogIn__input_rep-psw').value;

        console.log(login, firstName, lastName, email, psw)

        if (psw !== repPsw) return;

        axios({
            method: 'POST',
            url: 'http://195.123.221.101:8080/api/v1/auth/sign-up',
            data: {
                "email": email,
                "firstName": firstName,
                "lastName": lastName,
                "password": psw,
                "username": login
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
                console.log(response.data.username, psw)

                axios({
                    method: 'POST',
                    url: 'http://195.123.221.101:8080/api/v1/auth/sign-in',
                    data: {
                        "username": response.data.username,
                        "password": psw
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => {
                        console.log(res.data);
                        let name = res.data.user.firstName + ' ' + res.data.user.lastName;
                        auth.login(res.data.accessToken, name, () => {
                            history.push("/events-list");
                        });
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="SignUp">
            <label>
                <div>first name</div>
                <input
                    className="LogIn__input LogIn__input_firstname"
                    onInput={inputHandler}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                />
            </label>
            <label>
                <div>last name</div>
                <input
                    className="LogIn__input LogIn__input_lastname"
                    onInput={inputHandler}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                />
            </label>
            <label>
                <div>login</div>
                <input
                    className="LogIn__input LogIn__input_login"
                    onInput={inputHandler}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                />
            </label>
            <label>
                <div>email</div>
                <input
                    className="LogIn__input LogIn__input_email"
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
            <label>
                <div>repeat password</div>
                <input
                    type="password"
                    className="LogIn__input LogIn__input_rep-psw"
                    onInput={inputHandler}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                />
            </label>
            <button onClick={onSignupClick}>sign up</button>
        </div>
    );
};
