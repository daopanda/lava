<template>
<div id="lava-wrapper">
	wait response from server
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
				lastname: '',
				userinfo: ''
			}
		
		},
		methods: {
			logout: function(){
				
				

				this.$http.get(this.$store.api.userlogout,{headers: {'X-Auth-Token': this.$store.api.token}}).then( function(response)  {
					
						this.$store.api.token = ''
						this.$cookie.delete('lava-token')
						this.$router.replace('/singin')

					})
			
			},
			getUserInfo: function(){
				this.$store.api.token = this.$cookie.get('lava-token')
				
				this.$http.get(this.$store.api.userobject,{headers: {'X-Auth-Token': this.$store.api.token}}).then( function(response)  {

					this.userinfo = response.data.result
					this.name = this.userinfo.first_name
					this.lastname = this.userinfo.last_name
					
					

				})
			}

		},
		created: function(){
			if(this.$cookie.get('lava-token')){
				
				
				
				this.getUserInfo()

				
			}else{				
				
				this.$router.replace('/singin')
			}

		}

	}
</script>