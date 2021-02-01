import firebase from "firebase/app";
import { auth as firebaseAuthUi } from "firebaseui";
import "firebase/auth";
/*For local testing uncomment the below. Use local firebase project configs*/
//import AuthConfig from "../../firebase.auth.json";

//firebase.initializeApp(AuthConfig);
/*Till here */

let ui = null;
let auth = null;
let noCredentialsHelper = null;
let authReady = null;

fetch('/__/firebase/init.json').then(async response => {
  firebase.initializeApp(await response.json());

  /*Comment below lines*/
  ui = new firebaseAuthUi.AuthUI(firebase.auth());
  auth = firebase.auth;
  noCredentialsHelper = firebaseAuthUi.CredentialHelper.NONE;

  authReady = () =>
  new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      user => {
        unsubscribe();
        resolve(user);
      },
      error => {
        unsubscribe();
        reject(error);
      }
    );
  });

});

/*Uncomment below lines */
// ui = new firebaseAuthUi.AuthUI(firebase.auth());
// auth = firebase.auth;
// noCredentialsHelper = firebaseAuthUi.CredentialHelper.NONE;

// authReady = () =>
//   new Promise((resolve, reject) => {
//     const unsubscribe = firebase.auth().onAuthStateChanged(
//       user => {
//         unsubscribe();
//         resolve(user);
//       },
//       error => {
//         unsubscribe();
//         reject(error);
//       }
//     );
//   });


export { firebase, ui, authReady, auth, noCredentialsHelper };