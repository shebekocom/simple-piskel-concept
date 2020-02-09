import * as firebase from 'firebase/app';
import 'firebase/auth';

export default function login() {
  console.log('вход в приложение');

  const firebaseConfig = {
    apiKey: 'AIzaSyAuOBHBtX7zs81NPhwC1iuexwFyWSSODQU',
    authDomain: 'simple-piskel-7cd8d.firebaseapp.com',
    databaseURL: 'https://simple-piskel-7cd8d.firebaseio.com',
    projectId: 'simple-piskel-7cd8d',
    storageBucket: 'simple-piskel-7cd8d.appspot.com',
    messagingSenderId: '1006093332819',
    appId: '1:1006093332819:web:4e79a7850f70cb33f4f1a6',
  };

  firebase.initializeApp(firebaseConfig);

  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      console.log(result);
      console.log('Вы залогинены пока поменял просто текст в кнопках');
      document.querySelector('.sign-in').innerHTML = 'Log out';
      document.querySelector('.login').innerHTML = 'Log out';
    })
    .catch(error => {
      console.log(error);
      console.log('что то пошло не так');
    });
}
