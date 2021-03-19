// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// eslint-disable-next-line import/no-cycle
//import { onNavigate } from './routes.js';

const firebaseConfig = {
  apiKey: 'AIzaSyABP0g3UCSzN9JeeJ0Rx70z0E5hBoaCB2w',
  authDomain: 'coffee-house-lab.firebaseapp.com',
  projectId: 'coffee-house-lab',
  storageBucket: 'coffee-house-lab.appspot.com',
  messagingSenderId: '26449516707',
  appId: '1:26449516707:web:90c7aef95e43a4352ac716',
  measurementId: 'G-2KBQQ78HH4',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const dataBase = firebase.firestore();

export function activeUser() {
  return firebase.auth().currentUser;
}

export function validarEmail(valor) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(valor)) {
    // eslint-disable-next-line no-alert
    alert(`La dirección de email ${valor} es correcta.`);
  } else {
    // eslint-disable-next-line no-alert
    alert('La dirección de email es incorrecta.');
  }
}

export function createUser() {
  const email = document.getElementById('email-register').value;
  const password = document.getElementById('password-register').value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      //onNavigate('/home');
      alert('Se registro correctamente', res);
    })
    .catch((err) => {
      onNavigate('/register');
      alert('Ocurrio un error', err);
    });
}

export function logIn() {
  const emailLogin = document.getElementById('email-login').value;
  const passwordLogin = document.getElementById('password-login').value;
  firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin)
    .then((res) => {
      onNavigate('/home');
    })
    .catch((err) => {
      alert('Ocurrio el error:', err);
      onNavigate('/');
    });
}

export function authGoogle() {
  const providerGoogle = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(providerGoogle)
    .then((res) => {
      console.log(res);
      onNavigate('/home');
    })
    .catch((err) => {
      alert(err);
    });
}

export function authFacebook() {
  const providerFacebook = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(providerFacebook)
    .then((res) => {
      console.log(res);
      onNavigate('/home');
    })
    .catch((err) => {
      alert(err);
    });
}

export function salir() {
  firebase.auth().signOut().then((res) => {
    console.log(res);
    onNavigate('/');
  }).catch((err) => {
    alert(err);
  });
}

export function verAutenticacion() {
  firebase.auth().onAuthStateChanged((res) => {
    if (res == null) {
      console.log('si es null');
      document.getElementById('me-mobile').style.display = 'none';
      document.getElementById('home-mobile').style.display = 'none';
      document.getElementById('div-register').style.display = 'inline-block';
      document.getElementById('div-login').style.display = 'inline-block';
    } else {
      console.log('no es null');
      document.getElementById('me-mobile').style.display = 'inline-block';
      document.getElementById('home-mobile').style.display = 'inline-block';
      document.getElementById('div-register').style.display = 'none';
      document.getElementById('div-login').style.display = 'none';
    }
  });
}
