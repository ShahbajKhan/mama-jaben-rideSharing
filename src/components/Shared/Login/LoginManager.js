import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

// Firebase app initialize
export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
    }
}

// Handle google sign in
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                displayName: displayName,
                email: email,
                photo: photoURL,
                isSignedIn: true,
                error: ''
            }
            // storeAuthToken();
            return signedInUser;
        })
        .catch(error => {
            const user = {};
            user.error = error.message;
            user.isSignedIn = false;
            return user;
        })
}

// Handle Facebook sign in
export const handleFacebookSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
        .then((res) => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                displayName: displayName,
                email: email,
                photo: photoURL,
                isSignedIn: true,
                error: ''
            }

            return signedInUser;
        }
        )
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            const user = {};
            user.error = error.message;
            user.isSignedIn = false;
            return user;
        });
}
export const updateUsername = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    }).then(function () {

        console.log("Username updated successfully");
    }).catch(function (error) {

        console.log(error)
    });
}

// Create User with Email and Password
export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                displayName: name,
                email: email,
                photo: photoURL,
                isSignedIn: true,
                error: ''
            }

            return signedInUser;
        })
        .catch((error) => {
            const User = {};
            User.error = error.message;
            User.isSignedIn = false;
            return User;
        });
}

// Login using email and password
export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            const user = res.user;
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                displayName: displayName,
                email: email,
                photo: photoURL,
                isSignedIn: true,
                error: ''
            }
            // storeAuthToken();
            return signedInUser;
        })
        .catch((error) => {
            const user = {};
            user.error = error.message;
            user.isSignedIn = false;
            return user;
        });
}
// JWT store auth token
export const storeAuthToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function (idToken) { 
            sessionStorage.setItem('token', idToken);
        }).catch(function (error) {
            // Handle error
        });
}