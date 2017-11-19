# realtime-firebase
learning realtime app with firebase

##how to use
1. cd chat
2. create fire.js file on src folder
```javascript
import * as firebase from 'firebase';
import  "firebase/firestore"
const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: '',
  projectId: "",
  storageBucket: '',
  messagingSenderId: ''
};

const fire = firebase.initializeApp(config);

export default fire
```
3. yarn or npm
4. yarn start or npm start

all main chat function done, less remove chat room and group chat,
and need refactor on styling
try on  https://firechat-99c4c.firebaseapp.com
