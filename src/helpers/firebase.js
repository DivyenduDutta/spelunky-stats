import firebase from "@firebase/app";
//import {auth as firebaseAuthui} from 'firebaseui';
import "@firebase/auth";

//import firebase ui normally if running on local node server. See index.html for other changes

window.firebase = firebase;

let ui = null;
let auth = null;
let noCredentialsHelper = null;
let authReady = null;

console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV === 'production'){
  /*For production */

  fetch('/__/firebase/init.json').then(async response => {
    firebase.initializeApp(await response.json());
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
  //ui = new firebaseAuthui.AuthUI(firebase.auth());
  auth = firebase.auth;
  noCredentialsHelper = window.firebaseui.auth.CredentialHelper.NONE;
  //noCredentialsHelper = firebaseAuthui.CredentialHelper.NONE;

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