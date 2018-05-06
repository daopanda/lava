<template>
            <!-- REQURIED SINGUP START-->
           <form  class="form ">
                <!-- SingUp step 1 -->
    			<div v-show="step === 1" method="post">
                    <!-- Input email start -->
    			     <div :class="[{ 'is_error': errors.has('email')}, 'custom-input' ] ">

                        <label class="form-label" >email

                            <input v-model="$store.user.email" v-validate="'required|email'" type="text" name="email" placeholder="your@email.com" class="form-input"  maxlength="80" >
                        </label> 

                    </div>
                    <span class="validate-error" v-if="errors.has('email')">{{ errors.first('email') }}</span>
                    <!-- Input password start -->
                    <div :class="[{ 'is_error': errors.has('password')}, 'custom-input', 'ci-password' ] ">
                        <label class="form-label" > password
                            <input v-model="$store.user.password"  v-validate="'required|min:6'" :type="showPassword" name="password" class="form-input" maxlength="255" >

                        </label>
                        <span class="button-check_password" @click="showPasswordflag = !showPasswordflag"></span>
                        
                    </div>
                    <span class="validate-error" v-if="errors.has('password')">{{ errors.first('password') }}</span>
                    <!-- Link to singin -->
    			    <router-link to="/singin" class="back_to_singin">Already have an account?</router-link>
                    <!-- Submit next step-->
    			    <input type="submit" name="" value="SING UP NOW" class="form-submit" @click="validateFirstStep" >
    			</div>
                <!-- /END SingUp step 1 -->

                <!-- SingUp step 2 -->
    			<div  v-show="step === 2">
                <!-- Input name start -->
                    <div :class="[{ 'is_error': errors.has('name')}, 'custom-input' ] ">
                        <label class="form-label" >name
                            <input v-model="$store.user.first_name"  v-validate="'required|alpha'" type="text" name="name" class="form-input" maxlength="30">
                        </label>       
                    
                    </div>
                    <span class="validate-error" v-if="errors.has('name')">{{ errors.first('name') }}</span>

                <!-- Input lastname start -->
                    <div :class="[{ 'is_error': errors.has('lastname')}, 'custom-input' ] ">
                        <label class="form-label" >last name
                            <input  v-model="$store.user.last_name" v-validate="'required|alpha'" name="lastname" type="text" class="form-input" maxlength="30">
                        </label>                    
                    </div>
                    <span class="validate-error" v-if="errors.has('lastname')">{{ errors.first('lastname') }}</span>

                <!-- Birthdate and sex wrapper -->
    			<div class="flex-wrapper">
                    <!-- Input birthdate start -->
                    <div :class="[{ 'is_error': errors.has('birthdate')}, 'custom-input', 'm__birthdate' ] ">
                        <label class="form-label" >birthdate
                            <input  v-model="$store.user.birthdate" type="text" class="form-input "  v-validate="'date_format:D.M.YYYY|date_between:1.1.1938,1.1.2006|required'"  name="birthdate" placeholder="1.1.2018" >
                        </label>                   
                    </div>
                    
                    <!-- Input sex start -->
                    <div class="sex-wrapper">
        
                        <div :class="[{ 'selectSex': activeMan }, 'sex-checkbox' ] " @click="selectMan"></div>
                        <div :class="[{ 'selectSex': activeWoman }, 'sex-checkbox' ] " @click="selectWoman"></div>      

                    </div>

    			</div>
                <span class="validate-error" v-if="errors.has('birthdate')">{{ errors.first('birthdate') }}</span>
                <!-- /END Birthdate and sex wrapper -->

    			<input type="submit" name="" value="NEXT" class="form-submit" @click="validateSecondStep" >

    			</div>
                <!-- /END SingUp step 2 -->
                <div  v-show="step === 3">
                 
                </div>
            <!-- /END REQUIRED SINGUP-->          
    		
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
                activeWoman: false
                
                
                
            }

        },
        
        computed: {
                showPassword: function () {
                    return this.showPasswordflag ? 'password' : 'text';
                    },
                selectSexSetter: function( ){
                    
                        
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
                    
                    if(this.selectSex != 2){
                        
                        this.selectSex = 2
                    
                    }else{
                        
                        this.selectSex = 0
                    }
                    this.selectSexSetter
                },
                 selectMan: function(){
                   
                    if(this.selectSex != 1){
                         
                        this.selectSex = 1
                    
                    }else{
                        
                        this.selectSex = 0
                    }
                    this.selectSexSetter
                },

                registerNewUser: function(){
                    
                    this.$http.post(this.$store.api.userRegistration , this.$store.user, {emulateJSON: true}).then( function(response)  {
                        // войти пользователем и получить токен
                        this.$http.post(this.$store.api.userlogin , {email: this.$store.user.email, password: this.$store.user.password},{emulateJSON: true} ).then( function(response)  {

                            this.$store.api.token = response.data.result

                            this.$router.replace('/')

                        })

                          
                       
                        })
                },

               validateFirstStep: function(e){
                    e.preventDefault()       
                    
     
                    this.$validator.validate('email').then((result) => {
                            
                            this.$http.post(this.$store.api.userRegistration , { email: this.$store.user.email},{emulateJSON: true}).then( function(response)  {

    
                                    if(response.data.message === "email_incorrect"){
                                        this.errors.add({field:"email", msg: "Email incorrect"})
                                    }else if(response.data.message === "email_exists"){
                                        this.errors.add({field:"email", msg: "Email already used"})
                                    }else{
                                        this.validEmail = true
                                        if(this.validEmail && this.validPassword){
                                        this.step += 1
                                        }
                                    }
                                    
                                               
                                
                                
                                
                                
                            },function(error){
                                
                                  // ошибка от сервера
                            })


                          
                     })
                    this.$validator.validate('password').then((result) => {
                            this.validPassword = result
                                if(this.validEmail && this.validPassword){
                                this.step += 1
                    }
                      
                    }) 
                },
                validateSecondStep: function(e){
                    e.preventDefault()

                    this.$validator.validate('name').then((result) => {
                                this.validName = result
                                if(this.validLastname && this.validName && this.validBirthdate){
                                this.step += 1
                    }
                    })
                    this.$validator.validate('lastname').then((result) => {
                                this.validLastname = result
                                if(this.validLastname && this.validName && this.validBirthdate){
                                this.step += 1
                    }
                    })
                    this.$validator.validate('birthdate').then((result) => {
                               
                                this.validBirthdate = result       
                                
                                if(this.validLastname && this.validName && this.validBirthdate){
                                this.step += 1



                    }
                    
                    })


                    this.$validator.validateAll().then((result) => {
                            
                           
                            this.$store.user.birthdate = this.$store.user.birthdate.split('.').join('-');
                            
                            this.registerNewUser()
                           
                            
                        })


                }
                
                
        }



    }
</script>