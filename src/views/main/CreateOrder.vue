<template>
    <div>
        <CAlert color="success" :visible="liveExampleVisible"
              >Επιτυχημέμη Αποστολή Παραγγελείας</CAlert
            >
        <CCard>
            <CForm @submit.prevent="AddOrder" ref="orderform">
                <h2 style="text-align: center;">Νέα Παραγγελεία</h2>
                <CCardbody class="card">
                    <CAlert color="danger" :visible="liveExampleVisible3" style="width: 70%"
              >Το πεδίο δεν μπορεί να είναι άδειο</CAlert
            >
                    <CFormInput
              label="Διεύθυνση"
              v-model="address"
              name="address"
              size="lg"
              horizontal
              placeholder="Προσθήκη Διεύθυνσης..."
              style="width: 70%; margin-bottom: 1rem;"
            />  
            <CAlert color="danger" :visible="liveExampleVisible2" style="width: 70%"
              >Αυτό το πεδίο πρέπει να είναι αριθμός</CAlert
            >
            <CFormInput
              label="Ποσό"
              v-model="price"
              name="price"
              size="lg"
              horizontal
              placeholder="Ποσό..."
              style="width: 70%; margin-bottom: 1rem;"
            />
            <CFormTextarea
                label="Σημειώσεις"
                placeholder="Περιεχόμενο Απάντησης..."
                v-model="texta"
                horizontal
                rows="3"
                style="width: 70%; margin-bottom: 1rem;"
              />
                </CCardbody>
                <CCardFooter style="text-align: center">
            <CButton  type="submit" size="bg" color="primary" ><CIcon name="cil-check-circle"/> Αποστολή Παραγγελείας</CButton>
          </CCardFooter>
            </CForm>
        </CCard>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'CreateOrder',

    data() {
        return {
            address: '',
            price: '',
            texta: '',
            user:localStorage.getItem('userid'),
            liveExampleVisible: false,
            liveExampleVisible2: false,
            liveExampleVisible3: false,
        }
    },

    methods:{
        isNumeric: function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
        AddOrder(){
            if(confirm("Είστε σίγουρος ότι θέτε να γίνει Αποστολή;")){
                if(this.address != '') {
                if(this.isNumeric(this.price) === false || this.price == ''){
                    this.liveExampleVisible2 = true;
                }
                else {
            axios.post('/restApi/api/CreateOrder.php', {
                address: this.address,
                price: this.price,
                texta: this.texta,
                userid: this.user,
            })
            .catch(err => console.log(err));

            this.liveExampleVisible = true;
             this.address = ''
                this.price = ''
                this.texta = ''
                this.liveExampleVisible2 = false
                this.liveExampleVisible3 = false
        }
    }else {
        this.liveExampleVisible3 = true;
    }
    }
        setTimeout(() => {
            this.liveExampleVisible = false
        }, 3000)
    }
    }
}
</script>

<style scoped>
.card{
    padding-left: 2rem;
    border: none;
}

</style>