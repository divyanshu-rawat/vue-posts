
<template>
    <div id="login">
    	<transition name="fade">
            <div v-if="performingRequest" class="loading">
                <img src="../assets/cool_gif.gif" width="360px">
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

                        <button @click = "login" class="btn btn-default">Log In</button>

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

                 <form v-if="!showLoginForm && !showForgotPassword" @submit.prevent class="col-lg-4">
                    <p>Get Started</p>

                <div class="form-group">                     
                    <label for="name">Name</label>
                    <input class = "form-control"  v-model.trim="signupForm.name" type="text" placeholder="Name" id="name" required/>
                </div>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input class = "form-control"  v-model.trim="signupForm.title" type="text" placeholder="Title" id="title" required/>
                 </div>
                <div class="form-group">
                    <label for="email2">Email</label>
                    <input class = "form-control"  v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" required/>
                 </div>

                <div class="form-group">
                    <label for="password2">Password</label>
                    <input class = "form-control"  v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" required/>
                 </div>
                    <button @click="signup" class="btn btn-default">Sign Up</button>

                    <div class="margin-top">
                        <a @click="toggleForm" class="color">Wanna Login?</a>
                    </div>
                </form>

                <!-- Forgot Password -->
                  <form v-if="showForgotPassword" @submit.prevent class="col-lg-4">
                    <div v-if="!passwordResetSuccess">
                        <p>Reset Password</p>
                        <p>An Email Will Be Sent @Registered Email Address.</p>

                     <div class="form-group">
                        <label for="email3">Email</label>
                        <input class = "form-control"  v-model.trim="passwordForm.email" type="text" placeholder="you@email.com" id="email3" />
                    </div>

                        <button @click="resetPassword" class="btn btn-default" >Submit</button>

                        <div class="margin-top">
                            <a @click="togglePasswordReset" class="color">Wanna Login?</a>
                        </div>
                    </div>
                    <div v-else>
                        <p>Kindly check Your Email</p>
                        <button @click="togglePasswordReset" class="btn btn-default" >Wanna Login?</button>
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
                    // this.showLoginForm = false;
                    
                    console.log('hey')
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


	                    fbconfig.usersCollection.doc(user.user.uid).set({
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

.btn-default{
    color: black;
    background-color: #f2f2f2;
    /*border-color: #000000;*/
    /*border: 1px solid black; */
    padding: 0.375rem 0.75rem;
     font-size: 1rem; 
     line-height: 1.5; 
    border-radius: 0.25rem;
}

.btn-default:hover{
    background-color: #cccccc;
}

.margin-top{
    margin-top:10px !important;
}
.color{
    cursor: pointer;
    color: #007bff !important;
}

</style>

