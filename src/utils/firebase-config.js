import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBqpvUQpzvu8xJDGC7KZdY5oGnInwqYChU",
    authDomain: "mverse-app.firebaseapp.com",
    projectId: "mverse-app",
    storageBucket: "mverse-app.appspot.com",
    messagingSenderId: "115722224556",
    appId: "1:115722224556:web:e133c319b5c76ff30ff009",
    measurementId: "G-KT2NSQ2B11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});
export { db };