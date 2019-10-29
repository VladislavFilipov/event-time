import React from 'react';

import { inputHandler, focusHandler, blurHandler } from '../usingFuncs';

export default function (props) {
    return (
        <label>
            <div>{props.title}</div>
            <input
                type={props.type}
                className={`LogIn__input ${props.class}`}
                onInput={inputHandler}
                onFocus={focusHandler}
                onBlur={blurHandler}
            />
        </label>
    );
}