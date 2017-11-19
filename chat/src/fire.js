import * as firebase from 'firebase';
import  "firebase/firestore"


const config = {
  apiKey: "AIzaSyAPGJ5M8p8zZNfbezEqZWCZK9P2GsSfFDY",
  authDomain: "firechat-99c4c.firebaseapp.com",
  databaseURL: 'https://firechat-99c4c.firebaseio.com',
  projectId: "firechat-99c4c",
  storageBucket: 'firechat-99c4c.appspot.com',
  messagingSenderId: '409526158555'
};

const fire = firebase.initializeApp(config);

export default fire
