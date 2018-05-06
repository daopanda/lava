<template>
<div id="wrapper">
	<!-- Header View -->
	<header-view></header-view>
	<!-- Main View -->
	<div id="main">
	<h1>Welcome <span class="redline">to LAVA</span></h1>
		<div id="form-variants">
			<router-link to="/singin" class="fv-link-left ">SING IN</router-link>
    		<router-link to="/singup" class="fv-link-rigth">SING UP</router-link>

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