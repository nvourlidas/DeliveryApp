<template>
  <CSidebar position="fixed" :unfoldable="sidebarUnfoldable" :visible="sidebarVisible" @visible-change="(event) =>
      $store.commit({
        type: 'updateSidebarVisible',
        value: event,
      })
    ">
    <CSidebarBrand>
      <!-- <CIcon
        custom-class-name="sidebar-brand-full"
        :icon="logoNegative"
        :height="35"
      />
      <CIcon
        custom-class-name="sidebar-brand-narrow"
        :icon="sygnet"
        :height="35"
      /> -->
      <img src="@/assets/images/Logo2.png">
    </CSidebarBrand>

    <AppSidebarNav v-if="utype == 3" />
    <AppSidebarNav2 v-if="utype == 2" />
    <AppSidebarNav3 v-if="utype == 1" />
    <div v-if="utype == 1">
      <h3>Online Διανομείς: </h3>
      <p v-if="table.length == 0">Κανένας Online</p>
      <ul>
        <li v-for="item in table" :key="item.id">{{ item.name }} {{ item.surname }}</li>
      </ul>
    </div>
    <CSidebarToggler class="d-none d-lg-flex" @click="$store.commit('toggleUnfoldable')" />
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

  data() {
    return {
      utype: '',
      user: [],
      token: localStorage.getItem('token'),
      table: [],
    }
  },

  created() {
    this.validate()
    this.online()
    setInterval(this.online, 3000)

  },



  methods: {
    validate() {
      axios.post('/login/validate.php', { jwt: this.token })
        .then(resp => {
          this.utype = resp.data.user.utype,
            this.user = resp.data.user
        }
        )
        .catch(err => console.log(err));
    },

    online() {
      axios.get('/restApi/api/ReadAllUsers.php')
        .then(res => {
          var j = 0;
          this.table = [];
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].online == 1 && res.data[i].usertype == 2) {
              this.table[j] = res.data[i]
              j++
            }
          }
        })
        .catch(err => console.log(err));
    },
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

<style scoped>
ul li::marker {
  color: green;
  font-size: 1.7em;
}

img {
  width: 50%;
  border-radius: 50%;
}
</style>
