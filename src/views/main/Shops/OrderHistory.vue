<template>
    <div>
        <label style="font-size: 24px;"> Επιλογή Ημερομηνίας</label>
        <VueDatePicker v-model="date" style="margin-bottom: 2%" model-type="yyyy-MM-dd"></VueDatePicker>

        <div v-for="(entry, id) in table" :item="entry" :key="id">

            <CRow>
                <CCol md="12">
                    <CCard style="margin-bottom: 2rem; border: 2px solid #000;">
                        <CCardHeader style="text-align: center;">
                            <h3>Αριθμός Παραγγελίας #{{ entry.orderid }}</h3>
                        </CCardHeader>
                        <div class="card1">
                            <div class="left-div">
                                <h5>Διεύθυνση: {{ entry.address }}</h5>
                                <h5>Τιμή: {{ entry.price }} €</h5>
                                <h5>Σημειώσεις: {{ entry.texta }}</h5>
                            </div>
                            <div class="right-div">
                                <h4>Status:</h4>
                                <div v-if="entry.state == 1">
                                    <CButton color="warning" shape="rounded-pill">Ανοιχτή</CButton>
                                </div>
                                <div v-if="entry.state == 3">
                                    <CButton color="success" shape="rounded-pill" style="margin-bottom: 2%;">Παραδόθηκε
                                    </CButton>
                                    <div v-for="e in entry.users" :key="e">
                                        <h5>Διανομέας: {{ e.name }} {{ e.surname }}</h5>
                                        <h5>Ώρα Παράδοσης: {{ entry.ptime }}</h5>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <CCardFooter>
                            <h5>Ημερομηνία και Ωρα: {{ entry.odate }} {{ entry.otime }} </h5>
                        </CCardFooter>
                    </CCard>

                </CCol>
            </CRow>
            <br /><br /><br />
        </div>
    </div>
    <br />
</template>

<script>
import axios from 'axios';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
    components: { VueDatePicker },
    data() {
        return {
            table: [],
            useraccept: '',
            date: null,
            userid: localStorage.getItem('userid'),
        }
    },

    methods: {
        get(dt) {
            axios.get('/restApi/api/ReadOrder.php')
                .then(res => {
                    this.table = []
                    var j = 0;
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].state == 3 && res.data[i].odate == dt && res.data[i].userid == this.userid) {
                            this.table[j] = res.data[i]
                            j++
                        }
                    }
                    this.useraccept = localStorage.getItem('name')
                })
                .catch(err => console.log(err));
        }
    },

    watch: {
        date: {
            immediate: true,
            handler(newDate) {
                if (newDate !== null) {
                    this.get(newDate);
                }
            },
        },
    },
}
</script>
<style scoped>
.card1 {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: row;
}

.left-div {
    flex: 1;
    padding: 2%;
    background-color: #f0f0f0;
}

.right-div {
    flex: 1;
    width: 50%;
    padding: 2%;
    background-color: #e0e0e0;
}
</style>
