<template>
  <router-view />
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userid: localStorage.getItem('userid')
    }
  },

  created() {
    this.check()
    setInterval(this.check, 1000 * 60);

  },
  methods: {
    check() {
      axios.post('restApi/api/CheckOrder.php', {
        userid: this.userid
      })
    }
  }
}
</script>

<script setup>

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAVsbfmYtaa0YinhM_FMl7czfoYW1q7xdw",
  authDomain: "deliveryapp-a9973.firebaseapp.com",
  projectId: "deliveryapp-a9973",
  storageBucket: "deliveryapp-a9973.appspot.com",
  messagingSenderId: "648889998661",
  appId: "1:648889998661:web:386ca78056124930b0f22c"
};


const app = initializeApp(firebaseConfig)
const utype = localStorage.getItem('utype')
const userid = localStorage.getItem('userid')
const region = localStorage.getItem('region')
app
const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  console.log('Message TEST. ', payload.notification.body);
  if (utype == 2) {
    const message = payload.notification.title + ' ' + payload.notification.body;
    alert(message);
  } else if (utype == 3) {
    const message = payload.notification.title + ' ' + payload.notification.body;
    alert(message);
  }

});


getToken(messaging, { vapidKey: 'BN9tEOD1cNhkmva6KfGjFz-yUP3rCzDoPEXjzQ0SFbFRR0ZBWVjYY-zkIvHzL4ixKgnd5zc_ChBuWQ_1ub-bZVI' }).then((currentToken) => {
  if (currentToken) {
    console.log("tOKEN IS:", currentToken)
    localStorage.setItem('ftoken', currentToken)


    axios.post('/restApi/api/fbtokens.php', {
      token: currentToken,
      utype: utype,
      userid: userid,
      region: region,
    })
      .catch(err => console.log(err));

  } else {

    console.log('No registration token available. Request permission to generate one.');

  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
});



</script>


<style lang="scss">
// Import Main styles for this application
@import 'styles/style';
</style>

