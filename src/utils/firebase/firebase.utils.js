// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc, collection, getDocs, writeBatch, query} from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyADSrsdTXQgNWKVpSTn1bKj1c9UZ6jQQjg",
    authDomain: "crwn-db-e3b27.firebaseapp.com",
    projectId: "crwn-db-e3b27",
    storageBucket: "crwn-db-e3b27.firebasestorage.app",
    messagingSenderId: "892129035059",
    appId: "1:892129035059:web:eb7f6d8825ef4da03a3446"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({prompt: 'select_account'})
const auth = getAuth()
export const signInWithGooglePopup = () =>
    signInWithPopup(auth, provider);


const db = getFirestore()

export const addCollectionToDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db);
    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })

    await batch.commit()
    console.log('done')
}

export const getCollectionAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    const catgegoriesMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})

    return catgegoriesMap;

}

export const createUserDocument = async (userObject) => {
    const userDocRef = doc(db, 'users', userObject.uid)
    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        const {displayName, email} = userObject;
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {displayName, email, createdAt})
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userDocRef
}


export const createAuthUserWithEnP = async (emailInput, password, displayName) => {
    if (!emailInput || !password) return;
    const response = await createUserWithEmailAndPassword(auth, emailInput, password)
    const {uid, email} = response.user;

    const userDocRef = doc(db, 'users', uid)
    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        try {
            const createdAt = new Date()
            await setDoc(userDocRef, {displayName, email, createdAt})
            return userDocRef

        } catch (error) {
            console.log('error creating user', error.message)
        }

    } else {
        return false
    }

}

export const obtainInformationFromDB = async (field, userInputData) => {
    try {
        const database =  await getDocs(collection(db, "users"))
        const matches = database.docs.filter(doc => doc.data()[field] === userInputData.email);
        return matches.length >= 1;
    } catch (error){
        console.log(error)
        return false
    }


}

export const logInWithEnP = async (email, password) => {
    try {
        if (!email || !password) return;
        return await signInWithEmailAndPassword(auth, email, password)

    } catch (error){
        // For Development Purposes
        console.log(error)
        return false // Graceful Exit
    }
}

export const onAuthStateChangedListener = (callback) => {
    if (!callback) return;
    return onAuthStateChanged(auth, callback);
}

export const signOutUser = async () => await signOut(auth);

// export const createShopDatabase = async ({id}) => {
//     const database =  await getDocs(collection(db, "shop-items"))
//     const matches = database.docs.filter((doc) => doc.data().id !== id)
//
//
// }

