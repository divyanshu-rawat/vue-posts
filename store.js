
import Vue from 'vue'
import Vuex from 'vuex'
import {fbconfig} from './firebaseConfig';

Vue.use(Vuex)

fbconfig.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('setCurrentUser', user)
        store.dispatch('fetchUserProfile')
    }
})

export const store = new Vuex.Store({

	state :{

		currentUser: null,
		userProfile: {}

	},
	actions :{

		clearData({ commit }) {
            commit('setCurrentUser', null)
            commit('setUserProfile', {})
            // commit('setPosts', null)
            // commit('setHiddenPosts', null)
        },

	    fetchUserProfile({ commit, state }) {
	        fbconfig.usersCollection.doc(state.currentUser.uid).get().then(res => {
	            commit('setUserProfile', res.data())
	        }).catch(err => {
	            console.log(err)
	        })
	    }

	},
	mutations:{

		setCurrentUser(state, val) {
	        state.currentUser = val
	    },
	    setUserProfile(state, val) {
	        state.userProfile = val
	    }

	}

});