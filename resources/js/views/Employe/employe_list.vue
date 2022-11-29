<script>
import axios from 'axios';
export default {
    data () {
    return {
      info: null,
      data: null,
    }
  },
  methods: {
    getdata(){
        axios.get('api/getdata').then((response) => {
            this.data = response;
            console.log(this.data)
          });
          console.log('abid')
    }
  },
    mounted () {
        axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response));
      this.getdata();
  },

}
</script>

<template>
    <div>
        <h2>Employe List</h2>
        <router-link :to="{name: 'employe/add'}" class="btn btn-success btn-rounded mr-2 add-btn"><i class="mdi mdi-plus mr-1"></i> Add Employe</router-link>
        <div>
            {{info}}
            {{data.data}}
        </div>
    </div>
</template>