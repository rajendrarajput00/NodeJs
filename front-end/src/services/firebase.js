import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
var firebaseConfig = {
    apiKey: "AIzaSyArTmdiBzjS3y1WHjRiTIA5Ay1MM2zS_YI",
    authDomain: "nodereact-957b5.firebaseapp.com",
    //databaseURL: "https://nodereact-957b5-default-rtdb.firebaseio.com",
    projectId: "nodereact-957b5",
    storageBucket: "nodereact-957b5.appspot.com",
    messagingSenderId: "1007171984534",
    appId: "1:1007171984534:web:7b6fd8eda94174b2e876b7",
    // measurementId: "G-VM0RKBFRWX"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

//initializeApp(firebaseConfig);

export const getFireToken = (setTokenFound) => {
    return getToken(messaging, {vapidKey: 'BDsdzgLS0OvdceSxA52AdCJOKhLDns2EoWsa-3iMo1pqsq7x7sBgFx1FNcRe-3pYwSUtSsp3oQ82GkOUSeA0iU4'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }


  export const onMessageListener = () =>
   new Promise((resolve) => {
     onMessage(messaging, (payload) => {
      resolve(payload);
    });
});