<template>
   <div id="dashboard">
      <div class="margin">
         <div class="margin-top">
            <h3>Create Post </h3>
            <form @submit.prevent>
               <div class="form-group col-lg-4" >
                  <label for="comment">Title:</label>
                  <input v-model:trim = "post.title" class="form-control"></input>
               </div>
               <div class="form-group col-lg-4" >
                  <label for="comment">Content:</label>
                  <textarea v-model:trim = "post.content" class="form-control" rows="2" id="comment"></textarea>
                  <button @click = "createPost" :disabled = "post.content == ''" class="btn btn-default">POST</button>
               </div>
            </form>
         </div>
         <div class="col-lg-12 margin-top">
            <h3> Content Posted By Users </h3>

            <div v-if="posts.length">
               <div class="row">
                  <div class="card margin-top col-4" v-for="post in posts">
                     <div class="card-body">
                        <h4 class="card-text">{{ post.title}}</h4>
                        <p class="card-text">{{ post.content | trimLength }}</p>
                        <p class="card-text-username">By: {{ post.userName}},
                         <span>{{ post.createdOn | formatDate }}</span>,
                         <span >Comments: {{ post.comments }}</span>,
                         <span >Likes: {{ post.likes }}</span>
                       </p>

                        <b-btn v-b-modal.modal1 @click = "openCommentModal(post)" >Add Comment</b-btn>

                        <div><b-btn v-b-modal.modal2 @click="viewPost(post)" style = "margin-top:5px;">Show Full Post</b-btn></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div v-if = "posts.length == 0">
            <p class="no-results">There are currently no posts</p>
         </div>
      </div>

<!-- Comment modal -->
    <!--   	   <transition name="fade">
            <div v-if="showCommentModal" class="c-modal">
                <div class="c-container">
                    <a @click="closeCommentModal">X</a>
                    <p>add a comment</p>
                    <form @submit.prevent>
                        <textarea v-model.trim="comment.content"></textarea>
                        <button @click="addComment" :disabled="comment.content == ''" class="button">add comment</button>
                    </form>
                </div>
            </div>
        </transition> -->

<!-- Comment Modal Component -->
			<div>
			  <b-modal id="modal1" title="Add Comments"  class="c-modal">

			     <div class="">
                    <form @submit.prevent>
                        <textarea v-model.trim="comment.content" class="form-control" rows="2" id="comment"></textarea>
                  		<button @click="addComment" :disabled="comment.content == ''" class="btn btn-default">POST</button>
                    </form>
                </div>

			  </b-modal>
			</div>


<!-- Post modal -->

			<div >
			  <b-modal id="modal2" title="Hacker/News"  class="c-modal">
			     <div class="" >

	             	<div class="">

	                         <div class="card">
			                     <div class="card-body">
			                        <h4 class="card-text">{{ fullPost.title}}</h4>
			                        <p class="card-text">{{ fullPost.content}}</p>
			                        <p class="card-text-username">By: {{ fullPost.userName}},
			                         <span>{{ fullPost.createdOn | formatDate }}</span>,
			                         <span >Comments: {{ fullPost.comments }}</span>,
			                         <span >Likes: {{ fullPost.likes }}</span>
			                       </p>

                     			</div>
                     		</div>

	                    <div v-show="postComments.length" >
	                        <div v-for="comment in postComments" class="cmnt-list">        
			                     <div class="comments-list">
				                       <div class="">
			                           <p class="float-right"><small>{{ comment.createdOn | formatDate }}</small></p>
			                            <div class="media-body">
			                                
			                              <h4 class="media-heading user_name">{{ comment.userName }} </h4>
			                              {{ comment.content }}
			                            </div>
			                        </div>
		                         </div>
	                        </div>
	                    </div>

	                </div>

                </div>
			  </b-modal>
			</div>
	
   </div>
   </div>
</template>


<script>
    import { fbconfig } from '../firebaseConfig';
    import { mapState } from 'vuex'
    import moment from 'moment'
    
    export default {
     data(){

    	return{
    		post : {
    			content: ''
    		},

    		comment:{
    			postId: '',
    			userId: '',
    			content: '',
    			postComments : 0
    		},

    		showCommentModal: false,

    		 fullPost: {},
             postComments: []
    	}

      },

      computed:{
      		...mapState(['userProfile','currentUser','posts'])
      },
      methods:{
      	createPost(){

      		fbconfig.postsCollection.add({

      			createdOn: new Date(),
      			content  : this.post.content,
      			userId   : this.currentUser.uid,
      			userName : this.userProfile.name,
      			comments : 0,
      			likes    : 0,
      			title    : this.post.title

      		}).then( () =>{
      			this.post.content = ''
      		}).catch( err => {
      			console.log(err);
      		})
      	},
      	openCommentModal(post) {
		    this.comment.postId = post.id
		    this.comment.userId = post.userId
		    this.comment.postComments = post.comments
		    this.showCommentModal = true
		    console.log('I am in!')
		},
	     addComment() {
            let postId = this.comment.postId
            let postComments = this.comment.postComments

            fbconfig.commentsCollection.add({
                createdOn: new Date(),
                content: this.comment.content,
                postId: postId,
                userId: this.currentUser.uid,
                userName: this.userProfile.name
            }).then(doc => {
                fbconfig.postsCollection.doc(postId).update({
                    comments: postComments + 1
                }).then(() => {

                    this.comment.postId = ''
				    this.comment.userId = ''
				    this.comment.content = ''

                })
            }).catch(err => {
                console.log(err)
            })
        },

        viewPost(post){
        	 fbconfig.commentsCollection.where('postId', '==', post.id).get().then(docs => {
                    let commentsArray = []
                    docs.forEach(doc => {
                        let comment = doc.data()
                        comment.id = doc.id
                        commentsArray.push(comment)
                    })

                    this.postComments = commentsArray
                    this.fullPost = post
                }).catch(err => {
                    console.log(err)
            })
        }
      }, 

         filters: {
		    formatDate(val) {
		        if (!val) { return '-' }
		        let date = val.toDate()
		        return moment(date).fromNow()
		    },
		    trimLength(val) {
		        if (val.length < 200) {
		            return val
		        }

		        console.log('Postsfilter',this.posts);
		        return `${val.substring(0, 200)}...`
		    }
		},

      // data(){
      // 	return{
      // 		userProfile: this.$store.state.userProfile
      // 	}
      // },

      // methods:{
      // 	set(){
      // 		console.log('called');
      // 		this.userProfile = this.$store.state.userProfile
      // 	}
      // },
      
       updated(){
	        console.log('Posts',this.$store.state.posts);
	        console.log('Posts',this.posts);
	    	// this.set()
	   } 
    }
</script>


<style type="text/css">
	
.btn-default{
	color: white;
	background-color:#6c757d;
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
    margin:10px !important;

}
.margin{
	margin: 5px;
}
.card-text-username{
	font-size: .8rem;
}
.baby{
	border: 1px solid black;
}

.user_name{
    font-size:14px;
    font-weight: bold;
}
.comments-list{
    border-bottom: 1px solid #0e0e0e;
    /*border-bottom-style: dashed;*/

}

.cmnt-list{
	margin-top: 5% !important;
}
</style>

