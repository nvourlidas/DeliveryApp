<template>
  <CSidebar
    position="fixed"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
    @visible-change="
      (event) =>
        $store.commit({
          type: 'updateSidebarVisible',
          value: event,
        })
    "
  >
    <!-- <CSidebarBrand>
      <CIcon
        custom-class-name="sidebar-brand-full"
        :icon="logoNegative"
        :height="35"
      />
      <CIcon
        custom-class-name="sidebar-brand-narrow"
        :icon="sygnet"
        :height="35"
      />
    </CSidebarBrand> -->
    
    <AppSidebarNav v-if="utype == 3"/>
    <AppSidebarNav2 v-if="utype == 2"/>
    <AppSidebarNav3 v-if="utype == 1"/>
    <CSidebarToggler
      class="d-none d-lg-flex"
      @click="$store.commit('toggleUnfoldable')"
    />
  </CSidebar>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { AppSidebarNav } from './AppSidebarNav'
import { AppSidebarNav2 } from './AppSidebarNav2'
import { AppSidebarNav3 } from './AppSidebarNav3'
import { logoNegative } from '@/assets/brand/logo-negative'
import { sygnet } from '@/assets/brand/sygnet'
import axios from 'axios'

export default {
  name: 'AppSidebar',
  components: {
    AppSidebarNav,
    AppSidebarNav2,
    AppSidebarNav3,
  },

  data(){
    return{
      utype:'',
      user:[],
      token:localStorage.getItem('token'),
    }
  },

  created(){
     axios.post('/login/validate.php',{ jwt: this.token})
       .then(resp=>{
          this.utype=resp.data.user.utype,
          this.user=resp.data.user}
  )
        .catch(err => console.log(err));
  
  },

  setup() {
    const store = useStore()
    return {
      logoNegative,
      sygnet,
      sidebarUnfoldable: computed(() => store.state.sidebarUnfoldable),
      sidebarVisible: computed(() => store.state.sidebarVisible),
    }
  },
}
</script>
