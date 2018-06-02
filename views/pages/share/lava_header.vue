<template>
	<header class="lv-header" v-if="show">
		<div class="lv-logotype"><router-link class="lv-logotype--link" to="/"><img class="lv-logo" src="assets/imgs/logo-color.svg">LAVA</router-link></div>
		<search-input></search-input>

		
		<nav class="lv-nav">
			<a href="#" class="lv-nav--link icn-news--bg">news</a>
			<a href="#" class="lv-nav--link icn-message--bg">messages</a>
			<a href="#" class="lv-nav--link icn-add--bg">add</a>
			<a href="#" class="lv-nav--link icn-bell--bg">notify</a>
			<a href="#" class="lv-nav--link lv-nav--link__profile">profile</a>
		</nav>
	</header>
</template>

<script >
	module.exports = {
		data: function() {
			return {
				show: false
			}
		},
		created: function(){
			if(this.$cookie.get('lava-token')){
				let name = this.$route.name
				if(name != 'singin' && name !='singup'  && name !='restore' && name !='restoreurl'){
					this.show = true
				}else{
					this.show = false
				}

				
			}else{
				this.show = false
			}

		}

	}
</script>