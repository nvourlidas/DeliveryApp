<template>
    <div class="notif"
      v-for="(entry, id) in notifications"
                :item="entry"
                :key="id">
        <div v-if="utype==2">
          <CAlert color="info" dismissible @click="push">
            <CIcon class="mx-2" icon="cil-bell" size="lg" />
            <h3>Νέα Παραγγελία</h3> 
            Διεύθυνση: {{ entry.address }}</CAlert>   
        </div>   
      </div>
    
  <router-view />
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      notifications: [],
      utype:localStorage.getItem('utype'),
    };
  },

  created() {
    this.fetchNotifications();
    setInterval(this.fetchNotifications, 7000); 
  },

  methods: {
    async fetchNotifications() {
      try {
        const response = await axios.get('/restApi/api/notifications.php'); 
        this.notifications = response.data;
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    },

    push(){
      this.$router.push('/main/DelOpenOrders');
      
    },
  },
}
</script>

<style lang="scss">
// Import Main styles for this application
@import 'styles/style';
</style>

<style scoped>

@keyframes slideInFromLeft {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}

.notif{
  width:50%;
  margin-left: 25%;
  position:fixed;
  z-index: 9999;  
  animation: 0.5s ease-out 0s 1 slideInFromLeft;
}


</style>