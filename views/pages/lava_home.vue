<template>
	<div class="lv-wrapper">

	
	<preloader v-if="loader"></preloader>

	<div class="lv-content-wrapper" v-if="!loader">

		<div class="lv-content-leftcolumn"> 
		<lava-profile></lava-profile>
		</div>



		<div class="lv-content-rightcolumn">
			<lava-wall></lava-wall>
			


		</div>



	</div>

	</div>
</template>

<script >
	module.exports = {
		data: function() {
			return {
				loader: true,
			}
		},
		methods:{
			initProfile: function(userdata){
    			
    			let guest_id = this.$route.params.id

    			//ecли id нет
    			if(this.$route.params.id === undefined){
    				this.$store.commit('guestReset');
    				
    				console.log('УЖЕ ЕСТЬ ДАННЫЕ USER COMMIT')




    				this.$store.commit({
		  			type: 'initUser',
		  			userdata: userdata
					});

    				let url = '/id' + this.$store.state.user.id;
    				this.$router.replace(url)

					this.loader = false; 



    			}else{ // id указан



    			if(userdata.id != this.$route.params.id ){
    				console.log('НЕ РАВНЫ ID')

    				// загрузить данные пользователя чей id в ссылке
    				// инициализировать профиль под пользователя чей id
    				console.log( this.$apistore.token)
    				 // Запрос к серверу                
					this.$http.get(this.$apistore.urls.usersget,{params:{
						user_ids: guest_id,
						fields: 'following_by_me'
					},headers: {'X-Auth-Token': this.$apistore.token}}).then((new_res) => {
						
						    

						// обработать ошибки
						console.log(new_res.data.result[0].following_by_me)

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
			getUserInfo: function(){
		    
		   	// если в хранилище есть user data
		    if(this.$store.state.user.id != false){
				// убираем прелоадер	

					console.log('УЖЕ ЕСТЬ ДАННЫЕ USER')

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
									console.log('OT СЕРВЕРА ДАННЫЕ USER')
									this.initProfile(res.data.result);
								}	

				        
				}, function(error){

				        	console.log(error)

				});

		
		   	} // else end
		    }
		

		},
		watch: {
    		'$route' (to, from) {

    			// определим есть ли id в строке

    			this.loader = true;

      			this.getUserInfo()
      		}
    	},	
		created: function(){
			this.getUserInfo()
			
			 console.log('CREATED PROFILE')
		}

	}
</script>