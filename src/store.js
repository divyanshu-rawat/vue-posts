
import Vue from 'vue'
import Vuex from 'vuex'
import {fbconfig} from './firebaseConfig';

Vue.use(Vuex)

// handle page reload
fbconfig.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit('setCurrentUser', user)
        store.dispatch('fetchUserProfile')

        fbconfig.usersCollection.doc(user.uid).onSnapshot(doc => {
            store.commit('setUserProfile', doc.data())
        })

        // realtime updates from our posts collection
        fbconfig.postsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
               
               let postsArray = []
               querySnapshot.forEach(doc => {
                    let post = doc.data()
                    post.id = doc.id
                    postsArray.push(post)
                })

                store.commit('setPosts', postsArray)
        })
    }
})


export const store = new Vuex.Store({

	state :{

		currentUser: null,
		userProfile: {},
		posts: []

	},
	actions :{

		clearData({ commit }) {
            commit('setCurrentUser', null)
            commit('setUserProfile', {})
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
	    },
	    setPosts(state,val){
	    	state.posts = val;
	    }

	}

});