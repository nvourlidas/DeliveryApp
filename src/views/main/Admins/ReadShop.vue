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
        <CAccordion v-for="(entry, id) in table"
            :item="entry"
            :key="id">
            <CAccordionItem v-if="entry.region == region">
                <CAccordionHeader>
                    
                   <h3> {{ entry.name }} </h3>
                </CAccordionHeader>
                <CAccordionBody>
                        <h5 >Ανοιχτές Παραγγελίες: {{ entry.openorders }}</h5>
                        <h5 >Ολοκληρωμένες Παραγγελίες: {{ entry.olorders }}</h5>
                        <h6>Σύνολο Ολοκληρωμένων Παραγγελιών: {{ entry.sunolo }} &euro;</h6>
                    <CButton color="primary" @click="showModal(entry.userid)">Λεπτομέριες</CButton>
                </CAccordionBody>
            </CAccordionItem>
        </CAccordion>       
        <DelModal2 :show-modal="show" @close="show = false, orders= []" :orders="orders" ></DelModal2>
    </div>
</transition>
<transition name="fade">
    <div v-if="regionB" class="fading-div">
        <h3>Βλέπετε για Θεσσαλονίκη</h3>
        <CAccordion v-for="(entry, id) in table"
            :item="entry"
            :key="id">
            <CAccordionItem v-if="entry.region == region">
                <CAccordionHeader>
                    
                   <h3> {{ entry.name }} </h3>
                </CAccordionHeader>
                <CAccordionBody>
                        <h5 >Ανοιχτές Παραγγελίες: {{ entry.openorders }}</h5>
                        <h5 >Ολοκληρωμένες Παραγγελίες: {{ entry.olorders }}</h5>
                        <h6>Σύνολο Ολοκληρωμένων Παραγγελιών: {{ entry.sunolo }} &euro;</h6>
                    <CButton color="primary" @click="showModal(entry.userid)">Λεπτομέριες</CButton>
                </CAccordionBody>
            </CAccordionItem>
        </CAccordion>       
        <DelModal2 :show-modal="show" @close="show = false, orders= []" :orders="orders" ></DelModal2>
    </div>
</transition>
</template>

<script>
import axios from 'axios';
import DelModal2 from './DelModal2.vue';
export default {
    data(){
        return{
            table: [],
            show: false,
            orders: [],
            regionA: false,
            regionB: false,
            region: '',
            showButton1: true,
            showButton2: true,
        }
    },

    created(){
        this.get()
        setInterval(this.get, 3000);
    },
    methods:{
        get(){
            axios.get('restApi/api/SumOrderShop.php')
            .then(res=>{this.table = res.data})
        },

        showModal(id){
          axios.get('/restApi/api/ReadOrder.php')
          .then(res=>{
            var j=0;
            for(var i=0; i<res.data.length; i++){
              if(res.data[i].userid == id && res.data[i].state==3){
              this.orders[j] = res.data[i];
              j++;
            }
            }            
          })
          this.show = true;
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
    },
   components: {DelModal2}
}
</script>

<style scoped>

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