<template>
    <div>
        <CAlert color="success" :visible="liveExampleVisible"
              >Επιτυχημέμη Εισαγωγή Διανομέα</CAlert
            >
        <CCard>
            <CForm @submit.prevent="AddUser" ref="orderform">
                <h2 style="text-align: center;">Νέος Χρήστης</h2>
                <CCardbody class="card">
                    <CAlert color="danger" :visible="liveExampleVisible3" style="width: 70%"
              >Το πεδίο δεν μπορεί να είναι άδειο</CAlert
            >
                    <CFormInput
              label="Username"
              v-model="username"
              name="username"
              size="lg"
              horizontal
              placeholder="Προσθήκη Username..."
              style="width: 70%; margin-bottom: 1rem;"
            />  
            <CAlert color="danger" :visible="liveExampleVisible2" style="width: 70%"
              >Αυτό το πεδίο πρέπει να είναι αριθμός</CAlert>
            <CFormInput
              label="Password"
              v-model="password"
              name="password"
              size="lg"
              horizontal
              placeholder="Προσθήκη Password..."
              style="width: 70%; margin-bottom: 1rem;"
            /> 
            <CFormInput
              label="Όνομα Χρήστη"
              v-model="name"
              name="name"
              size="lg"
              horizontal
              placeholder="Προσθήκη Ονόματος..."
              style="width: 70%; margin-bottom: 1rem;"
            /> 
            <CFormInput
              label="Επίθετο Χρήστη"
              v-model="surname"
              name="surname"
              size="lg"
              horizontal
              placeholder="Προσθήκη Επιθέτου..."
              style="width: 70%; margin-bottom: 1rem;"
            /> 
            <CFormSelect size="lg" class="mb-3"
            style="width: 70%;"
             label="Επιλογή Περιοχής"
             v-model="region">
                <option>Επιλογή Περιοχής</option>
                <option value="1">Γιαννιτσά</option>
                <option value="2">Θεσσαλονίκη</option>
                
            </CFormSelect>
                </CCardbody>
                <CCardFooter style="text-align: center">
            <CButton  type="submit" size="bg" color="primary" ><CIcon name="cil-check-circle"/> Εισαγωγή Διανομέα</CButton>
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
            username: '',
            password: '',
            name: '',
            surname: '',
            region: '',

            user:localStorage.getItem('userid'),
            liveExampleVisible: false,
            liveExampleVisible2: false,
            liveExampleVisible3: false,
        }
    },

    methods:{
        
        AddUser(){
            if(confirm("Είστε σίγουρος ότι θέτε να γίνει Αποστολή;")){
                if(this.username != '') {
            axios.post('/restApi/api/CreateUser.php', {
                username: this.username,
                password: this.password,
                name: this.name,
                surname: this.surname,
                usertype: 2,
                region: this.region,
            })
            .catch(err => console.log(err));

            this.liveExampleVisible = true;
             this.username = ''
                this.password = ''
                this.name = ''
                this.surname= ''
                this.liveExampleVisible2 = false
                this.liveExampleVisible3 = false
        
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