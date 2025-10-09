// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // ⬅️ IMPORTANTE para o Realtime Database

// Sua configuração original
const firebaseConfig = {
  apiKey: "AIzaSyAGQCHoXL5TMz2Bs6WC3urjFi7toUzdPp4",
  authDomain: "entrega-empadas.firebaseapp.com",
  projectId: "entrega-empadas",
  storageBucket: "entrega-empadas.firebasestorage.app",
  messagingSenderId: "890009378897",
  appId: "1:890009378897:web:b02f42ff3590f8acc95870",
  measurementId: "G-1ZC1X8VPDK"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// ⬅️ EXPORTA a referência ao Realtime Database
export const database = getDatabase(app); 

// Não vamos usar o Analytics neste projeto de localização, podemos removê-lo
// const analytics = getAnalytics(app);