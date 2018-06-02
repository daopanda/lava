<template>
	<form  class="form">

	<div class="restore-pouop-wrap" v-if="popup" @click.self="killPopup">
		<div class="restore-popup-body">
			<div class="restore-popup-img"></div>
			<div class="restore-popup-title">We've sent secret code to your email </div>
			<p class="restore-popup-text">Check the link from your mail to restore your password </p>

			<div class="restore-popup-buttons-wrap">
				<span class="restore-popup-button" @click="sendAgain">send again</span>
				<span class="restore-popup-button" @click="toSecondeStep">close this window</span>
			</div>

		</div>


	</div>






		<div v-show="step === 1" class="form-step-wrapper">

		<p class="restore-form-text">
		Enter the email specified during registration and we will send you a new password 
		</p>
			<div :class="[{ 'input-iserror': errors.has('email')}, {'input-preload' : emailValidationPreloader}, { 'input-issucces': validEmail }, 'custom-input' ] ">

                        <label class="form-label" for="reemail">email </label> 

                            <input v-model="email" v-validate="'required|email'" type="text" name="email" placeholder="your@email.com" class="form-input"  maxlength="80" id="reemail" >                        

                    </div>

                    <span class="validate-error" v-if="errors.has('email')">{{ errors.first('email') }}</span>

                     <button class="form-submit-button" @click.prevent="fistStep">Next </button>
		</div>


		<div v-show="step === 2" class="form-step-wrapper">
<p class="restore-form-text">
		Enter the code from your email. Check spam.
		</p>
			<div :class="[{ 'input-iserror': errors.has('code')}, {'input-preload' : emailValidationPreloader}, { 'input-issucces': validEmail }, 'custom-input' ] ">

                        <label class="form-label" for="code">code </label> 

                            <input v-model="code" v-validate="'required'" type="text" name="code" placeholder="" class="form-input"  maxlength="80" id="code" >                        

                    </div>

                    <span class="validate-error" v-if="errors.has('code')">{{ errors.first('code') }}</span>

                     <button class="form-submit-button" @click.prevent="secondStep">Next </button>

		</div>
		<div v-show="step === 3" class="form-step-wrapper">
			<p class="restore-form-text">
		Enter new password.
		</p>
				<span class="validate-error" v-if="errors.has('email')">{{ errors.first('email') }}</span>
                    <!-- Input password start -->
                    <div :class="[{ 'input-iserror': errors.has('repassword')}, { 'input-issucces': validPassword }, 'custom-input', 'm--custom-input--password' ] " >
                        <div class="input-password--wrapper">
                        <label class="form-label" for="repassword"> {{ $locale({i: 'forms.password'}) }}</label>
                            <input v-model="password"  v-validate="'required|min:6'" :type="showPassword" name="repassword" class="form-input" maxlength="255" id="repassword" >
                        </div>    
                        <!-- Заменить на иконку -->
                        <div class="button-showpassword" @click="showPasswordflag = !showPasswordflag"></div>

                        
                    </div>

                    <span class="validate-error" v-if="errors.has('repassword')">{{ errors.first('password') }}</span>
                    <button class="form-submit-button" @click.prevent="lastStep">SEnd </button>

		</div>

				<div class="restore-back" @click="goToSingin">back</div>
					
		</div>



	</form>
</template>

<script >
	module.exports = {
		data: function() {
			return {
				step: 1,
				code: '',
				email: '',
				password: '',
				validPassword: false,
				showPasswordflag: true,
				popup: false,
				emailValidationPreloader: false,
				validEmail: false
				
			}
		},
		computed: {
                showPassword: function () {

                    // показывает или скрывает пароль

                    return this.showPasswordflag ? 'password' : 'text'

                   }
               },
		methods:{
			killPopup: function(){
				this.popup = false



			},

			sendAgain:function(){

				this.fistStep()

			},			
			toSecondeStep: function(){
				this.killPopup()
				this.step = 2
			},
			secondStep: function(){
				this.step = 3


			},
			goToSingin: function(){
				this.$router.replace('/singin');
			},
			fistStep: function(){
                    // отмена отправки формы
                    console.log('SEND RESTORE')
                                        

                    this.$validator.validateAll().then((result) => {

                    this.emailValidationPreloader = true

                    this.$http.post(this.$apistore.urls.restorePassword , {email: this.email},{emulateJSON: true} ).then( function(response)  {

                        this.emailValidationPreloader = false

                       	if(response.data.message === "user_not_found"){

                            this.errors.add({field:"email", msg: "User not found"})

                        }else{

                           
                            //Устанавливает следующую форму
                          	//popup
                          	this.popup = true

                            }
                        })
                    }) 
                },
                lastStep: function(){


                    

                    this.$http.post(this.$apistore.urls.restorePassword , {
                    	email: this.email,
                    	code: this.code,
                    	password: this.password
                    },{emulateJSON: true} ).then( function(response)  {

                        this.emailValidationPreloader = false

                       	if(response.data.message === "user_not_found"){

                            this.errors.add({field:"email", msg: "User not found"})

                        }else if(response.data.message ===  'code_incorrect'){

                        	this.errors.add({field:"code", msg: "Code incorrect"})
                        	this.step = 2;


                           
                            //Устанавливает следующую форму
                          	//popup
                          	
                          	
                            }else if(response.data.message ===  'code_invalid'){
                            	this.errors.add({field:"code", msg: "Code invalid"})
                        	this.step = 2;
                            }else{


                            	this.$router.replace('/singin')


                            }



                        })

                }
		},
		created: function(){
			// по урл
			let url = this.$route.query
			console.log('FROM RESTORE')
			console.log(this.$route.query)

			if(url.email === undefined){
			
			}else{
					this.email = url.email,
				this.code = url.code
				this.step = 3
				console.log('RESTORE QUERY SET')
			}

		}

	}
</script>