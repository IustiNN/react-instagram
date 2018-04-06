import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDQqozvfmcbEx6HCU-ZrgTxXqRdMkTapd0",
    authDomain: "react-instagram-d11f7.firebaseapp.com",
    databaseURL: "https://react-instagram-d11f7.firebaseio.com",
    projectId: "react-instagram-d11f7",
    storageBucket: "react-instagram-d11f7.appspot.com",
    messagingSenderId: "907217772181"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
};