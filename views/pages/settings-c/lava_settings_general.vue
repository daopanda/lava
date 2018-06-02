<template>

	<div class="lv-settings-content--wrapper">
		<h2 class="lv-settings-content--title">General settings</h2>
		<div class="lv-settings-content-form--wrapper">
		<!-- ????
			<div class="lv-settings-content--input-wrap">
				<label class="lv-settings-content--label">Username</label>
				<input class="lv-settings-content--input" type="text" name="" v-model="username" >
			</div> -->

			<div :class="[{ 'lv-settings--input-iserror': errors.has('name')}, 'lv-settings-content--input-wrap']">
				<label class="lv-settings-content--label" >Name</label>
				<input v-validate="'required|alpha'" maxlength="15" class="lv-settings-content--input" type="text" name="name" v-model="first_name">

			</div>
			<span class="lv-settings--validate-error" v-if="errors.has('name')">{{ errors.first('name') }}</span>


			<div :class="[{ 'lv-settings--input-iserror': errors.has('lastname')}, 'lv-settings-content--input-wrap']">
				<label class="lv-settings-content--label">Last name</label>
				<input v-validate="'required|alpha'" maxlength="20" class="lv-settings-content--input" type="text" name="lastname" v-model="last_name">
			</div>
			<span class="lv-settings--validate-error" v-if="errors.has('lastname')">{{ errors.first('lastname') }}</span>



			<div :class="[{ 'lv-settings--input-iserror': errors.has('email')}, 'lv-settings-content--input-wrap']" >
				<label class="lv-settings-content--label">Email</label>
				<input v-validate="'required|email'"  name="email" class="lv-settings-content--input" type="text"  v-model="email">
				
			</div>
			<span class="lv-settings--validate-error" v-if="errors.has('email')">{{ errors.first('email') }}</span>




			<div :class="[{ 'lv-settings--input-iserror': errors.has('birthdate')}, 'lv-settings-content--input-wrap']">
				<label class="lv-settings-content--label">Birthdate</label>
				<input class="lv-settings-content--input" type="date" name="birthdate" v-model="birthdate" v-validate="'required'" :min="maxDate" :max="minDate">
			</div>
			<span class="lv-settings--validate-error" v-if="errors.has('birthdate')">{{ errors.first('birthdate') }}</span>

			<div class="lv-settings--gender-wrapper">

				<span class="lv-settings--gender-title">GENDER</span>
					<div class="lv-settings--gender-control-wrapper">
						<div :class="[{ 'lv-gender-male-selected ': sex === 1}, 'lv-settings--gender-button', 'icn-male']   " @click="selectMale">Male</div>
						<div :class="[{ 'lv-gender-famale-selected  ': sex === 2}, 'lv-settings--gender-button', 'icn-famale']" @click="selectFamale">Famale</div>
					</div>
			</div>

				<button :class="[{ 'lv-settings--sendpreload': sendPreloader}, 'lv-settings--button']" @click="sendGeneral">SAVE</button>

		


		</div>
	</div>
</template>

<script >
	module.exports = {
		data: function() {
			return {
				username:'',
				first_name:this.$store.state.user.first_name,
				last_name:this.$store.state.user.last_name,
				email: this.$store.state.user.email,
				birthdate: this.$store.state.user.birthdate,
				sex: this.$store.state.user.sex,
				activeMale: '',
				activeFamale: '',
				sendPreloader: false,
				birthdate_format: ''
				
			}
		},
		computed:{
				minDate: function(){
					var now = new Date();
					var m = now.getMonth();
					var d = now.getDate();

					if(d<10){d='0'+d}
					if(m<10){m='0'+m}
					var min = now.getFullYear() - 17;
					return min + "-" + m + "-" + d
				},
				maxDate: function(){
					var now = new Date();
					var m = now.getMonth();
					var d = now.getDate();
					if(d<10){d='0'+d}
					if(m<10){m='0'+m}
					var max = now.getFullYear() - 80;
					return max + "-" + m + "-" + d
				}
		},
		methods:{
			selectMale: function(){
				// выбирает пол, если этот пол уже выбран, то сбрасывает пол на 0

                    if(this.sex != 1){ 

                        this.sex = 1  

                    }else{                 

                        this.sex = 0

                    }

               

			},
			selectFamale: function(){
				    if(this.sex != 2){ 

                        this.sex = 2  

                    }else{                 

                        this.sex = 0

                    }

               

			},


			sendGeneral: function(){
			if(!this.sendPreloader){
				// валидация формы
				this.$validator.validateAll().then((result) => {
                	// включает прелоадер на кнопке          	
                    this.sendPreloader = true      
                	// Установка даты под формат сервера Y-M-D
                    this.birthdate_format = this.birthdate;
                            
                    	// отправка на сервер
                        this.$http.get(this.$apistore.urls.usersetinfo, {params: {
                        	first_name: this.first_name,
                        	last_name: this.last_name,
                        	email: this.email,
                        	birthdate: this.birthdate_format,
                        	sex: this.sex

                        }, 
                        headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
				       		// записываем данные в память $store

				       	this.$store.commit({
		  					type: 'updateUserGeneral',
		  					first_name: this.first_name,
                        	last_name: this.last_name,
                        	email: this.email,
                        	birthdate: this.birthdate,
                        	sex: this.sex

						});
				       		
				          	// убираем прелоадер
				          	this.sendPreloader = false  			          

				        }, function(error){
				        	 // Ошибка от сервера	                


				        })
                           


                })
			}	
				
			}
			
		},
		created: function(){
			    
		}

	}
</script>