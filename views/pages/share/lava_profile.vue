<template>


			<div class="lv-userinfo">
				
				<div class="lv-userinfo--bg">

					<div class="lv-userinfo--head">
						<div  :class="setAvatarClass(getPhoto)" :style="setAvatarStyle(getPhoto)" @click="goProfile">			
								{{ setAvatarSymbols() }}						
						</div>








						<div  class="lv-userinfo--balance" v-if="!$store.state.guest">p</div>
						<router-link to="/settings" class="lv-userinfo--settings" v-if="!$store.state.guest">s
						</router-link>



						<div v-if="$store.state.guest"  class="lv-profile-button-message">
					
						</div>

						<div v-if="$store.state.guest" class="lv-profile-button-follows-wrap">
						<div v-if="$store.state.guest.following_by_me != 1" class="lv-profile-button-follow"  @click="followUser()">Follow</div>


						<div v-if="$store.state.guest.following_by_me != 0 " class="lv-profile-button-following" @click="unfollowUser()">Following</div>	
						</div>		




						
					</div>

					<span class="lv-userinfo--name" >{{ getFirstName }}</span>
					<span class="lv-userinfo--lastname" >{{ getLastName }}</span>

												
						<div class="lv-userinfo--stats">
							<span class="lv-userinfo--online">ONLINE</span>
							<span class="lv-userinfo--old">{{ getOld }}</span>
							
						</div>

					

					<div class="lv-userinfo--status" >


						<div class="lv-userinfo-biotext" v-html="getBio" v-if="!isuser">
						
					</div>


					<div class="lv-userinfo-status-wrap" v-if="isuser">
					<div class="lv-userinfo-biotext" v-html="getBio">
						
					</div>


						
					<div class="lv-userinfo-bio-button" @click="editBio">
							<div class="lv-userinfo-button-img"></div>
							<div class="lv-userinfo-button-text"> Change status</div>
					</div>

					</div>

					</div>

					<div class="lv-userinfo--social">

						<div class="lv-userinfo--social--item">
							<div class="lv-userinfo--social--count">0</div>
							<div class="lv-userinfo--social--title">POSTS</div>
						</div>

						<div class="lv-userinfo--social--item">
							<div class="lv-userinfo--social--count" @click="getFollowsSearch" forsearch="follows">{{ getFollowCount }}</div>
							<div class="lv-userinfo--social--title" forsearch="follows"  style="cursor:pointer;" @click="getFollowsSearch">FOLLOWERS</div>
						</div>

						<div class="lv-userinfo--social--item">
							<div class="lv-userinfo--social--count" @click="getFollowingsSearch" forsearch="followings">{{ getFollowingCount }}</div>
							<div class="lv-userinfo--social--title" forsearch="followings"   style="cursor:pointer;" @click="getFollowingsSearch">FOLLOWING</div>
						</div>
							
					</div>

				</div>





				<!-- POPUP STATUS -->


				<div class="lv-profile-status-popup-kill" v-if="biopopup" @click.self="closeBio">
					<div class="lv-content-wrapper" @click.self="closeBio()">
						<div class="lv-content-leftcolumn" @click.self="closeBio">

							<div class="lv-profile-status-popup-body">
							<div class="lv-profile-status-popup-title-wrap">
								<div class="lv-profile-status-popup-title">Change status</div>
								<div class="lv-profile-status-popup-close" @click.self="biopopup = false"></div>
							</div>
							<div class="lv-profile-popup-textarea-wrapper">

							 <textarea  maxlength="255" v-model="biography" style="min-height: 5em;" class="lv-profile-status-popup-textarea" ></textarea>  
							 </div>
								

							 <div class="lv-profile-popup-button" @click="saveStatus">SAVE</div>


							</div><!--lv-profile-status-popup-body -->


						</div><!--lv-profile-status-popup-columnleft -->

						
					</div><!--lv-profile-status-popup-wrapper  -->


				</div><!-- v-profile-status-popup-kill  -->



				<lava-media-menu></lava-media-menu>

			</div>

	





</template>

