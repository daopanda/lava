<template>

			<div class="lv-settings-content--wrapper">
				<h2 class="lv-settings-content--title">Privacy settings</h2>
				<div class="lv-settings-content-form--wrapper" v-click-outside="onClickOutside" dropalias="offalldrops">
					


						<div :class="[{ 'lv-settings-select--dropdownShow': dropdownShow === 'profile' }, 'lv-settings-content--select-wrap' ]  " @click="selectShow('profile')" >
							<label class="lv-settings-content--label">Who can see my profile</label>
							<div class="lv-settings-content-select" v-if="privacy_profile === 'none'">Nobody</div>
							<div class="lv-settings-content-select" v-if="privacy_profile === 'friends'">Only followers</div>
							<div class="lv-settings-content-select" v-if="privacy_profile === 'all'">Eventyone</div>
							<div class="lv-settings-content-dropdown">
								<div class="lv-settings-content-dropdown-wrap" >
									<div class="lv-settings-content-dropdown-item" @click="setProfile('none')">
										Nobody
									</div>
									<div class="lv-settings-content-dropdown-item"  @click="setProfile('friends')">
										Only followers
									</div>
									<div class="lv-settings-content-dropdown-item"  @click="setProfile('all')">
										Eventyone
									</div>

								</div>
							</div>

						</div>






						<div :class="[{ 'lv-settings-select--dropdownShow': dropdownShow === 'contacts' }, 'lv-settings-content--select-wrap' ]  " @click="selectShow('contacts')" >
							<label class="lv-settings-content--label">Who can see my followers</label>
								<div class="lv-settings-content-select" v-if="privacy_contacts === 'none'">Nobody</div>
							<div class="lv-settings-content-select" v-if="privacy_contacts === 'friends'">Only followers</div>
							<div class="lv-settings-content-select" v-if="privacy_contacts === 'all'">Eventyone</div>
							<div class="lv-settings-content-dropdown">
								<div class="lv-settings-content-dropdown-wrap" >
									<div class="lv-settings-content-dropdown-item" @click="setContacts('none')">
										Nobody
									</div>
									<div class="lv-settings-content-dropdown-item" @click="setContacts('friends')">
										Only followers
									</div>
									<div class="lv-settings-content-dropdown-item" @click="setContacts('all')">
										Eventyone
									</div>

								</div>
							</div>

						</div>



						<div :class="[{ 'lv-settings-select--dropdownShow': dropdownShow === 'messages' }, 'lv-settings-content--select-wrap' ]  " @click="selectShow('messages')" >
							<label class="lv-settings-content--label">Who can write me private messages</label>
								<div class="lv-settings-content-select" v-if="privacy_messages === 'none'">Nobody</div>
							<div class="lv-settings-content-select" v-if="privacy_messages === 'friends'">Only followers</div>
							<div class="lv-settings-content-select" v-if="privacy_messages === 'all'">Eventyone</div>
							<div class="lv-settings-content-dropdown">
								<div class="lv-settings-content-dropdown-wrap" >
									<div class="lv-settings-content-dropdown-item" @click="setMessages('none')">
										Nobody
									</div>
									<div class="lv-settings-content-dropdown-item" @click="setMessages('friends')">
										Only followers
									</div>
									<div class="lv-settings-content-dropdown-item" @click="setMessages('all')">
										Eventyone
									</div>

								</div>
							</div>

						</div>




						<div :class="[{ 'lv-settings-select--dropdownShow': dropdownShow === 'location' }, 'lv-settings-content--select-wrap' ]  " @click="selectShow('location')" >
							<label class="lv-settings-content--label">Who can see my location</label>
								<div class="lv-settings-content-select" v-if="privacy_location === 'none'">Nobody</div>
							<div class="lv-settings-content-select" v-if="privacy_location === 'friends'">Only followers</div>
							<div class="lv-settings-content-select" v-if="privacy_location === 'all'">Eventyone</div>
							<div class="lv-settings-content-dropdown" >
								<div class="lv-settings-content-dropdown-wrap" >
									<div class="lv-settings-content-dropdown-item" @click="setLocation('none')">
										Nobody
									</div>
									<div class="lv-settings-content-dropdown-item" @click="setLocation('friends')">
										Only followers
									</div>
									<div class="lv-settings-content-dropdown-item" @click="setLocation('all')">
										Eventyone
									</div>

								</div>
							</div>

						</div>



						<div :class="[{ 'lv-settings-select--dropdownShow': dropdownShow === 'wall' }, 'lv-settings-content--select-wrap' ]  " @click="selectShow('wall')" >
							<label class="lv-settings-content--label">Who can comment on my wall</label>
								<div class="lv-settings-content-select" v-if="privacy_wall === 'none'">Nobody</div>
							<div class="lv-settings-content-select" v-if="privacy_wall === 'friends'">Only followers</div>
							<div class="lv-settings-content-select" v-if="privacy_wall === 'all'">Eventyone</div>
							<div class="lv-settings-content-dropdown" >
								<div class="lv-settings-content-dropdown-wrap" >
									<div class="lv-settings-content-dropdown-item" @click="setWall('none')">
										Nobody
									</div>
									<div class="lv-settings-content-dropdown-item" @click="setWall('friends')">
										Only followers
									</div>
									<div class="lv-settings-content-dropdown-item" @click="setWall('all')">
										Eventyone
									</div>

								</div>
							</div>

						</div>








						<button :class="[{ 'lv-settings--sendpreload': sendPreloader}, 'lv-settings--button']" @click="sendPrivacy">SAVE</button>




					

				</div>
			</div>
		

