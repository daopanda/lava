<template>
<div>



	<div class="lv-popup--kill" v-show="uploadPopup" @click.self="closePopup" >
		<div class="lv-popup-body">
			<div class="lv-popup-head">
				<span class="lv-popup--title">Profile photo</span>
				<span class="lv-popup--close" @click="closePopup"></span>
			</div>

				   <div class="lv-photocrop--wrap">
				   <vue-croppie 
            		ref=croppieRef
    				:enableOrientation="true"
    				:mouseWheelZoom="false" 
    				:enableResize="false" 
    				:showZoomer="true"
    				:boundary="init_boundary"
    				:viewport="init_view">
        			</vue-croppie>
        			</div>

        			
        		<div class="lv-popup--buttons-wrapper">
        		<div  class="lv-popup-button--textclose" @click="closePopup">cancel</div>
        		<div @click="uploadPhoto" class="lv-popup-button--upload">UPLOAD</div>
        		</div>
     			

			

		</div>
	
	</div>




	<preloader v-if="loader"></preloader>

<div class="lv-wrapper" v-if="!loader">
	<div  :class="[{ 'slidetoleft': sliderFlagLeft}, { 'slidetoright': sliderFlagRight}, 'lv-wrapper--settings' ] ">
		<div class="lv-settings--leftcolumn ">

	
	<div class="lv-settings--menu">

			


			<div class="lv-settings-nav--block">



			<div class="lv-settings--photo">
					 <div :class="setAvatarClass($store.state.user.image_w320)" :style="setAvatarPhoto" @click="toProfile">

							
								
								{{ setAvatarSymbols($store.state.user.first_name,$store.state.user.last_name) }}

							
						</div> 
				<div class="lv-settings-changephoto-button icn-camera-pink" >
				Change profile photo
				<input type="file" name="myfile" class="lv-settings--upload" @change="processFile($event)" accept="image/jpeg,image/png"/>
				</div>

			</div>
				<span class="lv-settings-nav--title" v-localize="{i: 'settings.navtitle'}">Settings</span>


				<div class="lv-setting-nav--links">			
					<router-link to="/settings"  class="lv-settings-nav--link icn-settings-line " @click.native="slider" >General settings</router-link>
					<router-link to="/settings/privacy"  class="lv-settings-nav--link icn-settings-lock-line" @click.native="slider" >Privacy</router-link>
					<router-link to="/settings/notification"  class="lv-settings-nav--link icn-settings-bell-line" @click.native="slider"  >Notification</router-link>
					<router-link to="/settings/blacklist"  class="lv-settings-nav--link icn-settings-blacklist-line" @click.native="slider" >Blacklist</router-link>
					<router-link to="/settings/password"  class="lv-settings-nav--link icn-settings-repassword" @click.native="slider" >Password</router-link>
				
				</div>

				<div class="lv-settings-logout-wrap">
					<div class="lv-settings-nav--link--logout icn-logout" @click="logOut" v-localize="{i: 'settings.logout'}">Log out</div>

					<div class="lv-settings--langselect-wrapper">

					
					<div class="lv-lang-button--current" v-localize="{i: 'lang.reduction'}">eng</div>
					<div class="lv-lang-dropup">
						<div class="lv-lang-dropup--items">
							<div  class="lv-lang-select-item" @click="changeLang('en-US')">eng</div>
							<div  class="lv-lang-select-item" @click="changeLang('ru-RU')">рус</div>
						</div>
					</div>
					</div> 

				</div>

			</div> <!-- nav block -->
			


		</div>	<!-- lv menu -->


		</div><!-- left column-->
		<div class="lv-settings--rightcolumn ">
			<span @click="sliderback" class="lv-settings-backtomenu"> settings</span>
			<router-view></router-view>
		</div>
		
	</div><!-- lv wrapper settings-->
</div> <!-- lv wrapper-->
</div>
</template>

