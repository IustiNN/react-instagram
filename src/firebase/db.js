import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>

    db.collection("users").add({
        username,
        email
    })

export const onceGetUsers = () =>
    db.collection("users").get()

// Other Entity APIs ...

// Add post
export const doCreatePost = (description) =>
    db.collection("posts").add({
        description,
    })

// Get posts
export const doGetFeed = () =>
    db.collection("posts").get()
