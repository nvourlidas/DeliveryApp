<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <slot name="body">
        <div v-for="(entry, id) in orders" :item="entry" :key="id">
          <CRow>
            <CCol md="12">
              <CCard style="margin-bottom: 2rem; border: 2px solid #000;">
                <CCardHeader style="text-align: center;">
                  <div v-for="(g, id1) in utable" :item="g" :key="id1">
                    <h3 v-if="entry.userid == g.userid">Κατάστημα: {{ g.name }} </h3>
                  </div>
                </CCardHeader>
                <div class="card1">
                  <div class="left-div">
                    <h5>Διεύθυνση: {{ entry.address }}</h5>
                    <h5>Τιμή: {{ entry.price }} €</h5>
                  </div>
                  <div class="right-div">
                    <h5>Ωρα παράδοσης: {{ entry.ptime }}</h5>
                  </div>
                </div>
                <CCardFooter>
                  <h5>Ημερομηνία και Ωρα: {{ entry.odate }} {{ entry.otime }} </h5>
                  <h5>Αριθμός Παραγγελίας #{{ entry.orderid }}</h5>
                </CCardFooter>
              </CCard>

            </CCol>
          </CRow>
        </div>
      </slot>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
export default {
  props: {
    showModal: Boolean,
    orders: [],
  },
  data() {
    return {
      utable: [],
    }
  },
  created() {
    this.getUsers();
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },

    getUsers() {
      axios.get('/restApi/api/ReadAllUsers.php')
        .then(res => { this.utable = res.data }).catch(err => console.log(err))
    },

  },

};
</script>
  
<style scoped>
/* Style your modal here */
.modal {
  /* Styles for the modal backdrop */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  /* align-items: center; */
  z-index: 9999;
}

.modal-content {
  /* Styles for the modal itself */
  position: absolute;
  background: white;
  padding: 10px;
  border-radius: 5px;
  max-width: 400px;
  /* Set a maximum width for the modal */
  width: 100%;
  /* Ensure modal takes full width within the max-width */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}
</style>
  