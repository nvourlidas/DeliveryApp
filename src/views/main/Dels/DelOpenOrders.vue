<template>
    <div>
        <div v-for="(entry, id) in table"
                :item="entry"
                :key="id">
            <CRow v-if="entry.state != 3">
                <CCol md="12" >    
                    <CCard style="margin-bottom: 2rem; border: 2px solid #000;">
                        <CCardHeader :class="{ highlight: highlightNewRow }">
                                   <h3>Κατάστημα: {{ entry.name }} </h3>
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
                        <h5>Αριθμός Παραγγελίας #{{ entry.orderid }}</h5>
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
            lastid: '',
            utype: localStorage.getItem('utype'),
            
        }
    },

    created() {
        this.get();
        setInterval(this.get, 7000); 
        
        
    },

    methods : {
        get() {
            axios.get('/restApi/api/ReadOrder.php')
     .then(res => {
            this.table = res.data,
            this.useraccept=localStorage.getItem('name')
            this.lastid= res.data[0].orderid;
     })
     .catch(err => console.log(err))
        },

        UpdateStatus(id){
            var count =0
            for(var i=0; i<this.table.length; i++){
                if(this.table[i].useraccept != null && this.table[i].oloruser == null){
                    count += 1
                }
            }
            if(count <2){
                if(confirm("Είστε σίγουρος ότι θέλετε να αποδεχτήτε την παραγγελία;")){
                    axios.post('/restApi/api/UpdateStatus.php',
                    {userid: this.userid, orderid: id, state: 2})
                    .then(res=>{
                    for(var i=0; i<this.table.length; i++){
                        if(id==this.table[i].orderid){
                        this.table[i].state=2;
                        }
                    }
                    this.fer=res.data;
                    })
                }
            }else{
                alert("Δεν μπορείτε να έχετε πάνω από 2 ανοιχτές παραγγελίες")
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
          this.notif(id);
        })
        }
    },

    notif(id){
        axios.post('/restApi/api/firebaseNot.php', {
                userid: localStorage.getItem('userid'),
                utype: 2,
                orderid:id
            })
            .catch(err => console.log(err));
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

.highlight {
  background-color: red;
  /* transition: background-color 10s; Transition the color property over 10 seconds */
  text-align: center;
}

.newel.show {
  background-color: red;
}

</style>