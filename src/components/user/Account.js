import React from 'react';
import {
    withRouter,
    Link
} from 'react-router-dom';
// import ChangePasswordPage from './ChangePassword';
// import ForgotPasswordPage from './ForgotPassword';
import AuthUserContext from '../AuthUserContext';

import * as routes from '../../constants/routes';

const AccountPage = ({ history, authUser }) => {
    return (
        <AuthUserContext.Consumer>
            {
                authUser =>
                authUser &&
                <div>
                    Welcome {authUser.email}
                    <ul>
                        <li><Link to={routes.CHANGE_PASSWORD}>Change Password</Link></li>
                        <li><Link to={routes.FORGOT_PASSWORD}>Forgot Password</Link></li>
                    </ul>
                </div>
            }
        </AuthUserContext.Consumer>
    );
};

export default withRouter(AccountPage);