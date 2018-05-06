<template>
<div id="lava-wrapper">
	<div>{{ name }} </div>
	<div>{{ lastname }}</div>
	<div>{{ $store.api.token }}</div>
	<button @click="logout">выход</button>
</div>
</template>

<script >
	

	module.exports = {
		data: function() {
			return {
				name: '',
				lastname: ''
			}
		
		},
		methods: {
			logout: function(){
				// удалить cookie
				this.$store.api.token = ''
				this.$router.replace('/singin')
			}

		},
		created: function(){
			if(this.$store.api.token.length === 0){
				console.log('not loging')
				this.$router.replace('/singin')
			}else{
				this.name = this.$store.user.first_name
				this.lastname = this.$store.user.last_name
			}

		}

	}
</script>