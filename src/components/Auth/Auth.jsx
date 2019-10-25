import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

import Header from '../Header/Header';
import LogIn from './LogIn';
import SignUp from './SignUp';

import './Auth.scss';

export default function (props) {
    let [authType, setAuthType] = useState(0);
    // let history = useHistory();

    return (
        <div className="Auth">
            <Header changeAuthType={() => setAuthType(authType === 0 ? 1 : 0)} />
            {authType === 0 ? <LogIn /> : <SignUp />}
        </div>
    );

};
