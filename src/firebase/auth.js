import { auth } from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

//Sing In
export const doSignInWithEmailAndPassword = (email, password) => {
    auth.signInWithEmailAndPassword(email, password);
}

//Sing Out
export const doSignOut = () => {
    auth.signOut();
}

// Reset Password
export const doResetPassword = (email) => {
    auth.sendPasswordResetEmail(email);
}

// Change Password
export const doChangePassword = (newPassword) => {
    auth.currentUser.updatePassword(newPassword);
}