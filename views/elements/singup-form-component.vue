<template>
        
            <form  class="form" method="post">
                <!-- SingUp step 1 -->
    			<div v-show="step === 1" class="form-step-wrapper">
                    <!-- Input email start -->
    			     <div :class="[{ 'input-iserror': errors.has('email')}, {'input-preload' : emailValidationPreloader}, { 'input-issucces': validEmail }, 'custom-input' ] ">

                        <label class="form-label" for="registration_email">email</label> 

                            <input v-model="$store.user.email" v-validate="'required|email'" type="text" name="email" placeholder="your@email.com" class="form-input"  maxlength="80" id="registration_email" >                        

                    </div>

                    <span class="validate-error" v-if="errors.has('email')">{{ errors.first('email') }}</span>
                    <!-- Input password start -->
                    <div :class="[{ 'input-iserror': errors.has('password')}, { 'input-issucces': validPassword }, 'custom-input', 'm--custom-input--password' ] " >
                        <div class="input-password--wrapper">
                        <label class="form-label" for="registration_password"> password</label>
                            <input v-model="$store.user.password"  v-validate="'required|min:6'" :type="showPassword" name="password" class="form-input" maxlength="255" id="registration_password" >
                        </div>    
                        
                        <div class="button-showpassword" @click="showPasswordflag = !showPasswordflag"></div>
                        
                    </div>
                    <span class="validate-error" v-if="errors.has('password')">{{ errors.first('password') }}</span>
                    <!-- Link to singin -->
    			    <router-link to="/singin" class="form-links">Already have an account?</router-link>
                    <!-- Submit next step-->
    			    <input type="submit" name="" value="SING UP NOW" class="form-submit-button" @click="validateFirstStep">
    			</div>
                <!-- /END SingUp step 1 -->

                <!-- SingUp step 2 -->
    			<div  v-show="step === 2">
                <!-- Input name start -->
                    <div :class="[{ 'input-iserror': errors.has('name')}, 'custom-input' ] ">
                        <label class="form-label" for="registration_name">name</label> 
                            <input v-model="$store.user.first_name"  v-validate="'required|alpha'" type="text" name="name" class="form-input" maxlength="30" id="registration_name">
                              
                    
                    </div>
                    <span class="validate-error" v-if="errors.has('name')">{{ errors.first('name') }}</span>

                <!-- Input lastname start -->
                    <div :class="[{ 'input-iserror': errors.has('lastname')}, 'custom-input' ] ">
                        <label class="form-label" for="registration_lastname" >last name</label>    
                            <input  v-model="$store.user.last_name" v-validate="'required|alpha'" name="lastname" type="text" class="form-input" maxlength="30" id="registration_lastname">
                                        
                    </div>
                    <span class="validate-error" v-if="errors.has('lastname')">{{ errors.first('lastname') }}</span>

                <!-- Birthdate and sex wrapper -->
    			<div class="m--birthdate-and-sex--wrapper">
                    <!-- Input birthdate start -->
                    <div :class="[{ 'input-iserror': errors.has('birthdate')}, 'custom-input', 'm--custom-input--birthdate' ] ">
                        <label class="form-label" for="registration_birthdate">birthdate</label>   
                            <input  v-model="$store.user.birthdate" type="text" class="form-input "  v-validate="'date_format:DD.MM.YYYY|date_between:01.01.1938,01.01.2006|required'"  name="birthdate" placeholder="1.1.2018" id="registration_birthdate">
                                        
                    </div>
                    
                    <!-- Input sex start -->
                    <div class="m--sex--wrapper">
        
                        <div :class="[{ 'input-sex-selected': activeMan }, 'input-sex' ] " @click="selectMan"></div>
                        <div :class="[{ 'input-sex-selected': activeWoman }, 'input-sex' ] " @click="selectWoman"></div>      

                    </div>

    			</div>
                <span class="validate-error" v-if="errors.has('birthdate')">{{ errors.first('birthdate') }}</span>
                <!-- /END Birthdate and sex wrapper -->

    			<input type="submit" name="" value="NEXT" class="form-submit-button" @click="validateSecondStep" >

    			</div>
                <!-- /END SingUp step 2 -->
                <div  v-show="step === 3">
                    <div class="zaglushka">We are build you account</div>
                 
                </div>
                     
    		
            </form>
</template>

