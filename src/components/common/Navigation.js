import React from 'react';
import { Link } from 'react-router-dom';
import SingOutButton from '../user/SignOut';
import AuthUserContext from '../AuthUserContext';
import * as routes from '../../constants/routes';
const Navigation = ({authUser}) =>
    <AuthUserContext.Consumer>
        {
            authUser => authUser
            ? <NavigationAuth/>
            : <NavigationDefault/>
        }
    </AuthUserContext.Consumer>

const NavigationAuth = () =>
    <div>
        <ul>
            <li><Link to={routes.FEED}>Feed</Link></li>
            <li><Link to={routes.ACCOUNT}>Account</Link></li>
            <li><SingOutButton /></li>
        </ul>
    </div>

const NavigationDefault = () => 
    <div>
        <ul>
            <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
            <li><Link to={routes.SIGN_UP}>Sign Up</Link></li>
            <li><Link to={routes.LANDING}>Landing</Link></li>
        </ul>
    </div>
    
export default Navigation;
