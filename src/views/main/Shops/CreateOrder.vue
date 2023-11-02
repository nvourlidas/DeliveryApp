<template>
    <div>
        <CAlert color="success" :visible="liveExampleVisible"
              >Επιτυχημέμη Αποστολή Παραγγελίας</CAlert
            >
        <CCard>
            <CForm @submit.prevent="AddOrder" ref="orderform">
                <h2 style="text-align: center;">Νέα Παραγγελία</h2>
                <CCardbody class="card">
                    <CAlert color="danger" :visible="liveExampleVisible3" style="width: 70%"
              >Το πεδίο δεν μπορεί να είναι άδειο</CAlert>
            <CRow>
                    <CFormInput
                    floatingLabel="Διεύθυνση"
              v-model="address"
              name="address"
              size="lg"
              horizontal
              placeholder="Προσθήκη Διεύθυνσης..."
              style="width: 70%; margin-bottom: 1rem;"
            />
             
          <CButton color="danger"  class="butt" @click="clear(1)"><CIcon :icon="cilX" size="xl"></CIcon></CButton>
         </CRow>
            <CAlert color="danger" :visible="liveExampleVisible2" style="width: 70%"
              >Αυτό το πεδίο πρέπει να είναι αριθμός</CAlert> 
            <div style="position: relative;">
    </div>
            <CFormInput
            floatingLabel="Ποσό"
              v-model="price"
              name="price"
              size="lg"
              horizontal
              placeholder="Ποσό..."
              style="width: 70%; margin-bottom: 1rem;"
            />
            <CButton color="danger"  class="butt" @click="clear(3)"><CIcon :icon="cilX" size="xl"></CIcon></CButton>
            <CRow>
            <CFormTextarea
            floatingLabel="Σημειώσεις"
                placeholder="Περιεχόμενο Απάντησης..."
                v-model="texta"
                horizontal
                rows="3"
                style="width: 70%; margin-bottom: 1rem;"
              />
          <CButton @click="clear(2)" color="danger"  class="butt"><CIcon :icon="cilX" size="xl"></CIcon></CButton>
            </CRow>
                </CCardbody>
                <CCardFooter style="text-align: center">
            <CButton  type="submit" size="bg" color="primary"><CIcon name="cil-check-circle"/> Αποστολή Παραγγελίας</CButton>
          </CCardFooter>
            </CForm>
        </CCard>
    </div>
</template>

<script>
import axios from 'axios'
import { CIcon } from '@coreui/icons-vue';
import {  cilX } from '@coreui/icons';
export default {
    name: 'CreateOrder',
    data() {
        return {
            address: '',
            price: '',
            texta: '',
            user: localStorage.getItem('userid'),
            liveExampleVisible: false,
            liveExampleVisible2: false,
            liveExampleVisible3: false,
            ftoken: localStorage.getItem('ftoken'),
            utype: localStorage.getItem('utype'),
            cilX,
            region: localStorage.getItem('region'),
        };
    },
    methods: {
        isNumeric: function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },
        AddOrder() {
            if (confirm("Είστε σίγουρος ότι θέτε να γίνει Αποστολή;")) {
                if (this.address != '') {
                    if (this.isNumeric(this.price) === false || this.price == '') {
                        this.liveExampleVisible2 = true;
                    }
                    else {
                        axios.post('/restApi/api/CreateOrder.php', {
                            address: this.address,
                            price: this.price,
                            texta: this.texta,
                            userid: this.user,
                            region: this.region,
                        })
                            .catch(err => console.log(err));
                        this.notif();
                        this.liveExampleVisible = true;
                        this.address = '';
                        this.price = '';
                        this.texta = '';
                        this.liveExampleVisible2 = false;
                        this.liveExampleVisible3 = false;
                    }
                }
                else {
                    this.liveExampleVisible3 = true;
                }
            }
            setTimeout(() => {
                this.liveExampleVisible = false;
            }, 3000);
        },
        notif() {
            axios.post('/restApi/api/firebaseNot.php', {
                userid: localStorage.getItem('userid'),
                utype: this.utype,
                region: this.region
            })
                .catch(err => console.log(err));
        },

        clear(n){
            if(n ==1){
            this.address = ''
            }else if(n==2){
                this.texta = ''
            }else{
                this.price =''
            }
        },  
    },
    components: { CIcon }
}
</script>

<style scoped>
.card{
    padding-left: 2rem;
    border: none;
}

img{
    padding-left: 0%;
    width: 100%;
}

.butt{
  display: inline-block;
  color: #fff; /* Text color */
  border: none;
  border-radius: 5px; /* Rounded corners */
  cursor: pointer;
  font-size: 16px;
  width: 10%;
  margin: 0.5%;

}


@media screen and (max-width: 600px) {
  .butt {
    width: 30%; 
    font-size: 14px; 
  }
}
.butt:hover {
  background-color: #e4a00d; /* Change the background color on hover */
}


</style>