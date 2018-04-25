import React, { Component } from 'react';
import {
    withRouter,
    Link
} from 'react-router-dom';
import { auth } from '../../firebase';

import * as routes from '../../constants/routes';

const ForgotPasswordPage = ({ history }) => {
    return (
        <div>
            <h1>Forgot Password</h1>
            <ResetPasswordForm history={history}></ResetPasswordForm>
        </div>
    );
};

const INITIAL_STATE = {
    email: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class ResetPasswordForm extends Component {
    constructor(props) {
        super(props)
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {
            email
        } = this.state;

        const {
            history
        } = this.props;
        event.preventDefault();
        auth.doResetPassword(email)
            .then(() => {
                // reset the form inputs and redirect to feed
                this.setState(() => ({ ...INITIAL_STATE }));
                console.log('We have sent you an email!');
                history.push(routes.LANDING);
            }, (error) => {
                this.setState(byPropKey('error', error));
                console.log(error);
            });
    }

    render() {
        const {
            email,
            error,
        } = this.state;

        const isInvalid =
            email === '';
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="email"
                    placeholder="Enter your email" />

                <button type="submit" disabled={isInvalid}>Reset Password</button>

                {error &&
                    <div>
                        <p>{error.message}</p>
                    </div>
                }

            </form>
        )
    }
}

const PasswordForgetLink = () =>
    <p>
        <Link to={routes.FORGOT_PASSWORD}>Forgot Password?</Link>
    </p>

export {
    ResetPasswordForm,
    PasswordForgetLink
}

export default withRouter(ForgotPasswordPage);