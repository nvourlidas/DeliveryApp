<template>
    <div>
        <div v-for="(entry, id) in table"
                :item="entry"
                :key="id">
                
            <CRow v-if="entry.state != 3">
                <CCol md="12" >    
                    <CCard style="margin-bottom: 2rem; border: 2px solid #000;">
                        <CCardHeader style="text-align: center;">
                                   <h3>Κατάστημα: {{ entry.name }} </h3> 
                                   <h3 v-if="entry.userid == null">Από Admin</h3>
                        </CCardHeader>
                        <div class="card1">
                        <div class="left-div">                   
                            <h5 class="element">Διεύθυνση: {{ entry.address }}</h5>
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
                        <h5>Αριθμός Παραγγελίας #{{ entry.orderid }}</h5>
                        <CButton color="danger" @click="delete1(entry.orderid)"><CIcon name="cil-ban"/>Διαγραφή</CButton>
                    </CCardFooter>
                </CCard>
            
                </CCol>
            </CRow>
        </div>
    </div>
</template>

<script>
import { CButton } from '@coreui/vue';
import axios from 'axios';

export default {
    data() {
        return {
            table: [],
            utable:[],
            useraccept: '',
            userid: localStorage.getItem('userid'),
        };
    },
    created() {
        this.get();
        setInterval(this.get, 7000);
        this.getUsers();
        setInterval(this.getUsers, 7000);
    },
    methods: {
        get() {
            axios.get('/restApi/api/ReadOrder.php')
                .then(res => {
                this.table = res.data,
                    this.useraccept = localStorage.getItem('name');
            })
                .catch(err => console.log(err));
        },

        delete1(id){
            if(confirm("Είστε σίγουρος ότι θέλετε να γίνει Διαγραφή")){
      axios.delete(`/restApi/api/DeleteOrder.php/?orderid=${id}`)
        .then( res=>{
          for(var i=0; i<this.table.length; i++){
            if(id==this.table[i].orderid){
              this.table.splice(i,1)
              var x = res.data;
              x;
            }
          }
        })
      .catch(err => console.log(err));
        }
        },

        getUsers(){
        axios.get('/restApi/api/ReadAllUsers.php')
        .then(res => {this.utable = res.data}).catch(err => console.log(err))
    },
    },
    components: { CButton }
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

.row {
      display: flex;
      border: 1px solid #ccc;
      
    }

    .element {
      flex: 1;
      /* padding: 10px;
      border: 1px solid #ccc;
      margin: 5px; */
    }

    .element1{
        flex: 1;
    }

</style>