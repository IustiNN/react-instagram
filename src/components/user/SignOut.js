import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { auth } from '../../firebase';

const SingOutButton = () => {
    return (
        <Dropdown.Item text='Log out' onClick={auth.doSignOut} />
    )
}

export default SingOutButton;