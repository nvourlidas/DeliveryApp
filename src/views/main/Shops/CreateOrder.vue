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
             <CButton class="butt" @click="startRecognition" :disabled="listening">
              <CIcon :icon="cilMic" size="xl"></CIcon>
          </CButton>
          <CButton class="butt" @click="stopRecognition" :disabled="!listening">
            <CIcon :icon="cilX" size="xl"></CIcon>
          </CButton>
          <CButton class="butt1" @click="clear(1)">X</CButton>
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
            <CRow>
            <CFormTextarea
            floatingLabel="Σημειώσεις"
                placeholder="Περιεχόμενο Απάντησης..."
                v-model="texta"
                horizontal
                rows="3"
                style="width: 70%; margin-bottom: 1rem;"
              /><CButton class="butt" @click="startRecognition2" :disabled="listening2">
              <CIcon :icon="cilMic" size="xl"></CIcon>
          </CButton>
          <CButton class="butt" @click="stopRecognition2" :disabled="!listening2">
            <CIcon :icon="cilX" size="xl"></CIcon>
          </CButton>
          <CButton class="butt1" @click="clear(2)">X</CButton>
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
import annyang from 'annyang'
import { CIcon } from '@coreui/icons-vue';
import { cilMic, cilX } from '@coreui/icons';
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
            inputText: "",
            listening: false,
            listening2: false,
            recognition: null,
            cilMic,
            cilX,
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
                utype: this.utype
            })
                .catch(err => console.log(err));
        },
        startRecognition() {
            if (annyang) {
                annyang.setLanguage('el-GR');
                annyang.start();
                annyang.addCallback('result', (phrases) => {                
                    this.address = phrases[0];                
                });
                this.listening = true;
            }
            else {
                alert('Αυτός ο browser δεν υποστηρίζει speech to text!');
            }
        },
        startRecognition2() {
            if (annyang) {
                annyang.setLanguage('el-GR');
                annyang.start();
                annyang.addCallback('result', (phrases) => {                
                    this.texta = phrases[0];                
                });
                this.listening2 = true;
            }
            else {
                alert('Αυτός ο browser δεν υποστηρίζει speech to text!');
            }
        },

        clear(n){
            if(n ==1){
            this.address = ''
            }else{
                this.texta = ''
            }
        },
        stopRecognition() {
            if (annyang) {
                annyang.abort();
                this.listening = false;
            }
        },

        stopRecognition2() {
            if (annyang) {
                annyang.abort();
                this.listening2 = false;
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
.speech-to-txt{
    width: 7%;
    content: icon;
}

img{
    padding-left: 0%;
    width: 100%;
}

.butt{
  display: inline-block;
  background-color: #007bff; /* Background color */
  color: #fff; /* Text color */
  border: none;
  border-radius: 5px; /* Rounded corners */
  cursor: pointer;
  font-size: 16px;
  width: 10%;
  margin: 0.5%;

}

.butt1{
  display: inline-block;
  background-color: #f03405e4; /* Background color */
  color: #fff; /* Text color */
  border: none;
  border-radius: 5px; /* Rounded corners */
  cursor: pointer;
  font-size: 16px;
  width: 10%;
  margin: 0.5%;

}

@media screen and (max-width: 600px) {
  .butt, .butt1 {
    width: 30%; /* Adjust the width as per your design needs */
    font-size: 14px; /* Adjust the font size as per your design needs */
  }
}
.butt:hover {
  background-color: #0056b3; /* Change the background color on hover */
}


</style>