<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody style="text-align: center">
                <CForm @submit.prevent="login">
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                    placeholder="Username"
                    autocomplete="username email"
                    v-model="username"
                    :is-valid="validator"
                    
                    invalid-feedback="Δωστε username"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                    v-model="password"
                    :is-valid="validator"
                    
                    invalid-feedback="Δώστε password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol>
                      <CButton color="primary" class="px-4" type="submit">
                        Login
                      </CButton>
                    </CCol>
                    <!-- <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton>
                    </CCol> -->
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <!-- <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <CButton color="light" variant="outline" class="mt-3">
                    Register Now!
                  </CButton>
                </div>
              </CCardBody>
            </CCard> -->
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from 'axios';
export default {

  name: 'Login',

  data() {
    return {
      username: '',
      password:'',
      userid: '',
    
    }
  },
  methods: {
    login() {
      axios.post('/login/login.php',{username:this.username,password:this.password})
        .then(resp=>{
          if(resp.data.res==1){
             localStorage.setItem('token',resp.data.jwt);
             this.userid=resp.data.userid;
             this.online(this.userid)
      this.$router.push('/')
        }else{
          alert("Τα στοιχεία είναι Λανθασμένα");
        }
        })
        .catch(err => console.log(err));
    },
    validator (val) {
      return val ? val.length >= 1 : false
    },

    online(id){
      axios.post('/restApi/api/online.php',{userid: id, status:0})
    }
  },
}
</script>
