import React, { Component } from 'react';
import {
    withRouter
} from 'react-router-dom';
import { auth } from '../../firebase';
import { SingUpLink } from './SignUp';

import * as routes from '../../constants/routes';

const SignInPage = ({ history }) => {
    return (
        <div>
            <h1>Sing in</h1>
            <SingInForm history={history}></SingInForm>
            <SingUpLink/>
        </div>
    );
};

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class SingInForm extends Component {
    constructor(props) {
        super(props)
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {
            email,
            password
        } = this.state;

        const {
            history
        } = this.props;
        event.preventDefault();
        auth.doSignInWithEmailAndPassword(email, password)
        .then(() => {
            // reset the form inputs and redirect to feed
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.FEED);
        }, (error) => {
            this.setState(byPropKey('error', error));
            console.log(error);
        });
    }

    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="email"
                    placeholder="Email" />
                <input
                    value={password}
                    onChange={event => this.setState(byPropKey('password', event.target.value))}
                    type="password"
                    placeholder="Password" />

                <button type="submit" disabled={isInvalid}>Sign in</button>

                {error && <p>{error.message}</p>}

            </form>
        )
    }
}

export {
    SingInForm
}

export default withRouter(SignInPage);