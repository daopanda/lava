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
                            <input v-model="$store.user.password"  v-validate="'required'" :type="showPassword" name="password" class="form-input" maxlength="255" >

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
                            <input v-model="$store.user.name"  v-validate="'required|alpha'" type="text" name="name" class="form-input" maxlength="30">
                        </label>       
                    
                    </div>
                    <span class="validate-error" v-if="errors.has('name')">{{ errors.first('name') }}</span>

                <!-- Input lastname start -->
                    <div :class="[{ 'is_error': errors.has('lastname')}, 'custom-input' ] ">
                        <label class="form-label" >last name
                            <input  v-model="$store.user.lastname" v-validate="'required|alpha'" name="lastname" type="text" class="form-input" maxlength="30">
                        </label>                    
                    </div>
                    <span class="validate-error" v-if="errors.has('lastname')">{{ errors.first('lastname') }}</span>

                <!-- Birthdate and sex wrapper -->
    			<div class="flex-wrapper">
                    <!-- Input birthdate start -->
                    <div :class="[{ 'is_error': errors.has('birthdate')}, 'custom-input', 'm__birthdate' ] ">
                        <label class="form-label" >birthdate
                            <input type="text" class="form-input "  v-validate="'date_format:{DD/MM/YYYY}|required'"  name="birthdate" placeholder="19.2.2018" >
                        </label>                   
                    </div>
                    
                    <!-- Input sex start -->
                    <div class="sex-wrapper">
        
                        <div class="sex-checkbox"></div>
                        <div class="sex-checkbox"></div>      

                    </div>

    			</div>
                <span class="validate-error" v-if="errors.has('birthdate')">{{ errors.first('birthdate') }}</span>
                <!-- /END Birthdate and sex wrapper -->

    			<input type="submit" name="" value="NEXT" class="form-submit" @click="" >

    			</div>
                <!-- /END SingUp step 2 -->
       
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
                validPassword: false
                
                
            }

        },
        
        computed: {
                showPassword: function () {
                    return this.showPasswordflag ? 'password' : 'text';
                    }
                
              
            },
        methods: {

               validateFirstStep: function(e){
                    e.preventDefault()       
                    
     
                    this.$validator.validate('email').then((result) => {
                            this.validEmail = result
                                if(this.validEmail && this.validPassword){
                                this.step += 1
                    }
                     })
                    this.$validator.validate('password').then((result) => {
                            this.validPassword = result
                                if(this.validEmail && this.validPassword){
                                this.step += 1
                    }
                      
                    })

                


                },
                validateSecontStep: function(e){
                    e.preventDefault()
                }
                
        }



    }
</script>