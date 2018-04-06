import React, { Component } from 'react';
import { 
    Link,
    withRouter
} from 'react-router-dom';
import { auth } from '../../firebase'

import * as routes from '../../constants/routes';

const SignUpPage = ({history}) => {
    return (
        <div>
            <h1>Sing up</h1>
            <SingUpForm history={history}></SingUpForm>
        </div>
    );
};

const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    error: null
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class SingUpForm extends Component {
    constructor (props) {
        super(props)
        this.state = { ...INITIAL_STATE };
    }
    
    onSubmit = (event) => {
        const {
            username,
            email,
            password
        } = this.state;
        
        const {
            history
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                console.log(authUser);
                // reset the form inputs
                this.setState(() => ({...INITIAL_STATE}));
                history.push(routes.FEED);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
                console.log(error);
            })
        event.preventDefault();
    }
    
    render () {
        const {
            username,
            email,
            password,
            passwordConfirmation,
            error,
        } = this.state;

        const isInvalid =
            password !== passwordConfirmation ||
            password === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input 
                value={username} 
                onChange={event => this.setState(byPropKey('username', event.target.value))}
                type="text"
                placeholder="Your name" />
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
                <input 
                value={passwordConfirmation} 
                onChange={event => this.setState(byPropKey('passwordConfirmation', event.target.value))}
                type="password"
                placeholder="Confirm Password" />

                <button type="submit" disabled={isInvalid}>Sign up</button>

                {error && <p>{error.message}</p>}

            </form>
        )
    }
}

const SingUpLink = () => {
    return (
        <div>
            <p>Don't have an account?</p>
            <Link to={routes.SIGN_UP}>Sing up</Link>
        </div>
    )
}

export {
    SingUpLink,
    SingUpForm
}

export default withRouter(SignUpPage);