const INITIAL_STATE = {
  posts: {},
};

const applySetPosts = (state, action) => ({
  ...state,
  posts: action.posts
});

function postReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'POSTS_SET': {
      return applySetPosts(state, action);
    }
    default: return state;
  }
}

export default postReducer;