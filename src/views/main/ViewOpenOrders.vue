<template>
    <div>
       
        <div v-for="(entry, id) in table"
                :item="entry"
                :key="id">
                
            <CRow v-if="entry.state != 3">
                <CCol md="12" >    
                    <CCard style="margin-bottom: 2rem;">
                        <CCardHeader style="text-align: center;">
                            <h3>Αριθμός Παραγγελείας #{{ entry.orderid }}</h3>
                        </CCardHeader>
                        <div class="card1">
                        <div class="left-div">
                        <h5>Διεύθυνση: {{ entry.address }}</h5>
                        <h5>Τιμή: {{ entry.price }} €</h5>
                        <h5>Σημειώσεις: {{ entry.texta }}</h5>
                    </div>
                    <div class="right-div">
                        <h5>Status:</h5>
                        <div v-if="entry.state == 1">
                        <CButton color="warning" shape="rounded-pill">Ανοιχτή</CButton>
                    </div>
                    <div v-if="entry.state == 2">
                        <CButton color="info" shape="rounded-pill">Αποδέχθηκε</CButton>
                        <div v-for="e in entry.users" :key="e">
                            <h5>Διανομέας: {{ e.name }} {{ e.surname }}</h5>
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
</template>

<script>
import axios from 'axios';

export default {
    
    data(){
        return {
            table: [],
            useraccept: '',
        }
    },

    created() {
        this.get();
        setInterval(this.get, 7000); 
    },

    methods : {
        get() {
            axios.get('/restApi/api/ReadOrder.php')
     .then(res => {this.table = res.data,
    this.useraccept=localStorage.getItem('name')
     })
     .catch(err => console.log(err))
        }
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