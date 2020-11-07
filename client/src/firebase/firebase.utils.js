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

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj =>{
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collectionsSnapshot => {
  const transformedCollection = collectionsSnapshot.docs.map(docSnapshot =>{
    const {title, items} = docSnapshot.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: docSnapshot.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) =>{
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithRedirect(googleProvider);

export default firebase;
