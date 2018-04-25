import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Image } from 'semantic-ui-react'
import SingOutButton from '../user/SignOut'
import * as routes from '../../constants/routes'
import gravatarUrl from 'gravatar-url';
const Navigation = ({authUser}) =>
  <div>
      { authUser
        ? <NavigationAuth user={authUser}/>
        : <NavigationDefault/>
      }
 </div>

const NavigationAuth = ({user}) =>
  <Menu secondary pointing>
        <Menu.Item as={Link} to={routes.FEED}>Feed</Menu.Item>
        <Menu.Menu position="right">
            <Dropdown trigger={<Image avatar src={gravatarUrl(user.email, {default: "retro"})}/>}>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={routes.ACCOUNT}>Account</Dropdown.Item>
                    <Dropdown.Item as={SingOutButton}></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>
  </Menu>

const NavigationDefault = () =>
    <Menu secondary pointing>
        <Menu.Item as={Link} to={routes.SIGN_IN}>Sign In</Menu.Item>
        <Menu.Item as={Link} to={routes.SIGN_UP}>Sign Up</Menu.Item>
        <Menu.Item as={Link} to={routes.LANDING}>Landing</Menu.Item>
    </Menu>


const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
