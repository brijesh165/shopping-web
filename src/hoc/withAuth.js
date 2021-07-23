import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { getToken } from './../utils/common';

const token = getToken();
const WithAuth = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            token ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/login" }} />
            )
        }
    />
)


export default WithAuth;