<script >
	module.exports = {
		data: function() {
			return {

				biopopup:false,
				status: '',
				biography: this.$store.state.guest.biography,
				
				
				
				
				
			}
		},
		computed:{

			isuser: function(){

				if(this.$store.state.guest != false){
					return false
					
				}else{
					return true
					
				}

			},			
			getBio: function(){
				if(this.$store.state.guest != false){
					return this.BioToBr(this.$store.state.guest.biography)
					
				}else{
					return this.BioToBr(this.$store.state.user.biography)
					
				}

			},

			getFirstName: function(){
				if(this.$store.state.guest != false){
					
					return this.$store.state.guest.first_name;
				}else{
					return this.$store.state.user.first_name;
				}
				

			},
			
			getLastName: function(){
				if(this.$store.state.guest != false){
					
					return this.$store.state.guest.last_name;
				}else{
					return this.$store.state.user.last_name;
				}
				

			},
			getFollowingCount: function(){
				if(this.$store.state.guest != false){
					
					return this.$store.state.guest.following_count;
				}else{
					return this.$store.state.user.following_count;
				}
				

				

			},
			getFollowCount: function(){
				if(this.$store.state.guest != false){
					
					return this.$store.state.guest.followers_count;
				}else{
					return this.$store.state.user.followers_count;
				}
				

			},
			getPhoto: function(){
				if(this.$store.state.guest != false){
					
					return this.$store.state.guest.image_w320;
				}else{
					return this.$store.state.user.image_w320;
				}

			},
			getOld: function(){


				if(this.$store.state.guest != false){
					
					

					if(this.$store.state.user.birthdate){
		          	// добавить поддержку локализации
		         	return this.getAge(this.$store.state.guest.birthdate.split('-').reverse().join('.')) + ' YEARS OLD'

		          	
		       			 }
				}else{
					if(this.$store.state.user.birthdate){
		          	// добавить поддержку локализации
		         	return this.getAge(this.$store.state.user.birthdate.split('-').reverse().join('.')) + ' YEARS OLD'

		          	
		       		}// добавить оработку отсутстия или скрытия даты.
				}
				

				

			}



		},	
		
	  	methods: {

	  		KeyPress: function(e){
				 var key = e.keyCode || e.which;
				 
				 if(key == 27){
				 	this.closeBio()
				 }
			},
			closeBio: function(){
				window.removeEventListener('keypress', this.KeyPress);
				this.biopopup = false;
			},
	  		
			unfollowUser: function(){
				let user_id = this.$store.state.guest.id;
					this.$http.get(this.$apistore.urls.followersdelete, {params: {
				       	user_id: user_id
				       }, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {	



				       	// добаить follower count
				       	// Изменяем количество подписчиков
				       	if(response.data.message != 'invalid_request'){
				       		this.$store.commit('decreseUserFollowingCount');
				       		this.$store.state.guest.followers_count -=1;
				       		this.$store.state.guest.following_by_me = 0;

				       	}
						
				       	


				        }, function(error){
				        	console.log(error)

				        })


			},
			followUser: function(){
				let user_id = this.$store.state.guest.id;
					this.$http.get(this.$apistore.urls.followersadd, {params: {
				       	user_id: user_id
				       }, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {	



				       	// добаить follower count
				       	// Изменяем количество подписчиков
				       	if(response.data.message != 'invalid_request'){
				       		this.$store.commit('increseUserFollowingCount');
				       		this.$store.state.guest.followers_count +=1;
				       		this.$store.state.guest.following_by_me = 1;

				       	}
						
				       	


				        }, function(error){
				        	console.log(error)

				        })


			},
	  		goProfile: function(){

	  			let url
				if(this.$store.state.guest === false){
					url = "/id" + this.$store.state.user.id
				}else{
					url = "/id" + this.$store.state.guest.id
				}
				
				this.$router.push(url)

	  		},
	  		saveStatus: function(){

	  			


	  			this.$http.get(this.$apistore.urls.usersetinfo, {params: {
                        	biography: this.biography
                        	

                        }, 
                        headers: {'X-Auth-Token': this.$apistore.token}}).then( function(res)  {	

						// обработать ошибки

						if(res.data.message === 'need_login'){
									
									 //this.$router.replace('/singin');

								}else{

									this.$store.commit({
		  							type: 'changeStatus',
		  							biography: this.biography
									});
						
									this.biopopup = false;

								}

						
						


				        
					}, function(error){

				        	console.log(error)

					});   				



	  		},
	  		
	  		editBio: function(){
	  			console.log('BIO EDIT')
	  			this.biopopup = true;
	  			 window.addEventListener('keypress', this.KeyPress);
	  			this.biography = this.$store.state.user.biography
	  		},
	  		getFollowingsSearch: function(){
	  			this.$store.commit({
	  				type: 'searchtype',
	  				searchfor: 'followings'

	  			});
	  			


	  		},
	  		BioToBr: function(str){
				if(str != undefined){
				console.log(str)
				let string = str.replace(/\r\n|\r|\n/g,"<br>");
				return string
				}
				this.setisuser()

				
			},
	  		getFollowsSearch: function(){
	  			this.$store.commit({
	  				type: 'searchtype',
	  				searchfor: 'follows'

	  			});
	  		},

	  		setAvatarClass: function(image_url){
				let base_class = 'lv-avatar-medium'
				let random = Math.round(Math.random() * (10 - 1)) + 1;
				
				if(image_url === null){

					return base_class + ' ' + 'lv-avatar-random-bg--' + random 

				}else{
					// временно устаналивает урл для изображения

					return base_class
				}
				
			},
			setAvatarStyle: function(image_url){
				let url = '//lava.top/' + image_url

				if(image_url === null){

					return ''

				}else{
				// временно устаналивает урл для изображения
					  
					return 'background-image: url("'+ url + '");'
				}
				
			},

			setAvatarSymbols: function(){

				if(this.$store.state.guest != false){
					return this.$store.state.guest.first_name.slice(0, 1) + this.$store.state.guest.last_name.slice(0, 1)
				}else{
					return this.$store.state.user.first_name.slice(0, 1) + this.$store.state.user.last_name.slice(0, 1)
				}

				
			},
	  		getAge: function(dateString) {
			      let day = parseInt(dateString.substring(0,2));
			      let month = parseInt(dateString.substring(3,5));
			      let year = parseInt(dateString.substring(6,10));

			      let today = new Date();
			      let birthDate = new Date(year, month - 1, day); // 'month - 1' т.к. нумерация месяцев начинается с 0 
			      let age = today.getFullYear() - birthDate.getFullYear();
			      let m = today.getMonth() - birthDate.getMonth();
			      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { 
			          age--;
			      }
			      return age;
    		},
    		

		},
			
		created: function(){
		
			
			 console.log('CREATED PROFILE')
			}
			
		

		}
</script>