<template>
    <nav class="navbar navbar-expand-lg navbar-light">

  <router-link to="dashboard" class="navbar-brand"> HN </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
       <router-link to="dashboard" class="nav-link"  >Dashboard <span class="sr-only">(current)</span></router-link>
      </li>
      <li class="nav-item">
        
      </li>
    </ul>

    <ul class="navbar-nav">

      <li class="nav-item active">
         <a class="nav-link" >{{ userProfile.name }}</a>
      </li>

      <li class="nav-item">
         <router-link to="settings" class="nav-link" >Settings</router-link>
      </li>
      <li class="nav-item">
        <a @click="logout" style = "cursor: pointer" class="nav-link">logout</a>
      </li>

    </ul>
  
  </div>
</nav>
</template>

     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
     <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>

<script>


    import {fbconfig} from '../firebaseConfig';
    import { mapState } from 'vuex'
    export default {
        methods: {
            logout() {
                fbconfig.auth.signOut().then(() => {
                    this.$store.dispatch('clearData')
                    this.$router.push('/login')
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        computed:{
            ...mapState(['userProfile'])
        }
    }
</script>


<style>

.navbar{
    background-color:black !important;
}
.navbar-light .navbar-nav .active > .nav-link{
    color: #ffffff !important;
    font-weight: bold !important;
     cursor: pointer;
}
.navbar-light .navbar-nav .nav-link {
    color: #b2b2b2 !important;
    font-weight: bold !important;
     cursor: pointer;
}
.navbar-light .navbar-brand {
    color: #ffffff !important;
}

</style>