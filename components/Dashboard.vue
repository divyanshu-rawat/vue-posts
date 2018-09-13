
<template>
    <div id="dashboard">
            <div class="margin">
                <div class="margin-top">
                  <h4>Create Post </h4>

                  <form @submit.prevent>
                    <div class="form-group col-lg-4" >
					  <label for="comment">Comment:</label>
					  
					  <textarea v-model:trim = "post.content" class="form-control" rows="1" id="comment"></textarea>
					  <button @click = "createPost" :disabled = "post.content == ''" class="btn btn-default">POST</button>

					</div>
				   </form>
                </div>

        <!--         <div class="col2">
	                <transition name="fade">
	                    <div v-if="hiddenPosts.length" @click="showNewPosts" class="hidden-posts">
	                        <p>
	                            Click to show <span class="new-posts">{{ hiddenPosts.length }}</span>
	                            new <span v-if="hiddenPosts.length > 1">posts</span><span v-else>post</span>
	                        </p>
	                    </div>
	                </transition>
	                <div v-if="posts.length">
	                    <div v-for="post in posts" class="post">
	                        <h5>{{ post.userName }}</h5>
	                        <span>{{ post.createdOn | formatDate }}</span>
	                        <p>{{ post.content | trimLength }}</p>
	                        <ul>
	                            <li><a @click="openCommentModal(post)">comments {{ post.comments }}</a></li>
	                            <li><a @click="likePost(post.id, post.likes)">likes {{ post.likes }}</a></li>
	                            <li><a @click="viewPost(post)">view full post</a></li>
	                        </ul>
	                    </div>
	                </div>
	                <div v-else>
	                    <p class="no-results">There are currently no posts</p>
	                </div>
            </div> -->

            </div>
            <div class="margin">
                <div>
                    <p class="no-results">There are currently no posts</p>
                </div>
            </div>
    </div>
</template>


<script>
    import { fbconfig } from '../firebaseConfig';
    import { mapState } from 'vuex'
    
    export default {
     data(){

    	return{
    		post : {
    			content: ''
    		}
    	}

      },

      computed:{
      		...mapState(['userProfile','currentUser'])
      },
      methods:{
      	createPost(){

      		fbconfig.postsCollection.add({

      			createdOn: new Date(),
      			content  : this.post.content,
      			userId   : this.currentUser.uid,
      			userName : this.userProfile.name,
      			comments : 0,
      			likes    : 0

      		}).then( () =>{
      			this.post.content = ''
      		}).catch( err => {
      			console.log(err);
      		})
      	}
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

