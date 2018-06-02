<template>
	<div class="lv-settings-content--wrapper">
		<h2 class="lv-settings-content--title">Password settings</h2>
		<div class="lv-settings-content-form--wrapper">

			<div :class="[{ 'lv-settings--input-iserror': errors.has('old_password')}, 'lv-settings-content--input-wrap']">
				<label class="lv-settings-content--label" >Old Password</label>
				<input v-validate="'required|min:6'" v-model="old_password" class="lv-settings-content--input" @keyup="clearErrorsFromServer" type="password" name="old_password" >
			</div>
			<span class="lv-settings--validate-error" v-if="errors.has('old_password')">{{ errors.first('old_password') }}</span>


			<div :class="[{ 'lv-settings--input-iserror': errors.has('password')}, 'lv-settings-content--input-wrap']">
				<label class="lv-settings-content--label" >New Password</label>
				<input v-validate="'required|min:6|confirmed'"  class="lv-settings-content--input" type="password" name="password"   v-model="settings.password" @change="clearErrorsFromServer">
			</div>
			<span class="lv-settings--validate-error" v-if="errors.has('password')">{{ errors.first('password') }}</span>


			<div :class="[{ 'lv-settings--input-iserror': errors.has('password_confirmation')}, 'lv-settings-content--input-wrap']">
				<label class="lv-settings-content--label" >Repeat Password</label>
				<input v-validate="'required|min:6'"  class="lv-settings-content--input" type="password" name="password_confirmation"  v-model="settings.password_confirmation" @change="clearErrorsFromServer">
			</div>
			<span class="lv-settings--validate-error" v-if="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</span>




	
				<div class="lv-settings--password-devices-wrap">
				<div >
				
				<div class="lv-settings-password-devices--item-wrap">

					<div class="lv-password-devices--item-title">Sing out on all devices</div>

					<div id="" :class="[{'lv-settings-notice--cheker-off' : !outalldevices }, 'lv-settings-password-devices--checker']" @click="changeDevices">
						<div class="lv-settings-notice--cheker-circle"></div>
					</div>
				</div>
				
				</div>
				<span class="lv-settings--password-devices--item-notice">if enabled, you will have to enter new password on all devices</span>
				</div>





			<button :class="[{ 'lv-settings--sendpreload': sendPreloader}, 'lv-settings--button']" @click="changePasswords">SAVE</button>

		</div>
	</div>


</template>


<script >
	module.exports = {
		data: function() {
			return {

					settings: {
						password: '',
						password_confirmation: ''
					},
					old_password: '',
					sendPreloader: false,
					outalldevices : false,
					Errors: false,
				
				
			}
		},
		methods:{
			clearErrorsFromServer: function(){
				if(this.Errors){
					this.errors.clear() 
					this.Errors = false
				}

			},
			resetall: function (){
				console.log('RESET')
				this.settings.password = ''
				this.settings.password_confirmation = ''
				this.old_password = ''
				

				this.$validator.pause()
        			this.$nextTick(() => {
        				
          		this.$validator.errors.clear()
          		this.$validator.fields.items.forEach(field => field.reset())
          		this.$validator.fields.items.forEach(field => this.errors.remove(field))
          		this.$validator.resume()
        		})
			},
			changePasswords: function(){
				if(!this.sendPreloader){
					this.$validator.validateAll().then((result) => {
					// включает прелоадер
					this.sendPreloader = true

						
						// отправка запроса на сервер
						
				       this.$http.get(this.$apistore.urls.userchangepassword, {params: {
				       	password: this.old_password,
				       	password_new: this.settings.password,
				       	logout_others: this.outalldevices ? 1 : 0,
				       }, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
				       	 
				         
				         
				          // убираем прелоадер
				          this.sendPreloader = false  	


				        if(response.data.message === "password_invalid"){

                        // Генерирует ошибку если пароль не правильный

                        this.errors.add({field:"old_password", msg: "Old password invalid"})
                        this.Errors = true
                                      

                        }else if(response.data.message === "password_match_error"){
                        	     // Генерирует ошибку если новый пароль равен старому

                        	this.errors.add({field:"password", msg: "New password match for old password"})
                        	 this.Errors = true
                        }else{

                        	
                        	
                        	this.resetall();

                        	// всё ок, залогинится новым паролем
                        	if(this.outalldevices){

                            //Устанавливает cookie
                            console.log('OUT')
                       		this.$cookie.delete('lava-token')
                       		this.errors.clear() 
                       		this.$router.push('/singin')


                        	

                        	}           	








                        } // END ELSE
                        
                    
                        	






				        }, function(error){
				        	
				        })
				    })
				}




			},
			changeDevices: function(){
				this.outalldevices = !this.outalldevices
			}
		}

	}
</script>