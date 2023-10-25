import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsExample from '@/components/DocsExample'
import axios from 'axios';
import VueSpeech from '@codekraft-studio/vue-speech'
//import firebaseMessaging from './firebase'
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

axios.defaults.baseURL = 'https://speedelivery.net/DeliveryAppApi/'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsExample', DocsExample)
//app.config.globalProperties.$messaging = firebaseMessaging
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
app.use(VueSpeech)
library.add(faUserSecret)