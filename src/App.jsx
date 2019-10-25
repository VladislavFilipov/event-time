import React from 'react';
import {
    // BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    // useHistory
    // Link
} from "react-router-dom";

import Auth from './components/Auth/Auth';
import EventsList from './components/EventsList/EventsList';
import { ProtectedRoute } from './components/ProtectedRoute';

import './App.scss';

function App(props) {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/auth"  >
                    {localStorage.getItem('token') ?
                        <Redirect to={{ pathname: '/events-list' }} /> :
                        <Auth />
                    }
                </Route>
                <ProtectedRoute exact path="/events-list" component={EventsList} />
                <Route exact path='/'>
                    {localStorage.getItem('token') ?
                        <Redirect to={{ pathname: '/events-list' }} /> :
                        <Redirect to={{ pathname: '/auth' }} />
                    }
                </Route>
                <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
        </div >
    );
}

export default App;
