<template>
    <div>
      <CButton :color="bcolorA" @click="visibleA = !visibleA, visibleB = false, color()" style="margin: 2%;">Τρέχων Μήνας</CButton>
      <CButton :color="bcolorB" @click="visibleB = !visibleB, visibleA = false, color()"> Από Πάντα</CButton>
      <CCollapse :visible="visibleA">
      <CRow>
        <CCol :xs="4" v-for="(entry, id) in Ctable"
                :item="entry"
                :key="id">
                
          <CWidgetStatsC  class="mb-3" title="Dels" inverse color="info">
            
            <template #icon><CIcon icon="cil-people" height="36"/></template>
            <template #title>{{entry.name}} {{ entry.surname }}</template>
            <template #value>Ανοιχτές: {{ entry.accorders }} <br />
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
                
          <CWidgetStatsC  class="mb-3" title="Dels" inverse color="info">
            
            <template #icon><CIcon icon="cil-people" height="36"/></template>
            <template #title>{{entry.name}} {{ entry.surname }}</template>
            <template #value>Ανοιχτές: {{ entry.accorders }} <br />
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
    </div>
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
            visibleA: false,
            visibleB: false,
            currentMonth: '',
            currentYear: '',
            bcolorA: 'primary',
            bcolorB: 'primary',
        };
    },
    created() {
        this.get();
        setInterval(this.get, 5000);
        this.currentmy()
       
        
    },
    methods: {
        get() {
            axios.get('/restApi/api/SumOrders.php')
                .then(res => { this.table = res.data}).catch(err => console.log(err));

            axios.get('/restApi/api/CurrentSum.php')
              .then(res => { this.Ctable = res.data}).catch(err => console.log(err));
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
            }else{
              j=0;
              for(i=0; i<res.data.length; i++){
                var dateArray = res.data[i].odate.split('-');
                var year = parseInt(dateArray[0]);
                var month = parseInt(dateArray[1]);
                if(res.data[i].oloruser == id && year == this.currentYear && month == this.currentMonth ){
                this.orders[j] = res.data[i];
                j++;
                }
                console.log(year)
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
        },
        
        currentmy(){
          const currentDate = new Date();
          this.currentMonth = currentDate.getMonth() + 1;
          this.currentYear = currentDate.getFullYear();
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

</style>
