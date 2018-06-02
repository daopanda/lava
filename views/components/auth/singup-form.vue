<template>
        
            <form  class="form" method="post">
                <!-- SingUp step 1 -->
                
    			<div v-show="step === 1" class="form-step-wrapper">
                    <!-- Input email start -->

    			     <div :class="[{ 'input-iserror': errors.has('email')}, {'input-preload' : emailValidationPreloader}, { 'input-issucces': validEmail }, 'custom-input' ] ">

                        <label class="form-label" for="registration_email">email </label> 

                            <input v-model="u_email" v-validate="'required|email'" type="text" name="email" placeholder="your@email.com" class="form-input"  maxlength="80" id="registration_email" >                        

                    </div>

                    <span class="validate-error" v-if="errors.has('email')">{{ errors.first('email') }}</span>
                    <!-- Input password start -->
                    <div :class="[{ 'input-iserror': errors.has('password')}, { 'input-issucces': validPassword }, 'custom-input', 'm--custom-input--password' ] " >
                        <div class="input-password--wrapper">
                        <label class="form-label" for="registration_password"> password</label>
                            <input v-model="u_password"  v-validate="'required|min:6'" :type="showPassword" name="password" class="form-input" maxlength="255" id="registration_password" >
                        </div>    
                        
                        <div class="button-showpassword" @click="showPasswordflag = !showPasswordflag"></div>
                        
                    </div>
                    <span class="validate-error" v-if="errors.has('password')">{{ errors.first('password') }}</span>
                    <!-- Link to singin -->
    			    <router-link to="/singin" class="form-links">Already have an account?</router-link>
                    <!-- Submit next step-->
    			    <input type="submit" name="" value="SING UP NOW" class="form-submit-button" @click="validateFirstStep">


                    <div class="terms-wrap">Нажимая на кнопка "Зарегистрироваться" Вы соглашаетесь с <a href="" class="terms-link">Правилами использования сервиса</a></div>

                <div class="line-hd"><span class="line-body"></span> <span class="line-text">or</span> <span class="line-body"></span></div>


                <div class="facebook-button">Connect with Facebook</div>
    			</div>

                
                <!-- /END SingUp step 1 -->

                <!-- SingUp step 2 -->
              
    			<div  v-show="step === 2">
                <!-- Input name start -->
                    <div :class="[{ 'input-iserror': errors.has('name')}, 'custom-input' ] ">
                        <label class="form-label" for="registration_name">name</label> 
                            <input v-model="u_first_name"  v-validate="'required|alpha'" type="text" name="name" class="form-input" maxlength="30" id="registration_name">
                              
                    
                    </div>
                    <span class="validate-error" v-if="errors.has('name')">{{ errors.first('name') }}</span>

                <!-- Input lastname start -->
                    <div :class="[{ 'input-iserror': errors.has('lastname')}, 'custom-input' ] ">
                        <label class="form-label" for="registration_lastname" >last name</label>    
                            <input  v-model="u_last_name" v-validate="'required|alpha'" name="lastname" type="text" class="form-input" maxlength="30" id="registration_lastname">
                                        
                    </div>
                    <span class="validate-error" v-if="errors.has('lastname')">{{ errors.first('lastname') }}</span>

                <!-- Birthdate and sex wrapper -->
    			<div class="m--birthdate-and-sex--wrapper">
                    <!-- Input birthdate start -->
                    <div :class="[{ 'input-iserror': errors.has('birthdate')}, 'custom-input', 'm--custom-input--birthdate' ] ">
                        <label class="form-label" for="registration_birthdate">birthdate</label>   
                            <input  v-model="u_birthdate" type="date" class="form-input "  v-validate="'required'"  name="birthdate" placeholder="1.1.2018" id="registration_birthdate">
                                        
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

                <div class="line-hd"><span class="line-body"></span> <span class="line-text">or</span> <span class="line-body"></span></div>


                <div class="facebook-button">Connect with Facebook</div>
    			</div>
              
                <!-- /END SingUp step 2 -->
                <div  v-show="step === 3">





                    <div class="lv-popup--kill" v-show="uploadPopup" >
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
                            <div class="lv-popup-button--upload" @click="uploadPhoto">UPLOAD</div>
                        </div>
                            

                        

                        </div>
    
                    </div>








                    <!-- <div class="zaglushka">We are build you account</div> -->
                    <div class="avatar-container">

                        <div class="avatar-left">
                        <div class="avatar-view-wrap">
                            <div class="avatar-view" :style="getImageStyle">
                             <input type="file" name="myfile" class="lv-settings--upload" @change="processFile($event)" accept="image/jpeg,image/png"/>
                            </div>
                        </div>
                            <div class="avatar-text-wrap">
                             <span class="avatar-text-bold">We are build your profile</span>
                            <span class="avatar-text-regular">Please, upload from your library</span>
                            </div>
                            
                            
                        </div>


                        <div class="avatar-right">
                      <div class="button-wrap">
                           <div class="button-upload" v-if="uploadButtonCheck">Upload
                                <input type="file" name="myfile" class="lv-settings--upload" @change="processFile($event)" />
                            
                                
                            </div>

                            <div class="button-upload" @click="goToLava" v-if="!uploadButtonCheck" >Get started
                            </div>
                        </div>
                        <div class="avatar-text-wrap">
                            <div class="form-links margtop" @click="goToLava" v-if="uploadButtonCheck">skip this step</div>                 
                        </div>
                            
                        </div>
                    </div>
                    
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
                emailValidationPreloader: false,
                u_email: '',
                u_password: '',
                u_first_name: '',
                u_last_name: '',
                u_birthdate: '',
                u_sex: '',
                uploadPopup: false,
                init_view: { width:200, height: 200, type: 'circle'},
                init_boundary: { width:260, height: 260 },
                uploadButtonCheck: true
                

                
                
            }

        },
        
        computed: {
                getLang: function(){
                    return this.$store.state.user.language
                },
                showPassword: function () {

                    // показывает или скрывает пароль

                    return this.showPasswordflag ? 'password' : 'text'

                    },

                selectSexSetter: function( ){      

                        // Определяет какой пол выбран

                        if(this.selectSex === 1){
                            
                            this.u_sex = 1                            
                            this.activeWoman = false
                            this.activeMan = true

                        }else if(this.selectSex === 2){

                            this.u_sex = 2
                            this.activeWoman = true
                            this.activeMan = false

                        }else{

                            this.u_sex = 0
                            this.activeWoman = false
                            this.activeMan = false
                        }
                    
                },
                getImageStyle: function(){
                    console.log('GET IMAGE STYLE')
                    if(this.$store.state.user.image_w320 != null){

                        let imageUrl = this.$store.state.user.image_w320;
                        let style = "background-image: url('//lava.top/" + imageUrl + "') !important; background-size: contain; border:none;";
                        console.log(style);
                        this.uploadButtonCheck = false;
                        return style;

                     }else{
                         console.log('NO IMAGE');
                        return 'test';

                    }
                 
                }                
              
            },
        methods: {
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

                            // Устанавливает фотографию пользователя

                            this.$store.commit({
                            type: 'updateUserPhoto',
                            image: response.data.result.image_w320
                            });


    
                            console.log(response.data.result.image_w320)
                            this.closePopup()      

                        }, function(error){
                             // Ошибка от сервера                   
                             console.log(error)

                        });

                    });
                },
                closePopup: function(){
                    this.uploadPopup = false;
                },
                processFile: function(event){

                var reader = new window.FileReader() // if window is not used it says File READER is not defined
                reader.onload = (event) => {
                  // dispatch fileAttached to state UI postEditor with event.target.result as read dataURL
                  let imageDataURL = event.target.result
                  this.uploadPopup = true
                  this.$refs.croppieRef.bind({
                        url: imageDataURL
                     })
                 // or previewFile
                }
                reader.readAsDataURL(event.target.files[0])
                },
            

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
                    
                    this.$http.post(this.$apistore.urls.userRegistration , {
                        email: this.u_email,
                        password: this.u_password,
                        first_name: this.u_first_name,
                        last_name: this.u_last_name,
                        birthdate: this.u_birthdate,
                        language: this.getLang,
                        sex: this.u_sex

                    }, {emulateJSON: true}).then( function(response)  {

                        // войти пользователем и получить токен

                        this.$http.post(this.$apistore.urls.userlogin , {email: this.u_email, password: this.u_password, device: 'desktop'},{emulateJSON: true} ).then( function(response)  {

                            

                            // Записывает token в $store
                            this.$apistore.token = response.data.result

                            // Создаём Cookie
                            this.$cookie.set('lava-token', this.$apistore.token, 1);
                            
                            // Убирает пароль
                            this.u_password = 'none';

                            this.step = 3;
                            // редирект на главную
                            //this.$router.replace('/')

                        })

                          
                       
                        })
                },
                goToLava: function(){
                    this.$router.replace('/');
                },
               
               validateFirstStep: function(e){
                    // отмена отправки формы
                    e.preventDefault()       

                    // Валидация первого этапа регистрации
                    // !!! Включается прелоадер
                    this.emailValidationPreloader = true
                    // Валидация email на сервере
                    

                    this.$validator.validate('email').then((result) => {
                            
                            this.$http.post(this.$apistore.urls.userRegistration , { email: this.u_email},{emulateJSON: true}).then( function(response)  {

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
                                            this.step = 2;
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
                                this.step = 2;
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
                                this.step = 3;
                            // Установка даты под формат сервера Y-M-D .split('.').reverse().join('-');
                            this.u_birthdate = this.u_birthdate
                            
                            this.registerNewUser();


                            }
                            
                        })


                }
                
                
        }



    }
</script>