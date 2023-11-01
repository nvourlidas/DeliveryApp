<template>
    <div class="button-container">
        <transition name="fade-slide">
        <CButton class="big-button" @click="regionA = !regionA, regionB = false, region = 1, toggleButton(1)" 
        v-if="showButton2"> 
        Γιαννιτσά</CButton>
    </transition>
    <transition name="fade-slide">
        <CButton class="big-button" @click="regionB = !regionB, regionA = false, region = 2, toggleButton(2)"
        v-if="showButton1">
        Θεσσαλονίκη</CButton>
    </transition>
    </div>
    <transition name="fade">
    <div v-if="regionA" class="fading-div">
      <h3>Βλέπετε για Γιαννιτσά</h3>
        <div v-for="(entry, id) in table"
                :item="entry"
                :key="id">
                
            <CRow v-if="entry.region == region">
                <CCol md="12" >    
                    <CCard style="margin-bottom: 2rem; border: 2px solid #000;">
                        <CCardHeader style="text-align: center;">
                            <h3>Κατάστημα: {{ entry.name }} </h3>
                            <h3 v-if="entry.userid == null">Από Admin</h3>
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
                        <h5>Αριθμός Παραγγελίας #{{ entry.orderid }}</h5>
                        <CButton color="danger" @click="delete1(entry.orderid)"><CIcon name="cil-ban"/>Διαγραφή</CButton>
                    </CCardFooter>
                </CCard>
            
                </CCol>
            </CRow>
            <br /><br /><br />
        </div>
    </div>
</transition>
<transition name="fade">
    <div v-if="regionB" class="fading-div">
      <h3>Βλέπετε για Θεσσαλονίκη</h3>
        <div v-for="(entry, id) in table"
                :item="entry"
                :key="id">
                
            <CRow v-if="entry.region == region">
                <CCol md="12" >    
                    <CCard style="margin-bottom: 2rem; border: 2px solid #000;">
                        <CCardHeader style="text-align: center;">
                            <h3>Κατάστημα: {{ entry.name }} </h3>
                            <h3 v-if="entry.userid == null">Από Admin</h3>
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
                        <h5>Αριθμός Παραγγελίας #{{ entry.orderid }}</h5>
                        <CButton color="danger" @click="delete1(entry.orderid)"><CIcon name="cil-ban"/>Διαγραφή</CButton>
                    </CCardFooter>
                </CCard>
            
                </CCol>
            </CRow>
            <br /><br /><br />
        </div>
    </div>
</transition>
    <br />
</template>

<script>
import axios from 'axios';


export default {
   
    data(){
        return {
            table: [],
            useraccept: '',
            date: '', 
            userid: localStorage.getItem('userid'),   
            region: '',
            showButton1: true,
            showButton2: true,
            regionA: false,
            regionB: false,
           }
    },

    created() {
        this.get();
        this.getCurrentDate();
    },

    methods:{
    get(){
        axios.get('/restApi/api/ReadOrder.php')
     .then(res => {var j=0;
        for(var i=0; i<res.data.length; i++){
            if(res.data[i].state == 3 && res.data[i].odate == this.date){
                this.table[j] = res.data[i]
                j++
            }
        }
    this.useraccept=localStorage.getItem('name')
     })
     .catch(err => console.log(err));
    },
    getCurrentDate() {
        const now = new Date();
      const year = now.getFullYear().toString(); // Get the last 2 digits of the year
      const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to month because it's 0-indexed
      const day = now.getDate().toString().padStart(2, '0');
      this.date = year + '-' + month + '-' + day;
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
        
        toggleButton(buttonNumber) {
          if (buttonNumber === 1) {
            this.showButton2 = false;
            this.showButton1 = true;
          } else if (buttonNumber === 2) {
            this.showButton1 = false;
            this.showButton2 = true;
          }
        },

    }
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


.button-container {
    text-align: center; 
    }

    .big-button {
    display: inline-block;
    padding: 15px 30px; 
    background-color: #3453db;
    color: #fff;
    font-size: 18px; 
    border: none;
    cursor: pointer;
    margin: 5px; 
    width: 30%;
    }

    .big-button:hover {
    background-color: #287a2c; 
    }

    .fade-slide-enter-active, .fade-slide-leave-active {
    transition: opacity 1.5s, transform 0.5s;
    }
    .fade-slide-enter, .fade-slide-leave-to {
    opacity: 0;
    transform: translateX(250px);
    }


    .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
    }
    .fade-enter, .fade-leave-to {
    opacity: 0;
    }


</style>