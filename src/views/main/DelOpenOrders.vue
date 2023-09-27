<template>
    <div>
       
        <div v-for="(entry, id) in table"
                :item="entry"
                :key="id">
                
            <CRow v-if="entry.state != 3">
                <CCol md="12" >    
                    <CCard style="margin-bottom: 2rem;">
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
                        <h5>Status:</h5>
                        <div v-if="entry.state == 1">
                        <CButton color="warning" shape="rounded-pill" @click="UpdateStatus(entry.orderid)">Aποδοχή Παραγγελίας</CButton>
                    </div>
                    <div v-if="entry.state == 2">
                        <CButton color="info" shape="rounded-pill">Αποδέχθηκε</CButton>
                        <div v-for="e in entry.users" :key="e">
                            <h5>Διανομέας: {{ e.name }} {{ e.surname }}</h5>

                            <div v-if="e.userid == userid">
                                <CButton color="success" shape="rounded-pill" @click="UpdateStatus2(entry.orderid)">Ολοκλήρωση Παραγγελίας</CButton>
                            </div>
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
            userid: localStorage.getItem('userid'),
            fer:'',
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
        },

        UpdateStatus(id){
            if(confirm("Είστε σίγουρος ότι θέλετε να αποδεχτήτε την παραγγελία;")){
            axios.post('/restApi/api/UpdateStatus.php',{userid: this.userid, orderid: id, state: 2})
            .then(res=>{
          for(var i=0; i<this.table.length; i++){
            if(id==this.table[i].orderid){
              this.table[i].state=2;
            }
          }
          this.fer=res.data;
        })
        }
    },

    UpdateStatus2(id){
            if(confirm("Είστε σίγουρος ότι θέλετε να Ολοκληρώσετε την παραγγελεία;")){
            axios.post('/restApi/api/UpdateStatus.php',{userid: this.userid, orderid: id, state: 3})
            .then(res=>{
          for(var i=0; i<this.table.length; i++){
            if(id==this.table[i].orderid){
              this.table[i].state=3;
            }
          }
          this.fer=res.data;
        })
        }
    },

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