// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAwHpbFbL2zFZ0XIZxgT82d35k-h-ZhOdg",
    authDomain: "fir-e8bfa.firebaseapp.com",
    projectId: "fir-e8bfa",
    storageBucket: "fir-e8bfa.appspot.com",
    messagingSenderId: "1032876976065",
    appId: "1:1032876976065:web:033d12c67c53cd2457b140",
    measurementId: "G-Z9NSPTQ6TR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//connect firestore
export const db = getFirestore(app);

// const usersCollectionRef = collection(db, "users");

// //add data
// const response = await addDoc(usersCollectionRef, itemData);

// //get data
// const data = await getDocs(usersCollectionRef);
// const filteredData = data.docs.map((doc) => ({
//     ...doc.data(),
//     id: doc.id,
// }));
