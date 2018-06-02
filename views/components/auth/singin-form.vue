

<template>

    		<form  class="form">
    			<!-- Input email start -->
    			     <div :class="[{ 'input-iserror': errors.has('email')}, {'input-preload' : emailValidationPreloader}, { 'input-issucces': validEmail },  'custom-input' ] ">

                        <label class="form-label" for="registration_email">{{ $locale({i: 'forms.email'}) }}</label> 

                            <input v-model="email" v-validate="'required|email'" type="text" name="email" placeholder="your@email.com" class="form-input"  maxlength="80" id="registration_email" >                        

                    </div>

                    <span class="validate-error" v-if="errors.has('email')">{{ errors.first('email') }}</span>
                    <!-- Input password start -->
                    <div :class="[{ 'input-iserror': errors.has('password')}, { 'input-issucces': validPassword }, 'custom-input', 'm--custom-input--password' ] " >
                        <div class="input-password--wrapper">
                        <label class="form-label" for="registration_password"> {{ $locale({i: 'forms.password'}) }}</label>
                            <input v-model="password"  v-validate="'required|min:6'" :type="showPassword" name="password" class="form-input" maxlength="255" id="registration_password" >
                        </div>    
                        <!-- Заменить на иконку -->
                        <div class="button-showpassword" @click="showPasswordflag = !showPasswordflag"></div>

                        
                    </div>

                    <span class="validate-error" v-if="errors.has('password')">{{ errors.first('password') }}</span>
                      <router-link to="/restore" class="form-links ">Forgot password?</router-link>
                    
                    <!-- Submit next step-->
                    <button class="form-submit-button" @click="validateLogin" v-localize="{i: 'forms.singinbutton'}">Sing in now </button>
    			   
    			<div class="line-hd"><span class="line-body"></span> <span class="line-text">or</span> <span class="line-body"></span></div>


                <div class="facebook-button">Connect with Facebook</div>
    			
    		</form>


</template>



<script>
	module.exports = {
		data: function() {
			return {
				showPasswordflag: true,
				validEmail: false,
				validPassword: false,
				showPasswordflag: true,
				emailValidationPreloader: false,
				email: '',
				password: '' 
			}
		
		},
		computed: {
                showPassword: function () {

                    // показывает или скрывает пароль

                    return this.showPasswordflag ? 'password' : 'text'

                   }
               },
		methods:{
			validateLogin: function(e){
                    // отмена отправки формы
                    e.preventDefault()                       

                    this.$validator.validateAll().then((result) => {

                    this.emailValidationPreloader = true

                    this.$http.post(this.$apistore.urls.userlogin , {email: this.email, password: this.password, device: 'desktop'},{emulateJSON: true} ).then( function(response)  {

                        this.emailValidationPreloader = false

                        if(response.data.message === "login_fail"){

                        // Генерирует ошибку если пароль не правильный

                        this.errors.add({field:"email", msg: "Email or password incorrect"})
                        this.errors.add({field:"password", msg: "Email or password incorrect"})
                                      

                        }else if(response.data.message === "user_banned"){

                            this.errors.add({field:"email", msg: "This user banned"})

                        }else if(response.data.message === "need_reg_auth"){

                            this.errors.add({field:"email", msg: "Need confirm email"})

                        }else{

                            // Записывает token в $store
                            this.$apistore.token = response.data.result
                            //Устанавливает cookie
                            this.$cookie.set('lava-token', this.$apistore.token, 1);
                            // Убирает пароль
                            this.password = 'none'

                            // редирект на главную
                           this.$router.replace('/')

                            }
                        })
                    }) 
                }
		}
	}
</script>