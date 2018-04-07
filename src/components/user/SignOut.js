import React from 'react'
import { auth } from '../../firebase';

const SingOutButton = () => {
    return (
        <div>
            <button type="button" onClick={auth.doSignOut}>Log out</button>
        </div>
    )
}

export default SingOutButton;