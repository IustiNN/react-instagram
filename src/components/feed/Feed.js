import React, { Component } from 'react';
import withAuthorization from '../withAuthorization';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { db } from '../../firebase';
import PostForm from '../posts/PostForm';

class FeedPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
        };
    }

    componentDidMount() {
        const { onSetUsers } = this.props;

        db.onceGetUsers().then(function (querySnapshot) {
            // console.log(querySnapshot.docs);

            let data = querySnapshot.docs.map(function (documentSnapshot) {
                return documentSnapshot.data();
            });

            onSetUsers(data);

            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        });
        // db.onceGetUsers().then(snapshot =>
        //     this.setState(() => ({ users: snapshot.val() }))
        // );
    }

    render() {
        const { users } = this.props;

        return (
            <div>
                <h1>Feed</h1>
                <p>The Feed Page is accessible by every signed in user.</p>

                {!!users && <UserList users={users} />}

                <PostForm/>

            </div>
        );
    }
}

const UserList = ({ users }) =>
    <div>
        <h2>List of Emails of Users</h2>
        <p>(Saved on Sign Up in Firebase Database)</p>

        {Object.keys(users).map(key =>
            <div key={key}>{users[key].email}</div>
        )}
    </div>

const mapStateToProps = (state) => ({
    users: state.userState.users,
});

const mapDispatchToProps = (dispatch) => ({
    onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
});


const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps)
)(FeedPage);