<template>
    <div>
      <CRow>
        <CCol :xs="4" v-for="(entry, id) in table"
                :item="entry"
                :key="id">
                
          <CWidgetStatsC  class="mb-3" title="Dels" inverse color="info">
            
            <template #icon><CIcon icon="cil-people" height="36"/></template>
            <template #title>{{entry.name}} {{ entry.surname }}</template>
            <template #value>Ανοιχτές: {{ entry.accorders }} <br />
               Ολοκληρωμένες: {{ entry.olorders }}<br/>
              <CButton color="success" @click="showModal(entry.userid)">Λεπτομέριες</CButton></template>
          </CWidgetStatsC>
        
        </CCol>
      </CRow>
      <div>
    
    <DelModal :show-modal="show" @close="show = false, orders= []" :orders="orders" >
      
    </DelModal>
  </div>
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
           // j: 0,
        };
    },
    created() {
        this.get();
        setInterval(this.get, 5000);
        
    },
    methods: {
        get() {
            axios.get('/restApi/api/SumOrders.php')
                .then(res => { this.table = res.data; }).catch(err => console.log(err));
        },
        
        showModal(id){
          axios.get('/restApi/api/ReadOrder.php')
          .then(res=>{
            var j=0;
            for(var i=0; i<res.data.length; i++){
              if(res.data[i].oloruser == id){
              this.orders[j] = res.data[i];
              j++;
            }
            }            
          })
          this.show = true;
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
