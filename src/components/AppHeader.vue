<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <!-- <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <CIcon :icon="logo" height="48" alt="Logo" />
      </CHeaderBrand> -->
      <!-- <CHeaderNav class="d-none d-md-flex me-auto">
        <CNavItem>
          <CNavLink href="/dashboard"> Dashboard </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">Users</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">Settings</CNavLink>
        </CNavItem>
      </CHeaderNav> -->
      <!-- <CHeaderNav> -->
        <!-- <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-bell" size="lg" />
          </CNavLink>
        </CNavItem> -->
        <CButton color="primary" @click="logout"><CIcon icon="cil-lock-locked" class="me-2" />Log Out</CButton>
        <!--<CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-list" size="lg" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-envelope-open" size="lg" />
          </CNavLink>
        </CNavItem>
        <AppHeaderDropdownAccnt />
      </CHeaderNav> -->
    </CContainer>
    <CHeaderDivider />
    <!-- <CContainer fluid>
      <AppBreadcrumb />
    </CContainer> -->
  </CHeader>
</template>

<script>
//import AppBreadcrumb from './AppBreadcrumb'
//import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import { logo } from '@/assets/brand/logo'
import axios from 'axios'
export default {
  name: 'AppHeader',
  // components: {
  //   //AppBreadcrumb,
  //  // AppHeaderDropdownAccnt,
  // },

  data(){
    return{
      token:localStorage.getItem('token'),
      user:[],
    }
  },
  setup() {
    return {
      logo,
    }
  },

  created(){
     axios.post('/login/validate.php',{ jwt: this.token})
       .then(resp=>{
          if(resp.data.res!=1){
          this.user=resp.data.user
          localStorage.setItem('userid',resp.data.user.userid)
          localStorage.setItem('utype',resp.data.user.utype)
        }else{
          this.$router.push('/pages/login')
        }
  })
        .catch(err => console.log(err));
        console.log(this.token)
  },

  methods:{
    logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('userid')
      localStorage.removeItem('utype')
      this.$router.push('/pages/login');
      console.log(this.token)
    }
  }

}
</script>
