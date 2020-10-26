import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCmKhGZFDfZAU7sGg2WSJpZXmGPzI8hM6w",
    authDomain: "clothing-ecommerce-react-c3cf5.firebaseapp.com",
    databaseURL: "https://clothing-ecommerce-react-c3cf5.firebaseio.com",
    projectId: "clothing-ecommerce-react-c3cf5",
    storageBucket: "clothing-ecommerce-react-c3cf5.appspot.com",
    messagingSenderId: "574138571059",
    appId: "1:574138571059:web:816c98d78b36facff20646",
    measurementId: "G-3DYLNYX6YZ"
  };

export const createUserProfileDocument = async ( userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot =await userRef.get();
if(!snapShot.exists){
  const {displayName, email} = userAuth;
  const createdAt = new Date();
  try{
    await userRef.set({
      displayName,
      email,
      createdAt,
      ...additionalData
    })
  } catch(error){
    console.log('error creating user', error.message);
  }
}
return userRef;
console.log(snapShot);
}

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  //export const signInWithGoogle = () => firebase.auth().signInWithPopup(provider);
  export const signInWithGoogle = () => firebase.auth().signInWithRedirect(provider);

  export default firebase;
