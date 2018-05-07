<template>
<div  class="auth_wrapper">
	<header-view></header-view>
	<div class="auth_main">
	<div class="auth_forms">
	<h1 class="auth_h1">Welcome <span class="auth-h1--redline">to LAVA</span></h1>
			<div class="auth-links--wrapper">
			<router-link to="/singin" class="auth-links">Sing in</router-link>
    		<router-link to="/singup" class="auth-links auth-links--right">Sing up</router-link>
    		</div>
    		<form  class="form">
    			<!-- Input email start -->
    			     <div :class="[{ 'input-iserror': errors.has('email')}, {'input-preload' : emailValidationPreloader}, { 'input-issucces': validEmail },  'custom-input' ] ">

                        <label class="form-label" for="registration_email">email</label> 

                            <input v-model="email" v-validate="'required|email'" type="text" name="email" placeholder="your@email.com" class="form-input"  maxlength="80" id="registration_email" >                        

                    </div>

                    <span class="validate-error" v-if="errors.has('email')">{{ errors.first('email') }}</span>
                    <!-- Input password start -->
                    <div :class="[{ 'input-iserror': errors.has('password')}, { 'input-issucces': validPassword }, 'custom-input', 'm--custom-input--password' ] " >
                        <div class="input-password--wrapper">
                        <label class="form-label" for="registration_password"> password</label>
                            <input v-model="password"  v-validate="'required|min:6'" :type="showPassword" name="password" class="form-input" maxlength="255" id="registration_password" >
                        </div>    
                        
                        <div class="button-showpassword" @click="showPasswordflag = !showPasswordflag"></div>
                        
                    </div>
                    <span class="validate-error" v-if="errors.has('password')">{{ errors.first('password') }}</span>
                    
                    <!-- Submit next step-->
    			    <input type="submit" name="" value="SING IN NOW" class="form-submit-button" @click="validateLogin">
    			
    			
    		</form>
		</div>
	</div>
</div>
</template>

<script >
	

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

                    this.$http.post(this.$store.api.userlogin , {email: this.email, password: this.password, device: 'desktop'},{emulateJSON: true} ).then( function(response)  {

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
                            this.$store.api.token = response.data.result
                            //Устанавливает cookie
                            this.$cookie.set('lava-token', this.$store.api.token, 1);
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