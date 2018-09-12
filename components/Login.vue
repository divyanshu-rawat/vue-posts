
<template>
    <div id="login">
    	<transition name="fade">
            <div v-if="performingRequest" class="loading">
                <p>Loading...</p>
            </div>
        </transition>

        <section>
                <div class="col-lg-12">
                    <h1>Hacker News</h1>
                    <p>Hacker News is a social news website focusing on computer science and entrepreneurship. </p>
                </div>
                <div class="col2" :class="{ 'signup-form': !showLoginForm && !showForgotPassword }">
                <form  v-if="showLoginForm" @submit.prevent class="col-lg-4">

                        <div class="form-group">
                            <label for="email">Email</label>
                            <input class = "form-control" v-model.trim = "loginForm.email" type="text" placeholder="you@email.com" id="email" />
                        </div>

                         <div class="form-group">
                            <label for="password">Password</label>
                            <input class = "form-control" v-model.trim = "loginForm.password" type="password" placeholder="******" id="password" />
                         </div>

                        <button @click = "login" class="btn btn-primary">Log In</button>

                        <div class="margin-top">
                            <div>
                                <a @click="togglePasswordReset" class="color">Forgot Password?</a>
                            </div>
                            <div>
                                <a @click="toggleForm" class="color">Create an Account</a>
                            </div>
                        </div>

                 </form>

                 <!-- Sign-up form -->

                 <form v-if="!showLoginForm && !showForgotPassword" @submit.prevent>
                    <h1>Get Started</h1>

                    <label for="name">Name</label>
                    <input v-model.trim="signupForm.name" type="text" placeholder="Savvy Apps" id="name" />

                    <label for="title">Title</label>
                    <input v-model.trim="signupForm.title" type="text" placeholder="Company" id="title" />

                    <label for="email2">Email</label>
                    <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />

                    <label for="password2">Password</label>
                    <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />

                    <button @click="signup" class="button">Sign Up</button>

                    <div class="extras">
                        <a @click="toggleForm">Back to login</a>
                    </div>
                </form>

                <!-- Forgot Password -->
                  <form v-if="showForgotPassword" @submit.prevent class="password-reset">
                    <div v-if="!passwordResetSuccess">
                        <h1>Reset Password</h1>
                        <p>An Email Will Be Sent @Registered Email Address.</p>

                        <label for="email3">Email</label>
                        <input v-model.trim="passwordForm.email" type="text" placeholder="you@email.com" id="email3" />

                        <button @click="resetPassword" class="button">Submit</button>

                        <div class="extras">
                            <a @click="togglePasswordReset">Back to login</a>
                        </div>
                    </div>
                    <div v-else>
                        <h1>Email Sent</h1>
                        <p>Kindly check Your Email</p>
                        <button @click="togglePasswordReset" class="button">Back to login</button>
                    </div>
                </form>

                <!-- Errror Message if Coccurs -->
                <transition name="fade">
                    <div v-if="errorMsg !== ''" class="error-msg">
                        <p>{{ errorMsg }}</p>
                    </div>
                </transition>


            </div>
        </section>
    </div>
</template>

<script>

	/* eslint-disable */ 
	import {fbconfig} from '../firebaseConfig';

    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    export default {

    	data(){
    		return{

    			loginForm:{
    				email:'',
    				password:''
    			},

    			signupForm:{
    				name:'',
    				title:'',
    				email:'',
    				password:''
    			},

    			passwordForm:{
    				email:''
    			},

    			showLoginForm: true,
                showForgotPassword: false,
                passwordResetSuccess: false,
                performingRequest: false,
                errorMsg: ''
    		}
    	},
    	methods: {

    	   login() {
			    fbconfig.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password)
			    .then(user => {
			        this.$store.commit('setCurrentUser', user.user)
			        this.$store.dispatch('fetchUserProfile')
			        this.$router.push('/dashboard')
			    }).catch(err => {
			        console.log(err)
			    })
			},

			toggleForm() {
                this.errorMsg = ''
                this.showLoginForm = !this.showLoginForm
            },

            togglePasswordReset() {
                if (this.showForgotPassword) {
                    this.showLoginForm = true
                    this.showForgotPassword = false
                    this.passwordResetSuccess = false
                } else {
                    this.showLoginForm = false
                    this.showForgotPassword = true
                }
            },

              resetPassword() {
                this.performingRequest = true
                fbconfig.auth.sendPasswordResetEmail(this.passwordForm.email).then(() => {
                    this.performingRequest = false
                    this.passwordResetSuccess = true
                    this.passwordForm.email = ''
                }).catch(err => {
                    console.log(err)
                    this.performingRequest = false
                    this.errorMsg = err.message
                })
            },

	            signup() {
	                this.performingRequest = true
	                fbconfig.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(user => {
	                    
	                    this.$store.commit('setCurrentUser', user)
	                    // create user obj
	                    fbconfig.usersCollection.doc(user.uid).set({
	                        name: this.signupForm.name,
	                        title: this.signupForm.title
	                    }).then(() => {
	                        this.$store.dispatch('fetchUserProfile')
	                        this.performingRequest = false
	                        this.$router.push('/dashboard')
	                    }).catch(err => {
	                        console.log(err)
	                        this.performingRequest = false
	                        this.errorMsg = err.message
	                    })
	                }).catch(err => {
	                    console.log(err)
	                    this.performingRequest = false
	                    this.errorMsg = err.message
	                })
	            }
	    	}
    
    }
</script>



<style>

.btn-primary{
    color: black;
    background-color: white;
    border-color: #000000;
}

.margin-top{
    margin-top:10px !important;
    color: #007bff !important;
}

</style>

