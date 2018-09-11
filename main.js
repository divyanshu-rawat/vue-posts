import Vue from 'vue';
import App from './App.vue';
import router from './router';
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
            router,
            render: h => h(App)
        })
    }
})

// Check if the route exists and requires authentication.
// Then create a reference to the current user and authenticate routes.

