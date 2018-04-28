import React, { Component } from 'react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import { auth, db } from '../../firebase';

import * as routes from '../../constants/routes';

const INITIAL_STATE = {
  media: '',
  description: '',
  uploadedAt: null,
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      media,
      description,
    } = this.state;

    const postData = {
      media,
      description,
      uploadedAt: new Date()
    }
    db.doCreatePost(postData)
      .then(post => {
        console.log(post);
        // Create a user in your own accessible Firebase Database too
        this.setState(() => ({ ...INITIAL_STATE }));
      }).catch(error => {
        this.setState(byPropKey('error', error));
      });
    event.preventDefault();
  }

  render() {
    const {
      description,
      media,
      error,
    } = this.state;

    const isInvalid =
      description === '';
    // username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input 
                value={media} 
                onChange={event => this.setState(byPropKey('media', event.target.value))}
                type="text"
                placeholder="Url image" />
        <input
          value={description}
          onChange={event => this.setState(byPropKey('description', event.target.value))}
          type="text"
          placeholder="description" />
        <button type="submit" disabled={isInvalid}>Create post</button>

        {error && <p>{error.message}</p>}

      </form>
    )
  }
}

export default PostForm;