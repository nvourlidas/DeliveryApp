<template>
    <div>
        <label style="font-size: 24px;"> Επιλογή Ημερομηνίας</label>
        <VueDatePicker v-model="date" style="margin-bottom: 2%" model-type="yyyy-MM-dd"></VueDatePicker>

        <div v-for="(entry, id) in table"
                :item="entry"
                :key="id">
                
            <CRow v-if="entry.state == 3 && entry.odate == date">
                <CCol md="12" >    
                    <CCard >
                        <CCardHeader style="text-align: center;">
                            <h3>Αριθμός Παραγγελίας #{{ entry.orderid }}</h3>
                        </CCardHeader>
                        <div class="card1">
                        <div class="left-div">
                        <h5>Διεύθυνση: {{ entry.address }}</h5>
                        <h5>Τιμή: {{ entry.price }} €</h5>
                        <h5>Σημειώσεις: {{ entry.texta }}</h5>
                    </div>
                    <div class="right-div">
                        <h4>Status:</h4>
                        <div v-if="entry.state == 1">
                        <CButton color="warning" shape="rounded-pill" >Ανοιχτή</CButton>
                    </div>
                    <div v-if="entry.state == 3">
                        <CButton color="success" shape="rounded-pill" style="margin-bottom: 2%;">Παραδόθηκε</CButton>
                        <div v-for="e in entry.users" :key="e">
                            <h5>Διανομέας: {{ e.name }} {{ e.surname }}</h5>
                            <h5>Ώρα Παράδοσης: {{ entry.ptime }}</h5>
                            
                        </div>
                    </div>
                    </div>
                </div>
                <CCardFooter>
                        <h5>Ημερομηνία και Ωρα: {{ entry.odate }} {{ entry.otime }} </h5>
                    </CCardFooter>
                </CCard>
            
                </CCol>
            </CRow>
        </div>
    </div>
    <br />
</template>

<script>
import axios from 'axios';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
    components: { VueDatePicker },
    data(){
        return {
            table: [],
            useraccept: '',
            date: null,    
           }
    },

    created() {
     axios.get('/restApi/api/ReadOrder.php')
     .then(res => {this.table = res.data,
    this.useraccept=localStorage.getItem('name')
     })
     .catch(err => console.log(err));
    },
}
</script>
<style scoped>
.card1{
    margin-bottom: 2rem; 
    display: flex;
    flex-direction: row;
}

.left-div{
    flex: 1;
    padding: 2%;
    background-color: #f0f0f0;
}

.right-div {
    flex:1;
    width: 50%;
    padding: 2%;
    background-color: #e0e0e0; 
}



</style>