<template>
   <CButton :color="bcolorA" @click="visibleA = !visibleA, visibleB = false, color()" style="margin-right: 2%;">Καταστήματα</CButton>
   <CButton :color="bcolorB" @click="visibleB = !visibleB, visibleA = false, color()">Διανομείς</CButton>
   <CRow>
    <CCol xs="6">
      <CCollapse :visible="visibleA">
        <div  v-for="(entry, id) in table"
                :item="entry"
                :key="id">
        <CCard class="mt-3" v-if="entry.usertype == 3">
            <CCardHeader style="text-align: center;">
                <h3>{{ entry.name }} </h3>
            </CCardHeader>
          <CCardBody>
            <div>
                <div class="cont">
                 <h3 class="element">Username: <div v-if="uv == true">{{ entry.username }}</div></h3>
                 <input v-model="uname" v-if="uv == false && uid == id">
                 <CButton color="primary" class="element1" @click="uvisible(id)" v-if="uv == true">
                    <CIcon icon="cil-pencil"  /></CButton>
                    <CButton color="primary" class="element1" @click="uchange(entry.userid)" v-if="uv == false && uid==id">
                    <CIcon icon="cil-check-circle"  /></CButton>
                    <CButton color="danger" v-if="uv == false && uid==id" @click="uv=true, uname=''">X</CButton>
                 </div>
                 <div class="cont">
                 <h3 class="element">Password: <div v-if="pv == true"> {{ entry.password }}</div></h3>
                 <input v-model="pass" v-if="pv == false && uid == id">
                 <CButton color="primary" class="element1" @click="pvisible(id)" v-if="pv == true">
                    <CIcon icon="cil-pencil"  /></CButton>
                    <CButton color="primary" class="element1" @click="uchange(entry.userid)" v-if="pv == false && uid==id">
                    <CIcon icon="cil-check-circle"  /></CButton>
                    <CButton color="danger" v-if="pv == false && uid==id" @click="pv=true, pass=''">X</CButton>
                </div>
            </div>
          </CCardBody>
          <CCardFooter>
            <CButton color="danger" @click="delete1(entry.userid)"><CIcon name="cil-ban"/>Διαγραφή</CButton>
          </CCardFooter>
        </CCard>
    </div>
      </CCollapse>
      <CCollapse :visible="visibleB">
        <div  v-for="(entry, id) in table"
                :item="entry"
                :key="id">
        <CCard class="mt-3" v-if="entry.usertype == 2">
            <CCardHeader style="text-align: center;">
                <h3>{{ entry.name }} {{ entry.surname }}</h3>
            </CCardHeader>
          <CCardBody>
            <div>
                <div class="cont">
                 <h3 class="element">Username: <div v-if="uv == true">{{ entry.username }}</div></h3>
                 <input v-model="uname" v-if="uv == false && uid == id">
                 <CButton color="primary" class="element1" @click="uvisible(id)" v-if="uv == true">
                    <CIcon icon="cil-pencil"  /></CButton>
                    <CButton color="primary" class="element1" @click="uchange(entry.userid)" v-if="uv == false && uid==id">
                    <CIcon icon="cil-check-circle"  /></CButton>
                    <CButton color="danger" v-if="uv == false && uid==id" @click="uv = true, uname = ''">X</CButton>
                 </div>
                 <div class="cont">
                 <h3 class="element">Password: <div v-if="pv == true"> {{ entry.password }}</div></h3>
                 <input v-model="pass" v-if="pv == false && uid == id">
                 <CButton color="primary" class="element1" @click="pvisible(id)" v-if="pv == true">
                    <CIcon icon="cil-pencil"  /></CButton>
                    <CButton color="primary" class="element1" @click="uchange(entry.userid)" v-if="pv == false && uid==id">
                    <CIcon icon="cil-check-circle"  /></CButton>
                    <CButton color="danger" v-if="pv == false && uid==id" @click="pv=true, pass=''">X</CButton>
                </div>
            </div>
          </CCardBody>
          <CCardFooter>
            <CButton color="danger" @click="delete1(entry.userid)"><CIcon name="cil-ban"/>Διαγραφή</CButton>
          </CCardFooter>
        </CCard>
    </div>
      </CCollapse>
      
    </CCol>
   </CRow>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            table: [],
            visibleA: false,
            visibleB: false,
            uv: true,
            pv: true,
            uid: '',
            uname: '',
            pass: '',
            bcolorA: 'primary',
            bcolorB: 'primary',
        }
    },

    created(){
        this.get()
        setInterval(this.get, 5000);
    },

    methods:{
        get(){
            axios.get('restApi/api/ReadAllUsers.php')
            .then(res=> {this.table = res.data})
        },
        uvisible(id){
            this.uv = false
            this.uid = id
        },

        pvisible(id){
            this.pv = false
            this.uid = id
        },

        uchange(id){
            if(confirm("Είστε σίγουρος ότι θέτε να γίνει Αλλαγή;")){
                axios.post('restApi/api/UpdateUsers.php',{
                    userid : id,
                    username: this.uname,
                    password: this.pass
                })
                .then(
                    this.get(),
                    this.uname='',
                    this.pass='',
                )
                
                this.uv = true
                this.pv = true
            }
        },

        color(){
          if(this.visibleA){
            this.bcolorA = 'warning'
          }else{
            this.bcolorA = 'primary'
          }

          if(this.visibleB){
            this.bcolorB = 'warning'
          }else{
            this.bcolorB = 'primary'
          }
        },

        delete1(id){
            if(confirm("Είστε σίγουρος ότι θέλετε να γίνει Διαγραφή")){
      axios.delete(`/restApi/api/DeleteUser.php/?userid=${id}`)
        .then( res=>{
          for(var i=0; i<this.table.length; i++){
            if(id==this.table[i].userid){
              this.table.splice(i,1)
              var x = res.data;
              x;
            }
          }
        })
      .catch(err => console.log(err));
        }
        },
    },
}
</script>

<style scoped>
.cont{
    display: flex;
    border: 1px solid #ccc;
    padding-bottom: 2rem;
    align-content: center;
    
}

.element {
      flex: 1;
    }

.element1{
    flex: 1;
}
</style>