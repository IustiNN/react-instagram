import React, { Component } from 'react';
import {
    withRouter
} from 'react-router-dom';
import { auth } from '../../firebase';

import * as routes from '../../constants/routes';
import SingOutButton from './SignOut';

const ChangePasswordPage = ({ history }) => {
    return (
        <div>
            <h1>Change Password</h1>
            <ChangePasswordForm history={history}></ChangePasswordForm>
        </div>
    );
};

const INITIAL_STATE = {
    newPassword: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class ChangePasswordForm extends Component {
    constructor(props) {
        super(props)
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {
            newPassword
        } = this.state;

        const {
            history
        } = this.props;
        event.preventDefault();
        auth.doChangePassword(newPassword)
        .then(() => {
            // reset the form inputs and redirect to feed
            this.setState(() => ({ ...INITIAL_STATE }));
            console.log('Password Changed!');
            history.push(routes.FEED);
        }, (error) => {
            this.setState(byPropKey('error', error));
            console.log(error);
        });
    }

    render() {
        const {
            newPassword,
            error,
        } = this.state;

        const isInvalid =
            newPassword === '';
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    value={newPassword}
                    onChange={event => this.setState(byPropKey('newPassword', event.target.value))}
                    type="password"
                    placeholder="Your new password" />

                <button type="submit" disabled={isInvalid}>Change Password</button>

                {error && 
                    <div>
                        <p>{error.message}</p>
                        <br/> 
                        <SingOutButton/>
                    </div>
                }

            </form>
        )
    }
}

export {
    ChangePasswordForm
}

export default withRouter(ChangePasswordPage);