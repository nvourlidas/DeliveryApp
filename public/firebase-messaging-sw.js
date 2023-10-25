importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js')

const firebaseConfig = {
    apiKey: "AIzaSyAVsbfmYtaa0YinhM_FMl7czfoYW1q7xdw",
    authDomain: "deliveryapp-a9973.firebaseapp.com",
    projectId: "deliveryapp-a9973",
    storageBucket: "deliveryapp-a9973.appspot.com",
    messagingSenderId: "648889998661",
    appId: "1:648889998661:web:386ca78056124930b0f22c"
};

const app = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    
    // Customize notification here
    // const notificationTitle = payload.notification.title;
    // const notificationOptions = {
    //   body: payload.notification.body,
    //   icon: '/icon.jpg'
    // };
  
    // self.registration.showNotification(notificationTitle, notificationOptions);
  });
