<template>
<div class="auth_wrapper" >
    <!-- Header View -->
    <auth-header></auth-header>
    <!-- Main View -->
    <div class="auth_main">
    <div class="auth_forms">
    <h1 class="auth_h1">Welcome <span class="auth-h1--redline">to LAVA</span></h1>
            <div class="auth-links--wrapper">
            <router-link to="/singin" class="auth-links" v-localize="{i: 'auth.singin'}">Sing in</router-link>
            <router-link to="/singup" class="auth-links auth-links--right" v-localize="{i: 'auth.singup'}">Sing up</router-link>
            </div>
            <singin-form></singin-form>
        </div>
    </div>
</div>
</template>


<script >
    // если залогинен редирект на профиль

    module.exports = {
        
        
        data: function() {
            return {
                
                
            }

        },
        created: function(){
            if(this.$cookie.get('lava-token')){
               
               // this.$router.replace('/')
            }else{
                //this.$cookie.set('page', 'singin')
            }
        }
        
    }
</script>




