
<template>
    <div id="login">
        <section>
            <div class="col1">
                <h1>Hacker News</h1>
                <p>Hacker News is a social news website focusing on computer science and entrepreneurship. </p>
            </div>
            <div class="col2">
                <form @submit.prevent>
                    <h1>Welcome to Hacker News</h1>

                    <label for="email">Email</label>
                    <input v-model.trim = "loginForm.email" type="text" placeholder="you@email.com" id="email" />

                    <label for="password">Password</label>
                    <input v-model.trim = "loginForm.password" type="password" placeholder="******" id="password" />

                    <button @click = "login" class="button">Log In</button>

                    <div class="extras">
                        <a>Forgot Password</a>
                        <a>Create An Account</a>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<script>

	import {fbconfig} from '../firebaseConfig';
    export default {

    	data(){
    		return{

    			loginForm:{
    				email:'',
    				password:''
    			}
    		}
    	},
    	methods: {

    		login() {
			    fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password)
			    .then(user => {
			        this.$store.commit('setCurrentUser', user.user)
			        this.$store.dispatch('fetchUserProfile')
			        this.$router.push('/dashboard')
			    }).catch(err => {
			        console.log(err)
			    })
			},

    	}
    
    }
</script>