<template>
	<div class="lv-wrapper">

	
	<preloader v-if="loader"></preloader>

	<div class="lv-content-wrapper" v-if="!loader">

		<div class="lv-content-leftcolumn"> 
		<lava-profile></lava-profile>
	
		</div>



		<div class="lv-content-rightcolumn">
			<lava-album embed="false"></lava-album>
			


		</div>



	</div>

	</div>
</template>

<script >
	module.exports = {
		data: function() {
			return {
				loader: true,
				album_id: '',
				user_id:'',
				user: ''
			}
		},
		methods:{

			initProfile: function(userdata){
    			
    			let guest_id = this.user_id

    			//ecли id нет
    			if(this.user_id === false){


    				this.$store.commit('guestReset');
    				
    				



    				this.$store.commit({
		  			type: 'initUser',
		  			userdata: userdata
					});

    				let url = '/id' + this.$store.state.user.id;
    				this.$router.replace(url)

					this.loader = false; 



    			}else{ // id указан



    			if(userdata.id != this.user_id){
    				console.log('НЕ РАВНЫ ID')

    				// загрузить данные пользователя чей id в ссылке
    				// инициализировать профиль под пользователя чей id
    				
    				 // Запрос к серверу                
					this.$http.get(this.$apistore.urls.usersget,{params:{
						user_ids: guest_id
					}},{headers: {'X-Auth-Token': this.$apistore.token}}).then((new_res) => {
						
						    

						// обработать ошибки

						this.$store.commit({
		  				type: 'initGuest',
		  				guestdata: new_res.data.result[0]
						});
						


						this.$store.commit({
		  				type: 'initUser',
		  				userdata: userdata
						});

						this.loader = false; 

				        
					}, function(error){

				        	console.log(error)

					});   				


    			}else{ // id равен текущему пользователю
    				

    				this.$store.commit('guestReset');

    				this.$store.commit({
		  			type: 'initUser',
		  			userdata: userdata
					});

					// убираем прелоадер
					this.loader = false; 

    			}
    		} // конец проверки наличия id
    		
				

				
    		},

    		initGuest: function(){
    			console.log('INIT GUEST')
    			// Запрос к серверу                
					this.$http.get(this.$apistore.urls.usersget,{params: {
						user_ids: this.user_id
					}},{headers: {'X-Auth-Token': this.$apistore.token}}).then((res) => {
									console.log('GUEST RESPONSE')
									console.log(res.data.result[0])


									if(res.data.message === 'need_login'){
										console.log('NEED_LOGIN')
										 this.$router.replace('/singin');

									}else{

											this.$store.commit({
		  									type: 'initUser',
		  									userdata: this.user
											});

											this.$store.commit({
		  									type: 'initGuest',
		  									userdata: res.data.result[0]
											});


									this.loader = false
									}	

					        
					}, function(error){

					        	console.log(error)

					});


    		},
    		getParentId: function(){


    			this.album_id = this.$route.params.id




		   	// get requst t oserver with album id an back user id 


		   	this.$http.get(this.$apistore.urls.getalbums,{params:{
		   		album_id: this.album_id

		   	}},{headers: {'X-Auth-Token': this.$apistore.token}}).then((res) => {
							
									
									if(res.data.message === 'need_login'){
										console.log('NEED_LOGIN')
										 this.$router.replace('/singin');

									}else{

										this.$store.commit({
		  									type: 'initAlbumView',
		  									albumdata: res.data.result.items[0]
											});

										this.user_id = res.data.result.items[0].user_id

										this.getUserInfo()
									}	

					        
					}, function(error){

					        	console.log(error)

					});

    		},


			getUserInfo: function(){
		    
		   	// если в хранилище есть user data
		    if(this.$store.state.user.id != false){
				// убираем прелоадер	

				

				this.initProfile(this.$store.state.user)

				console.log(this.$route.params.id )

				this.loader = false  


			}else{ 

				// прелоадер работает по умолчанию

		        // Запрос к серверу                
				this.$http.get(this.$apistore.urls.userobject,{headers: {'X-Auth-Token': this.$apistore.token}}).then((res) => {
						
								console.log('!!!')
								console.log(res.data.message)
								console.log('!!!')
								if(res.data.message === 'need_login'){
									console.log('NEED_LOGIN')
									 this.$router.replace('/singin');

								}else{

									this.initProfile(res.data.result);
								}	

				        
				}, function(error){

				        	console.log(error)

				});

		
		   	} // else end
		    }
		

		},
		created: function(){
			this.getParentId()
			
			 console.log('CREATED PROFILE')
		}

	}
</script>