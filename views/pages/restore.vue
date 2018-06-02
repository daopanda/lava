<template>
	<div class="auth_wrapper" >
    <!-- Header View -->
    <auth-header></auth-header>
    <!-- Main View -->
    <div class="auth_main">
    <div class="auth_forms restore-titles">
    <h1 class="auth_h1">Restore <span class="auth-h1--redline">password</span></h1>
            <div class="auth-links--wrapper">
            
            </div>
            <restore-form></restore-form>
        </div>
    </div>
</div>
</template>

<script >
	module.exports = {
		data: function() {
			return {
				
			}
		},
		created: function(){
            if(this.$cookie.get('lava-token')){
               
               // this.$router.replace('/')
            }else{
               
                 // this.$cookie.set('page', 'restore') 
               
                
            }
        }

	}
</script>