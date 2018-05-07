<template>
<div class="auth_wrapper">
	<!-- Header View -->
	<header-view></header-view>
	<!-- Main View -->
	<div class="auth_main">
	<div class="auth_forms">
	<h1 class="auth_h1">Welcome <span class="auth-h1--redline">to LAVA</span></h1>
			<div class="auth-links--wrapper">
			<router-link to="/singin" class="auth-links">Sing in</router-link>
    		<router-link to="/singup" class="auth-links auth-links--right">Sing up</router-link>
    		</div>
    		<singup-form></singup-form>
		</div>
	</div>
</div>
</template>

<script >
	

	module.exports = {
		
		
		data: function() {
			return {
				
				
			}

		}
		
	}
</script>