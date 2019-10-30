import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Auth from './components/Auth/Auth';
import EventsList from './components/EventsList/EventsList';
import EventPage from './components/EventPage/EventPage';
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
                <ProtectedRoute exact path="/event-page/:meetupId" component={EventPage} />
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
