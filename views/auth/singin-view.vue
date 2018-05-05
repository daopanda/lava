<template>
<div id="wrapper">
	<header-view></header-view>
	<div id="main">
	<h1>Welcome <span class="redline">to LAVA</span></h1>
		<div id="form-variants">
			<router-link to="/singin" class="fv-link-left ">SING IN</router-link>
    		<router-link to="/singup" class="fv-link-rigth">SING UP</router-link>

    		<form  class="form">

    			
    			<input type="submit" name="" value="SING IN NOW" class="form-submit">
    		</form>
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