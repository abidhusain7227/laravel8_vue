

import Vue from "vue"
import BootstrapVue from 'bootstrap-vue'
import App from '@/js/views/App'
import "bootstrap-vue/dist/bootstrap-vue.css"
import Toasted from 'vue-toasted';
import pagination from "laravel-vue-pagination";
import router from '@/js/index'
window.Vue = Vue;

Vue.use(BootstrapVue)

Vue.use(Toasted, {
    duration: 4000,
    position: 'top-right',
    action : {
      onClick : (e, toastObject) => {
          toastObject.goAway(0);
      }
    }
});
Vue.use(pagination);

window.onload = function() {
    const app = new Vue({
        el: '#app',
        router,
        render: h => h(App)
    });
}

export default app;