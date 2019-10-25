import React from 'react';

import './Header.scss';

export default function (props) {

    let changeAuth = event => {
        event.currentTarget.lastChild.classList.toggle('right');

        event.currentTarget.children[0].classList.toggle('white-font');
        event.currentTarget.children[1].classList.toggle('black-font');

        props.changeAuthType();
    }

    // render() {
    return (
        <div className="Header">
            <div className="Header__logo">
                <img src="icon.png" alt="" />
            </div>
            {localStorage.getItem('name') ?
                <div className="Header__name"><i className="fas fa-user-circle"></i>&nbsp;&nbsp;{localStorage.getItem('name')}</div>
                :
                <div className="Header__switch" onClick={changeAuth}>
                    <span className="log-in">Log In</span>
                    <span className="sign-up">Sign Up</span>
                    <span className="moved-bg"></span>
                </div>
            }
        </div>
    );
};