<script >
    

    module.exports = {
        
        
        data: function() {
            return {
                step: 1,
                showPasswordflag: true,
                validEmail: false,
                validPassword: false,
                validName: false,
                validLastname: false,
                validBirthdate: false,
                selectSex: 0,
                activeMan: false,
                activeWoman: false,
                emailValidationPreloader: false     
                
                
            }

        },
        
        computed: {
                showPassword: function () {

                    // показывает или скрывает пароль

                    return this.showPasswordflag ? 'password' : 'text'

                    },

                selectSexSetter: function( ){      

                        // Определяет какой пол выбран

                        if(this.selectSex === 1){
                            
                            this.$store.user.sex = 1                            
                            this.activeWoman = false
                            this.activeMan = true

                        }else if(this.selectSex === 2){

                            this.$store.user.sex = 2
                            this.activeWoman = true
                            this.activeMan = false

                        }else{

                            this.$store.user.sex = 0
                            this.activeWoman = false
                            this.activeMan = false
                        }
                    
                }                 
              
            },
        methods: {

                selectWoman: function(){

                    // выбирает пол, если этот пол уже выбран, то сбрасывает пол на 0

                    if(this.selectSex != 2){ 

                        this.selectSex = 2  

                    }else{                 

                        this.selectSex = 0

                    }

                    this.selectSexSetter
                },
                selectMan: function(){

                    // выбирает пол, если этот пол уже выбран, то сбрасывает пол на 0

                    if(this.selectSex != 1){  

                        this.selectSex = 1   

                    }else{                 

                        this.selectSex = 0

                    }

                    this.selectSexSetter
                },

                registerNewUser: function(){

                    // Регистрация нового пользователя
                    
                    this.$http.post(this.$store.api.userRegistration , this.$store.user, {emulateJSON: true}).then( function(response)  {

                        // войти пользователем и получить токен

                        this.$http.post(this.$store.api.userlogin , {email: this.$store.user.email, password: this.$store.user.password, device: 'desktop'},{emulateJSON: true} ).then( function(response)  {

                            

                            // Записывает token в $store
                            this.$store.api.token = response.data.result

                            // Создаём Cookie
                            this.$cookie.set('lava-token', this.$store.api.token, 1);
                            
                            // Убирает пароль
                            this.$store.user.password = 'none'

                            // Возврат формата даты под клиент
                            this.$store.user.birthdate = this.$store.user.birthdate.split('-').reverse().join('.');
                            // редирект на главную
                            this.$router.replace('/')

                        })

                          
                       
                        })
                },
               
               validateFirstStep: function(e){
                    // отмена отправки формы
                    e.preventDefault()       

                    // Валидация первого этапа регистрации
                    // !!! Включается прелоадер
                    this.emailValidationPreloader = true
                    // Валидация email на сервере
                    

                    this.$validator.validate('email').then((result) => {
                            
                            this.$http.post(this.$store.api.userRegistration , { email: this.$store.user.email},{emulateJSON: true}).then( function(response)  {

                                    // Обработка валидации email на сервере
                                    //выключается прелоадер
                                    this.emailValidationPreloader = false
                                    

                                    if(response.data.message === "email_incorrect"){

                                        // Генерирует ошибку если email не корректен (как я понял по списку доменов)



                                        this.errors.add({field:"email", msg: "Email incorrect"})

                                      

                                    }else if(response.data.message === "email_exists"){

                                        // Генерирует ошибку если email занят

                                        

                                        this.errors.add({field:"email", msg: "Email already used"})
                                        

                                    }else{

                                        // Валидация от сервера прошла успешно
                                        // 
                                        // !!! Прелоадер succes
                                        this.validEmail = true
                                        
                                        if(this.validEmail && this.validPassword){
                                        if(this.step === 1) {
                                            this.step += 1
                                        }
                                        

                                        }

                                        
                                    }
                                
                            },function(error){
                                
                                  // ошибка от сервера
                            })  
                    })

                    // Валидация поля пароль на клиенте
                    
                    this.$validator.validate('password').then((result) => {

                            
                            this.validPassword = result
                            
                            if(this.validEmail && this.validPassword){
                             
                            if(this.step === 1) {
                                this.step += 1
                            }

                            }
                      
                    }) 
                },
                
                validateSecondStep: function(e){
                    e.preventDefault()
                    // Валидация второго этапа регистрации

                    this.$validator.validate('name').then((result) => {
                                this.validName = result
                               
                    
                    })

                    this.$validator.validate('lastname').then((result) => {
                                this.validLastname = result
                                
                    
                    })
                    this.$validator.validate('birthdate').then((result) => {
                               
                                this.validBirthdate = result       
                                
                               



                    
                    
                    })

                    // Валидация второго этапа регистрации (всей формы перед отправкой)

                    this.$validator.validateAll().then((result) => {
                            
                            if(this.validLastname && this.validName && this.validBirthdate){
                                this.step += 1
                            // Установка даты под формат сервера Y-M-D
                            this.$store.user.birthdate = this.$store.user.birthdate.split('.').reverse().join('-');
                            
                            this.registerNewUser()


                            }
                            
                        })


                }
                
                
        }



    }
</script>