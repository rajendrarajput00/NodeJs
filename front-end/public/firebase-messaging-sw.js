// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
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

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});