import React, { Component } from 'react';
import withAuthorization from '../withAuthorization';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { db } from '../../firebase';
import PostForm from '../posts/PostForm';
import PostList from '../posts/PostList';

class FeedPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
            posts: null
        };
    }

    componentDidMount() {
        const { onSetUsers, onSetPosts } = this.props;

        db.onceGetUsers().then(function (querySnapshot) {
            // console.log(querySnapshot.docs);

            let usersData = querySnapshot.docs.map(function (documentSnapshot) {
                return documentSnapshot.data();
            });

            onSetUsers(usersData);

            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        });
       

        db.doGetFeed().then(function (querySnapshot) {
            // console.log(querySnapshot.docs);

            let postsData = querySnapshot.docs.map(function (documentSnapshot) {
                return documentSnapshot.data();
            });
            console.log(postsData);

            onSetPosts(postsData);

            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        });
    }

    render() {
        const { users, posts } = this.props;

        return (
            <div>
                <h1>Feed</h1>
                <p>The Feed Page is accessible by every signed in user.</p>

                {!!users && <UserList users={users} posts={posts} />}

                <PostForm/>

                <PostList posts={posts}/>

            </div>
        );
    }
}

const UserList = ({ users, posts }) =>
    <div>
        <h2>List of Emails of Users</h2>
        <p>(Saved on Sign Up in Firebase Database)</p>

        {Object.keys(users).map(key =>
            <div key={key}>{users[key].email}</div>
        )}

        <hr/>
    </div>

const mapStateToProps = (state) => ({
    users: state.userState.users,
    posts: state.postState.posts,
});

const mapDispatchToProps = (dispatch) => ({
    onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
    onSetPosts: (posts) => dispatch({ type: 'POSTS_SET', posts }),
});


const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps)
)(FeedPage);