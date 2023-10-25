<template>
    <div>
        <CAccordion v-for="(entry, id) in table"
            :item="entry"
            :key="id">
            <CAccordionItem>
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
    },
   components: {DelModal2}
}
</script>