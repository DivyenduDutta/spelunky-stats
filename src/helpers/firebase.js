import firebase from "firebase/app";
import { auth as firebaseAuthUi } from "firebaseui";
import "firebase/auth";


let ui = null;
let auth = null;
let noCredentialsHelper = null;
let authReady = null;

if(process.env.NODE_ENV === 'production'){
  /*For production */

  fetch('/__/firebase/init.json').then(async response => {
    firebase.initializeApp(await response.json());

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
}

if(process.env.NODE_ENV === 'development'){
  /*For local/dev purposes */
  const AuthConfig = require( "../../firebase.auth.json");
  firebase.initializeApp(AuthConfig);
  

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
  }


export { firebase, ui, authReady, auth, noCredentialsHelper };