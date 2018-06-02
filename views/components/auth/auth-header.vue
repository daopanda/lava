<template>
	<header class="header">		
		<a href="#" class="logotype_link">
		<img src="assets/imgs/logo.svg" >
		LAVA
		</a>	




		<div class="lang-button">
			<div class="lang-button--content" v-localize="{i: 'lang.reduction'}">eng</div>
			<div class="lang-dropdown">
				<div class="lang-dropdown--items">
					<div class="lang-dropdown--item" @click="changeLang('en-US')">eng</div>
					<div class="lang-dropdown--item" @click="changeLang('ru-RU')">рус</div>
				</div>
			</div>
		</div>


	</header>
</template>

<script >
	module.exports = {
		data: function() {
			return {
			

				
			}
		},
		methods:{
			changeLang(lang){
				this.$locale({l: lang});
				this.$cookie.set('lava-lang', lang, 1);

				this.$store.commit({
		  			type: 'updateLanguage',
		  			language: lang.substring(0,2)
				});

			}
		}

	}
</script>