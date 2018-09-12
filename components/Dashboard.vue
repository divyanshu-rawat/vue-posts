
<template>
    <div id="dashboard">
            <div class="margin">
                    <div class="margin-top">
                        <h4>Create Post </h4>

                        <div class="form-group col-lg-4" >
						  <label for="comment">Comment:</label>
						  <textarea class="form-control" rows="1" id="comment"></textarea>
						  <button class="btn btn-default">POST</button>
						</div>
						

                </div>
            </div>
            <div class="margin">
                <div>
                    <p class="no-results">There are currently no posts</p>
                </div>
            </div>
    </div>
</template>


<script>
    import {fbconfig} from '../firebaseConfig';
    import { mapState } from 'vuex'
    
    export default {

     computed:{
      		...mapState(['userProfile'])
      }

  /*    data(){
      	return{
      		userProfile: this.$store.state.userProfile
      	}
      },

      methods:{
      	set(){
      		console.log('called');
      		this.userProfile = this.$store.state.userProfile
      	}
      },
      
       updated(){
	        console.log('userProfile',this.$store.state.userProfile);
	    	this.set()
	   } */
    }
</script>


<style type="text/css">
	
.btn-default{
	color: black;
	background-color: #f2f2f2;
	/*border-color: #000000;*/
	/*border: 1px solid black; */
	/*padding: 0.375rem 0.75rem !important;*/
	margin-top: 5px;
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
.margin{
	margin: 5px;
}

</style>

