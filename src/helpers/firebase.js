import firebase from "@firebase/app";
//import {auth as firebaseAuthUi} from 'firebaseui';
import "@firebase/auth";

window.firebase = firebase;

let ui = null;
let auth = null;
let noCredentialsHelper = null;
let authReady = null;

console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV === 'production'){
  /*For production */

  fetch('/__/firebase/init.json').then(async response => {
    console.log('keke');
    firebase.initializeApp(await response.json());
    console.log('heh');
    ui = new window.firebaseui.auth.AuthUI(firebase.auth());
    auth = firebase.auth;
    noCredentialsHelper = window.firebaseui.auth.CredentialHelper.NONE;

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

  ui = new window.firebaseui.auth.AuthUI(firebase.auth());
  auth = firebase.auth;
  noCredentialsHelper = window.firebaseui.auth.CredentialHelper.NONE;

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