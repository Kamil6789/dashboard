import Vue from 'vue'
import App from './App.vue'
import VueCookie from 'vue-cookie'
import {VueSpinners} from '@saeris/vue-spinners'

Vue.config.productionTip = false
Vue.use(VueSpinners)
Vue.use(VueCookie)

new Vue({
    render: h => h(App),
}).$mount('#app')
