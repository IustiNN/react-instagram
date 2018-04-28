import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import PostItem from './PostItem';

const PostList = ({posts}) => (
    <div>
      {
          Object.keys(posts).map(key =>
          <PostItem key={key} post={posts[key]}/>
        )
      }
    </div >
)

export default PostList