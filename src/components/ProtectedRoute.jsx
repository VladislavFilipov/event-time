import React from "react";
import { Route, Redirect } from "react-router-dom";
// import auth from "../auth";

export const ProtectedRoute = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={props => {
                // if (auth.isAuthenticated()) {
                if (localStorage.getItem('token')) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/auth",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};
