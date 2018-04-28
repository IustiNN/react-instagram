import { db } from './firebase';

// User API

export const doCreateUser = (id, email) =>

    db.collection("users").doc(id).set({
        email
    });

export const onceGetUsers = () =>
    db.collection("users").get()

// Other Entity APIs ...

// Add post
export const doCreatePost = (postData) =>
    db.collection("posts").add({
        media: postData.media,
        description: postData.description,
        uploadedAt: postData.uploadedAt
    })

// Get posts
export const doGetFeed = () =>
    db.collection("posts").get()
