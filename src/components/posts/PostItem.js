import React from 'react'
import {Card, Image, Icon} from 'semantic-ui-react';
import moment from 'moment';

const PostItem = ({post}) => (
  <Card>
    <Image src={post.media} />
    <Card.Content>
      <Card.Header>
        Matthew
      </Card.Header>
      <Card.Meta>
        <span className='date'>
          Uploaded {moment(post.uploadedAt, "YYYYMMDD").fromNow()}
        </span>
      </Card.Meta>
      <Card.Description>
        {post.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>
)

export default PostItem