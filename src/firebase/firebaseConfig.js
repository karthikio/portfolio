import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCvWj-SnYCIkiYCbn_2oiFH4h8plAxOmlE",
  authDomain: "portfolio-42f2e.firebaseapp.com",
  projectId: "portfolio-42f2e",
  storageBucket: "portfolio-42f2e.appspot.com",
  messagingSenderId: "200963931804",
  appId: "1:200963931804:web:6470c544f917b907e7b759",
  measurementId: "G-2F4P33MCEJ"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };