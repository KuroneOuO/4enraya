// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'; // Si vas a usar la base de datos en tiempo real
import { getAuth } from 'firebase/auth'; // Si vas a usar autenticación

// Aquí pega la configuración que Firebase te proporciona cuando registras tu aplicación
const firebaseConfig = {
    apiKey: "AIzaSyDPflyW5v8BcrCd_0o5QAxicp_vNf04EOE",
    authDomain: "en-raya-772e8.firebaseapp.com",
    projectId: "en-raya-772e8",
    storageBucket: "en-raya-772e8.firebasestorage.app",
    messagingSenderId: "731114656834",
    appId: "1:731114656834:web:0bb5f5b8a69018853749db"
  };
// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Si planeas usar la base de datos en tiempo real o la autenticación
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };
