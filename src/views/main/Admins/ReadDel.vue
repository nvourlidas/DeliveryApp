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
      <CButton :color="bcolorC" @click="visibleC = !visibleC, visibleB = false, visibleA = false, color()" >Σήμερα</CButton>
      <CButton :color="bcolorA" @click="visibleA = !visibleA, visibleB = false, visibleC = false, color()" style="margin: 2%;">Τρέχων Μήνας</CButton>
      <CButton :color="bcolorB" @click="visibleB = !visibleB, visibleA = false, visibleC = false, color()"> Από Πάντα</CButton>
      <CCollapse :visible="visibleA">
      <CRow>
        <CCol :xs="4" v-for="(entry, id) in Ctable"
                :item="entry"
                :key="id">
                
          <CWidgetStatsC v-if="entry.region == region" class="mb-3" title="Dels" inverse color="info">
            
            <template #icon><CIcon icon="cil-people" height="36"/></template>
            <template #title>{{entry.name}} {{ entry.surname }}</template>
            <template #value>
               Ολοκληρωμένες: {{ entry.olorders }}<br/>
               Συνολικό Ποσό: {{ entry.tziros }}&euro;<br/>
              <CButton color="success" @click="showModal(entry.userid,2)">Λεπτομέριες</CButton></template>
          </CWidgetStatsC>
        
        </CCol>
      </CRow>
      <div>
    
    <DelModal :show-modal="show" @close="show = false, orders= []" :orders="orders" >
      
    </DelModal>
  </div>
</CCollapse>
<CCollapse :visible="visibleB">
      <CRow>
        <CCol :xs="4" v-for="(entry, id) in table"
                :item="entry"
                :key="id">
                
          <CWidgetStatsC v-if="entry.region == region"  class="mb-3" title="Dels" inverse color="info">
            
            <template #icon><CIcon icon="cil-people" height="36"/></template>
            <template #title>{{entry.name}} {{ entry.surname }}</template>
            <template #value>
               Ολοκληρωμένες: {{ entry.olorders }}<br/>
               Συνολικό Ποσό: {{ entry.tziros }}&euro;<br/>
              <CButton color="success" @click="showModal(entry.userid,1)">Λεπτομέριες</CButton></template>
          </CWidgetStatsC>
        
        </CCol>
      </CRow>
      <div>
    
    <DelModal :show-modal="show" @close="show = false, orders= []" :orders="orders" >
      
    </DelModal>
  </div>
</CCollapse>
<CCollapse :visible="visibleC">
      <CRow>
        <CCol :xs="4" v-for="(entry, id) in Ttable"
                :item="entry"
                :key="id">
                
          <CWidgetStatsC v-if="entry.region == region"  class="mb-3" title="Dels" inverse color="info">
            
            <template #icon><CIcon icon="cil-people" height="36"/></template>
            <template #title>{{entry.name}} {{ entry.surname }}</template>
            <template #value>
              Ανοιχτές: {{ entry.accorders }}<br />
               Ολοκληρωμένες: {{ entry.olorders }}<br/>
               Συνολικό Ποσό: {{ entry.tziros }}&euro;<br/>
              <CButton color="success" @click="showModal(entry.userid,3)">Λεπτομέριες</CButton></template>
          </CWidgetStatsC>
        
        </CCol>
      </CRow>
      <div>
    
    <DelModal :show-modal="show" @close="show = false, orders= []" :orders="orders" >
      
    </DelModal>
  </div>
</CCollapse>
    </div>
  </transition>
  <transition name="fade">
    <div v-if="regionB">
      <h3>Βλέπετε για Θεσσαλονίκη</h3>
      <CButton :color="bcolorC" @click="visibleC = !visibleC, visibleB = false, visibleA = false, color()" >Σήμερα</CButton>
      <CButton :color="bcolorA" @click="visibleA = !visibleA, visibleB = false, visibleC = false, color()" style="margin: 2%;">Τρέχων Μήνας</CButton>
      <CButton :color="bcolorB" @click="visibleB = !visibleB, visibleA = false, visibleC = false, color()"> Από Πάντα</CButton>
      <CCollapse :visible="visibleA">
      <CRow>
        <CCol :xs="4" v-for="(entry, id) in Ctable"
                :item="entry"
                :key="id">
                
          <CWidgetStatsC v-if="entry.region == region" class="mb-3" title="Dels" inverse color="info">
            
            <template #icon><CIcon icon="cil-people" height="36"/></template>
            <template #title>{{entry.name}} {{ entry.surname }}</template>
            <template #value>
               Ολοκληρωμένες: {{ entry.olorders }}<br/>
               Συνολικό Ποσό: {{ entry.tziros }}&euro;<br/>
              <CButton color="success" @click="showModal(entry.userid,2)">Λεπτομέριες</CButton></template>
          </CWidgetStatsC>
        
        </CCol>
      </CRow>
      <div>
    
    <DelModal :show-modal="show" @close="show = false, orders= []" :orders="orders" >
      
    </DelModal>
  </div>
</CCollapse>
<CCollapse :visible="visibleB">
      <CRow>
        <CCol :xs="4" v-for="(entry, id) in table"
                :item="entry"
                :key="id">
                
          <CWidgetStatsC v-if="entry.region == region"  class="mb-3" title="Dels" inverse color="info">
            
            <template #icon><CIcon icon="cil-people" height="36"/></template>
            <template #title>{{entry.name}} {{ entry.surname }}</template>
            <template #value>
               Ολοκληρωμένες: {{ entry.olorders }}<br/>
               Συνολικό Ποσό: {{ entry.tziros }}&euro;<br/>
              <CButton color="success" @click="showModal(entry.userid,1)">Λεπτομέριες</CButton></template>
          </CWidgetStatsC>
        
        </CCol>
      </CRow>
      <div>
    
    <DelModal :show-modal="show" @close="show = false, orders= []" :orders="orders" >
      
    </DelModal>
  </div>
</CCollapse>
<CCollapse :visible="visibleC">
      <CRow>
        <CCol :xs="4" v-for="(entry, id) in Ttable"
                :item="entry"
                :key="id">
                
          <CWidgetStatsC v-if="entry.region == region"  class="mb-3" title="Dels" inverse color="info">
            
            <template #icon><CIcon icon="cil-people" height="36"/></template>
            <template #title>{{entry.name}} {{ entry.surname }}</template>
            <template #value>
              Ανοιχτές: {{ entry.accorders }}<br />
               Ολοκληρωμένες: {{ entry.olorders }}<br/>
               Συνολικό Ποσό: {{ entry.tziros }}&euro;<br/>
              <CButton color="success" @click="showModal(entry.userid,3)">Λεπτομέριες</CButton></template>
          </CWidgetStatsC>
        
        </CCol>
      </CRow>
      <div>
    
    <DelModal :show-modal="show" @close="show = false, orders= []" :orders="orders" >
      
    </DelModal>
  </div>
</CCollapse>
    </div>
  </transition>
</template>

<script>

import { CButton } from '@coreui/vue';
import axios from 'axios';
import DelModal from './DelModal.vue';

export default {
    data() {
        return {
            table: [],
            show: false,
            orders: [],
            torders: [],
            Ctable: [],
            Ttable:[],
            visibleA: false,
            visibleB: false,
            visibleC: false,
            regionA: false,
            regionB: false,
            currentMonth: '',
            currentYear: '',
            bcolorA: 'primary',
            bcolorB: 'primary',
            bcolorC: 'primary',
            currentDate: '',
            region: '',
            showButton1: true,
            showButton2: true,
        };
    },
    created() {
        this.get();
        setInterval(this.get, 5000);
        this.currentmy()
        this.getCurrentDate()
       
        
    },
    methods: {
        get() {
            axios.get('/restApi/api/SumOrders.php')
                .then(res => { this.table = res.data}).catch(err => console.log(err));

            axios.get('/restApi/api/CurrentSum.php')
              .then(res => { this.Ctable = res.data}).catch(err => console.log(err));

              axios.get('/restApi/api/SumToday.php')
              .then(res => { this.Ttable = res.data}).catch(err => console.log(err));
        },
        
        showModal(id,n){
          axios.get('/restApi/api/ReadOrder.php')
          .then(res=>{
            if(n ==1){
              var j=0;
              for(var i=0; i<res.data.length; i++){
                if(res.data[i].oloruser == id){
                this.orders[j] = res.data[i];
                j++;
                }
              }  
            }else if(n==2){
              j=0;
              for(i=0; i<res.data.length; i++){
                var dateArray = res.data[i].odate.split('-');
                var year = parseInt(dateArray[0]);
                var month = parseInt(dateArray[1]);
                if(res.data[i].oloruser == id && year == this.currentYear && month == this.currentMonth ){
                this.orders[j] = res.data[i];
                j++;
                }
              } 
              
            }else{
              j=0;
              for(i=0; i<res.data.length; i++){
                if(res.data[i].oloruser == id && res.data[i].odate == this.currentDate){
                  this.orders[j] = res.data[i];
                  j++;
                }
              }
            }          
          })
          this.show = true;
        },

        color(){
          if(this.visibleA){
            this.bcolorA = 'warning'
          }else{
            this.bcolorA = 'primary'
          }

          if(this.visibleB){
            this.bcolorB = 'warning'
          }else{
            this.bcolorB = 'primary'
          }

          if(this.visibleC){
            this.bcolorC = 'warning'
          }else{
            this.bcolorC = 'primary'
          }
        },
        
        currentmy(){
          const currentDate = new Date();
          this.currentMonth = currentDate.getMonth() + 1;
          this.currentYear = currentDate.getFullYear();
        },

        getCurrentDate() {
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const day = String(today.getDate()).padStart(2, '0');
          this.currentDate = `${year}-${month}-${day}`;
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
    components: { CButton, DelModal }
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
