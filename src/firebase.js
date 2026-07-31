import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAV8Q35CTUxE8NPW4MvaMCN5miAAFLi9Qo",
  authDomain: "shopping-cart-dae1b.firebaseapp.com",
  projectId: "shopping-cart-dae1b",
  storageBucket: "shopping-cart-dae1b.firebasestorage.app",
  messagingSenderId: "472626085376",
  appId: "1:472626085376:web:7e2f7a4d4d02cf194062e5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