</template>


<script >

	

	module.exports = {
		data: function() {
			return {
				privacy_profile: this.$store.state.user.privacy.profile,
				privacy_contacts: this.$store.state.user.privacy.contacts,
				privacy_messages: this.$store.state.user.privacy.messages,
				privacy_location:this.$store.state.user.privacy.location,
				privacy_wall: this.$store.state.user.privacy.wall,
				dropdownShow: false,
				sendPreloader: false
				
			}
		},

		
		methods:{

			onClickOutside: function(e, el){
				 
        		console.log('click heard outside element:', el);
        		console.log('element clicked:', e.target);
       			console.log('event:', e);
				let value = el.getAttribute('dropalias')
				if(value != null){
					this.dropdownShow = false
				}
				console.log(value)
				
				
			},

			selectShow: function(target){
				console.log('SELECTSHOW')
				if(this.dropdownShow === target){
					this.dropdownShow = false
				}else{
					this.dropdownShow = target
				}
				
				
			},
			setProfile: function(value){
				this.privacy_profile = value
				
			
			},			
			setContacts:function(value){
				this.privacy_contacts = value
				
			},
			setMessages:function(value){
				this.privacy_messages = value
				
			},
			setLocation:function(value){
				this.privacy_location = value
				
			},
			setWall:function(value){
				this.privacy_wall = value
				
			},
			sendPrivacy: function(){
				this.sendPreloader = true

				// отправка на сервер
                this.$http.get(this.$apistore.urls.usersetinfo, {params: {
                   	privacy_profile: this.privacy_profile,
                   	privacy_contacts: this.privacy_contacts,
                   	privacy_messages: this.privacy_messages,
                   	privacy_location: this.privacy_location,
                   	privacy_wall: this.privacy_wall
	                }, 
                    headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
		       		// записываем данные в память $store
		       		this.$store.commit({
		  				type: 'updateUserPrivacy',
		  				profile: this.privacy_profile	,
                        contacts: this.privacy_contacts,
                        messages: this.privacy_messages,
                        location: this.privacy_location,
                        wall: this.privacy_wall
					});




		          	// убираем прелоадер
		          	this.sendPreloader = false  			          
			        }, function(error){
	        		// Ошибка от сервера	                


				})
			}
			

		}

	}
</script>