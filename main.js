import Vue from 'vue';
import App from './App.vue';
// import router from './router';
import {store} from './store';
let fb = require('./firebaseConfig');
Vue.config.productionTip = false


let app;

// for handling page reloads
fb.auth.onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            el: '#app',
            store,
            render: h => h(App)
        })
    }
})
