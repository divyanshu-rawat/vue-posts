import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {store} from './store';

import BootstrapVue from 'bootstrap-vue';
import {fbconfig} from './firebaseConfig';

Vue.use(BootstrapVue);

Vue.config.productionTip = false

let app;

// for handling page reloads
// eslint-disable-next-line
fbconfig.auth.onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            el: '#app',
            store,
            router,
            render: h => h(App)
        })
    }
})


