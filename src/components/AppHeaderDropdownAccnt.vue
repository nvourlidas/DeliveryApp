<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Account
      </CDropdownHeader>
      <CDropdownItem><p>{{ name }} {{ surname }}</p></CDropdownItem>
      <div v-if="utype == 2">
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Παραγγελίες
      </CDropdownHeader>
      <CDropdownItem>
        <CIcon icon="cil-envelope-open" /> Ανοιχτές
        <CBadge color="danger" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-task" /> Κλειστές
        <CBadge color="success" class="ms-auto">{{ itemsCount2 }}</CBadge>
      </CDropdownItem></div>
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        Αποσύνδεση
      </CDropdownHeader>
      <CDropdownItem> 
        <CButton color="primary" @click="logout">
          <CIcon icon="cil-lock-locked" class="me-2" />Log Out</CButton></CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import avatar from '@/assets/images/avatars/blankicon.png'
import { CDropdownItem } from '@coreui/vue'
import axios from 'axios'
export default {
    name: 'AppHeaderDropdownAccnt',
    setup() {
        return {
            avatar: avatar,
            
        };
    },
    data() {
        return {
            name: '',
            surname: '',
            itemsCount: '',
            itemsCount2: '',
            userid: localStorage.getItem('userid'),
            currentDate: '',
            utype: localStorage.getItem('utype'),
        };
    },
    created() {
        this.get();
        this.getsum()
        this.getCurrentDate()
        setInterval(this.getsum, 5000)
    },
    methods: {
        get() {
            axios.get('/restApi/api/ReadAllUsers.php')
                .then(res => {
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].userid == localStorage.getItem('userid')) {
                        this.name = res.data[i].name;
                        this.surname = res.data[i].surname;
                    }
                }
            });
        },

        getsum(){
          axios.get('/restApi/api/ReadOrder.php')
              .then(res => { 
                var count = 0;
                var count2 = 0;
                for(var i=0; i<res.data.length; i++){
                  if(res.data[i].odate == this.currentDate){
                  if(res.data[i].useraccept == this.userid && res.data[i].oloruser == null){
                    count += 1
                  }else if(res.data[i].useraccept == this.userid && res.data[i].oloruser == this.userid){
                    count2 += 1
                  }
                }
              }
                this.itemsCount = count;
                this.itemsCount2 = count2;
              }).catch(err => console.log(err));
        },

        getCurrentDate() {
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const day = String(today.getDate()).padStart(2, '0');
          this.currentDate = `${year}-${month}-${day}`;
        },

        logout(){
          this.deleteToken()
          axios.post('/restApi/api/online.php',{userid: this.userid, status:1})
          .then(res=>{
          localStorage.removeItem('token');
          localStorage.removeItem('userid')
          localStorage.removeItem('utype')
          this.$router.push('/pages/login');
          console.log(this.token)
          console.log(res);
        })
          
        },
        deleteToken(){
          axios.delete(`/restApi/api/DeleteToken.php/?userid=${this.userid}`)
        }
    },
    components: { CDropdownItem }
}
</script>