<script >
	module.exports = {
		data: function() {
			return {
				sliderFlagLeft: false,
				sliderFlagRight: false,
				uploadPopup: false,
				loader: true,
				cropped:'',
				init_view: { width:200, height: 200, type: 'circle'},
				init_boundary: { width:260, height: 260 },
				photoprofile_url: this.$store.state.user.image_w320
			}
		},
		computed:{
			setAvatarPhoto: function(){
				return this.setAvatarStyle(this.$store.state.user.image_w320)
			}
	

		},
		methods: {
			changeLang(lang){
				this.$locale({l: lang});
				this.$cookie.set('lava-lang', lang, 1);

				


				  this.$http.get(this.$apistore.urls.usersetinfo, {params: {
                        	language: lang.substring(0,2),
                        	

                        }, 
                        headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
				       		

				       		this.$store.commit({
		  					type: 'updateLanguage',
		  					language: lang.substring(0,2)
							});
				          	// убираем прелоадер
				         		          

				        }, function(error){
				        	 // Ошибка от сервера	                


				        })
				

			},


			toProfile: function(){
				this.$router.push('/')
			},
			logOut: function(){
			

				this.$http.get(this.$apistore.urls.userlogout,{headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {
					
						this.$apistore.token = false;
						this.$cookie.delete('lava-token');
						// RESET USERATA
						this.$store.commit('ResetUserData');

						this.$router.replace('/singin');

					})

			},
			// Инициализация Croppie взависимости от ширины родителя
			inizializeCroppie: function(){
				let width;
				let height;

				width = document.body.clientWidth;
				height = document.body.clientHeight;

				if(document.body.clientWidth <= 320){


				}





				

			},
			KeyPress: function(e){
				 var key = e.keyCode || e.which;
				 
				 if(key == 27){
				 	this.closePopup()
				 }
			},
			closePopup: function(){
				this.uploadPopup = false;
				window.removeEventListener('keypress', this.KeyPress);
			},
			processFile: function(event){

				var reader = new window.FileReader() // if window is not used it says File READER is not defined
                reader.onload = (event) => {
                  // dispatch fileAttached to state UI postEditor with event.target.result as read dataURL
                  let imageDataURL = event.target.result

                  this.uploadPopup = true
                   window.addEventListener('keypress', this.KeyPress);
                  this.$refs.croppieRef.bind({
                		url: imageDataURL
           			 })
                 // or previewFile
                }
                reader.readAsDataURL(event.target.files[0]);
			},
			
			uploadPhoto: function(){
				let options = {
                format: 'jpeg', 
                circle: false,
                type: 'blob',
                size: {
                	width: 500, 
                	height: 500
                	}
           		 }
            	this.$refs.croppieRef.result(options, (output) => {
                this.cropped = output;

						var formData = new FormData();
						formData.append('image', this.cropped);
						
						console.log(this.cropped)

						
                    	// отправка на сервер
                        this.$http.post(this.$apistore.urls.uploadImage, formData,{headers: {'X-Auth-Token': this.$apistore.token, 'Content-Type' : 'application/x-www-form-urlencoded','Content-Type': 'image/jpeg'}}, {emulateJSON: true}).then( function(response)  {			

                        	this.$store.commit({
		  					type: 'updateUserPhoto',
		  					image: response.data.result.image_w320
							});



    
				       		console.log(response.data.result.image_w320)
				       		this.closePopup()      

				        }, function(error){
				        	 // Ошибка от сервера	                
				        	 console.log(error)

				        })


            	})




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

			
			
			setAvatarSymbols: function(name,last_name){
				return name.slice(0, 1) + last_name.slice(0, 1)
			},


			slider: function(){				
				this.sliderFlagRight = false				
				this.sliderFlagLeft = !this.sliderFlagLeft

				},
			sliderback: function(){
				this.sliderFlagLeft = !this.sliderFlagLeft
				this.sliderFlagRight = !this.sliderFlagRight
				},


			getUserInfo: function(){
				// если данные есть				
				if(this.$store.state.user.id != false){
					// убираем прелоадер
					this.loader = false  
					console.log('NO REQUEST')

				}else{ // если данных нет

					

		       		// Запрос к серверу
				    // Прелоадер показан по умолчанию
				    console.log('BEFORE REQUEST')
				    this.$http.get(this.$apistore.urls.userobject,{headers: {'X-Auth-Token': this.$apistore.token}}).then((res) =>   {
				          //Записываем полученные данные  хранилище
				          console.log('AFTER REQUEST');


								if(res.data.message === 'need_login'){
									console.log('NEED_LOGIN')
									 this.$router.replace('/singin');
								}else{
									this.$store.commit({
		  					type: 'initUser',
		  					userdata: res.data.result
						});
				           console.log('AFTER COMMIT');
				        // убираем прелоадер
				        this.loader = false; 
								}


				         

				          

				        }, function(error){

		                  // обработка ошибок
 		                  console.log(error);

				        })


















				    }
		    	}

		},
		created: function(){

			this.getUserInfo();
			//this.inizializeCroppie()
		}

		

	}
</script>