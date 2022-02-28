import React from "react";
import { Redirect, Route } from "react-router-dom";
import CONFIG_NAMES from '../configs'

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const isAuthenticated = localStorage.getItem(CONFIG_NAMES.AUTH_TOKEN);

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
}

export default ProtectedRoute;
