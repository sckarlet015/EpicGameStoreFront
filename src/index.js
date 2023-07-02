import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from './store';

//////////////////// FIREBASE

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFQeUBwL8jj7Nrz542WQRp9eWVPv8eE4Q",
  authDomain: "henrygames-9cb6a.firebaseapp.com",
  projectId: "henrygames-9cb6a",
  storageBucket: "henrygames-9cb6a.appspot.com",
  messagingSenderId: "928324281107",
  appId: "1:928324281107:web:ef237e5f6b69556af330e6",
  measurementId: "G-KBZBJJKC1M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//////////////////////////////////


ReactDOM.render(
  <Provider store = { store }>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
