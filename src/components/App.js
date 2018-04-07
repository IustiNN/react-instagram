import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route 
} from 'react-router-dom';
import { firebase } from '../firebase';

import Navigation from './common/Navigation';
import SignUpPage from './user/SignUp';
import SignInPage from './user/SignIn';
import ForgotPasswordPage from './user/ForgotPassword';
import AccountPage from './user/Account';
import FeedPage from './feed/Feed';
import LandingPage from './feed/Landing';

import * as routes from '../constants/routes';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }
  
  
  render () {
    return (
      <Router>
        <div>
          <Navigation authUser={this.state.authUser} />

          <hr />

          <Route
            exact path={routes.LANDING}
            component={() => <LandingPage />}
          />
          <Route
            exact path={routes.SIGN_UP}
            component={() => <SignUpPage />}
          />
          <Route
            exact path={routes.SIGN_IN}
            component={() => <SignInPage />}
          />
          <Route
            exact path={routes.FORGOT_PASSWORD}
            component={() => <ForgotPasswordPage />}
          />
          <Route
            exact path={routes.FEED}
            component={() => <FeedPage />}
          />
          <Route
            exact path={routes.ACCOUNT}
            component={() => <AccountPage />}
          />
        </div>
      </Router>
    )
  }
}


export default App;