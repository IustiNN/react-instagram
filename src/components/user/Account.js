import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
// import ChangePasswordPage from './ChangePassword';
// import ForgotPasswordPage from './ForgotPassword';
import withAuthorization from '../withAuthorization';


import * as routes from '../../constants/routes';

const AccountPage = ({ authUser }) => {
    return (
        <div>
            {
                authUser &&
                <div>
                    Welcome {authUser.email}
                    <ul>
                        <li><Link to={routes.CHANGE_PASSWORD}>Change Password</Link></li>
                        <li><Link to={routes.FORGOT_PASSWORD}>Forgot Password</Link></li>
                    </ul>
                </div>
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps)
)(AccountPage);