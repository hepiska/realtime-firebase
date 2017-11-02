import * as firebase from 'firebase';
import  "firebase/firestore"


const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URI,
  projectId: "firechat-99c4c",
  storageBucket: process.env.S_BUCKET,
  messagingSenderId: process.env.MESS_ID
};

const fire = firebase.initializeApp(config);

export default fire
