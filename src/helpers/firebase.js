import firebase from "firebase/app";
import { auth as firebaseAuthUi } from "firebaseui";
import "firebase/auth";
//import AuthConfig from "../../firebase.auth.json";

//firebase.initializeApp(AuthConfig);

let ui = null;
let auth = null;
let noCredentialsHelper = null;

fetch('/__/firebase/init.json').then(async response => {
  firebase.initializeApp(await response.json());
  ui = new firebaseAuthUi.AuthUI(firebase.auth());
  auth = firebase.auth;
  noCredentialsHelper = firebaseAuthUi.CredentialHelper.NONE;
});



export { firebase, ui, auth, noCredentialsHelper };