<template>
	<div class="lv-settings-content--wrapper">
		<h2 class="lv-settings-content--title">Notificate me on mail</h2>
		<div class="lv-settings-content-form--wrapper">


			<div class="lv-settings-notice--wrapper">
				<span class="lv-settings-notice--title">General</span>
				<div class="lv-settings-notice--item-wrap">

					<div class="lv-settings-notice--item-title">Request to followers</div>

					<div id="" :class="[{'lv-settings-notice--cheker-off' : !friends }, {'lv-settings-notice--cheker-preload' : friends_preload }, 'lv-settings-notice--checker']" @click="changeFriends">
						<div class="lv-settings-notice--cheker-circle"></div>
					</div>
				</div>

					<div class="lv-settings-notice--item-wrap">
				
					<div class="lv-settings-notice--item-title">Personal messages</div>

					<div :class="[{'lv-settings-notice--cheker-off' : !messages }, {'lv-settings-notice--cheker-preload' : messages_preload }, 'lv-settings-notice--checker']" @click="changeMessages">
						<div class="lv-settings-notice--cheker-circle"></div>
					</div>
				</div>
				
			</div>



			<div class="lv-settings-notice--wrapper">
				<span class="lv-settings-notice--title">Comments</span>
				<div class="lv-settings-notice--item-wrap">

					<div class="lv-settings-notice--item-title">Comments of the photo/video</div>

					<div id="" :class="[{'lv-settings-notice--cheker-off' : !media_email }, {'lv-settings-notice--cheker-preload' : media_preload }, 'lv-settings-notice--checker']" @click="changeMedia">
						<div class="lv-settings-notice--cheker-circle"></div>
					</div>
				</div>

					<div class="lv-settings-notice--item-wrap">
				
					<div class="lv-settings-notice--item-title">Comments of the posts</div>

					<div :class="[{'lv-settings-notice--cheker-off' : !posts_email }, {'lv-settings-notice--cheker-preload' : posts_preload },{'lv-settings-notice--cheker-preload' : posts_preload }, 'lv-settings-notice--checker']" @click="changePosts">
						<div class="lv-settings-notice--cheker-circle"></div>
					</div>
				</div>
				
			</div>


			<div class="lv-settings-notice--wrapper">
				<span class="lv-settings-notice--title">Other</span>
				<div class="lv-settings-notice--item-wrap">

					<div class="lv-settings-notice--item-title">Mention in posts</div>

					<div id="" :class="[{'lv-settings-notice--cheker-off' : !mentions_email }, {'lv-settings-notice--cheker-preload' : mentions_preload },'lv-settings-notice--checker']" @click="changeMentions">
						<div class="lv-settings-notice--cheker-circle"></div>
					</div>
				</div>
				
			</div>


		</div>
	</div>
</template>

<script >
	


	module.exports = {
		
		data: function() {
			return {
				friends: this.$store.state.user.notify.friends.email,
				messages: this.$store.state.user.notify.messages.email,
				media_email: this.$store.state.user.notify.media.email,
				posts_email: this.$store.state.user.notify.posts.email,
				mentions_email: this.$store.state.user.notify.mentions.email,
				friends_preload: false,
				posts_preload: false,
				messages_preload: false,
				media_preload: false,
				posts_preload: false,
				mentions_preload: false
				
			}
		},
		methods:{



			changeFriends: function(){

				// отправка запроса только если прелоадер не включен 
				if(!this.friends_preload){

					// включает прелоадер
					this.friends_preload = true

						
						// отправка запроса на сервер
						var friends_status = this.friends ? 0 : 1
				       this.$http.get(this.$apistore.urls.usersetinfo, {params: {notify_friends_email: friends_status}, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
				       	  this.friends = !this.friends
				          // ответ получен

				          // мутация
				          this.$store.commit({
				          	type: 'changeNotifyFriends',
				          	friends: this.friends
				          })
				          
				         
				          // убираем прелоадер
				          this.friends_preload = false  			          

				        }, function(error){
				        	 // Ошибка от сервера	                


				        })






				}
				
			},
			changeMessages: function(){
					// отправка запроса только если прелоадер не включен 
				if(!this.messages_preload){

					// включает прелоадер
					this.messages_preload = true

						
						// отправка запроса на сервер
						var messages_status = this.messages ? 0 : 1
				       this.$http.get(this.$apistore.urls.usersetinfo, {params: {notify_messages_email: messages_status}, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
				       	  this.messages = !this.messages
				          // ответ получен

				          this.$store.commit({
				          	type: 'changeNotifyMessages',
				          	messages: this.messages
				          })
				          
				          
				    
				          // убираем прелоадер
				          this.messages_preload = false  			          

				        }, function(error){
				        	 // Ошибка от сервера	                


				        })






				}
				
			},
			changeMedia: function(){
				// отправка запроса только если прелоадер не включен 
				if(!this.media_preload){

					// включает прелоадер
					this.media_preload = true

						
						// отправка запроса на сервер
						var media_status = this.media_email ? 0 : 1
				       this.$http.get(this.$apistore.urls.usersetinfo, {params: {notify_media_email: media_status}, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
				       	  this.media_email = !this.media_email
				          // ответ получен

				            this.$store.commit({
				          	type: 'changeNotifyMedia',
				          	media: this.media_email
				          })
				          
				    
				          // убираем прелоадер
				          this.media_preload = false  			          

				        }, function(error){
				        	 // Ошибка от сервера	                


				        })






				}
				
			},
			changePosts: function(){
				// отправка запроса только если прелоадер не включен 
				if(!this.posts_preload){

					// включает прелоадер
					this.posts_preload = true

						
						// отправка запроса на сервер
						var posts_status = this.posts_email ? 0 : 1
				       this.$http.get(this.$apistore.urls.usersetinfo, {params: {notify_posts_email: posts_status}, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
				       	  this.posts_email = !this.posts_email
				          // ответ получен

				             this.$store.commit({
				          	type: 'changeNotifyPosts',
				          	posts: this.posts_email
				          })
				          
				         
				    
				          // убираем прелоадер
				          this.posts_preload = false  			          

				        }, function(error){
				        	 // Ошибка от сервера	                


				        })






				}
				
				
			},
			changeMentions: function(){
				// отправка запроса только если прелоадер не включен 
				if(!this.mentions_preload){

					// включает прелоадер
					this.mentions_preload = true

						
						// отправка запроса на сервер
						var mentions_status = this.mentions_email ? 0 : 1
				       this.$http.get(this.$apistore.urls.usersetinfo, {params: {notify_mentions_email: mentions_status}, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
				       	  this.mentions_email = !this.mentions_email
				          // ответ получен

				           this.$store.commit({
				          	type: 'changeNotifyMentions',
				          	mentions: this.mentions_email
				          })
				          
				          
				    
				          // убираем прелоадер

				          this.mentions_preload = false  			          

				        }, function(error){
				        	 // Ошибка от сервера	                


				        })






				}
				
				
			}

		}

	}
</script>