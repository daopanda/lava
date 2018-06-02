<template>
<div class="lv-settings-content--wrapper">
		<h2 class="lv-settings-content--title">Blacklist</h2>
		

		<div class="lv-settings-blacklist-scroll"  v-infinite-scroll="loadMore" nfinite-scroll-disabled="busy" >

		<div class="lv-settings-blacklist-item" v-for="(user, index) in blacklist">

				<div :class="setAvatarClass(user.image_w160)" :style="setAvatarStyle(user.image_w160)">
					{{ setAvatarSymbols(user.first_name,user.last_name) }}
					
				</div>

				<div class="lv-settings-blacklist-name">
					
				{{user.first_name}} {{user.last_name }}
				</div>

				<div class="lv-settings-blacklist-button" @click="deleteFromBL(user.id, index)">
					delete

				</div>
		</div><!--lv-settings-blacklist-item -->

		</div>

</div><!--lv-settings-content--wrapper  -->
		

</template>


<script >
	module.exports = {
		data: function() {
			return {
				blacklist: [],
				busy: false,
				count:0,
			}
		},
		methods:{
			getList: function(){
				this.$http.get(this.$apistore.urls.getblacklist, {params: {
				       	count: '10'
				       }, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {	



				       	this.blacklist = response.data.result.items
						this.count = response.data.result.count
				       	


				        }, function(error){
				        	console.log(error)

				        })
			},
			deleteFromBL: function(user_id, index){

				
				this.$http.get(this.$apistore.urls.deleteblacklist, {params: {
				       	user_id: user_id
				       }, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {	

				       	this.blacklist.splice(index, 1)

				       	 
						
				       	


				        }, function(error){
				        	console.log(error)

				        })

			},
			loadMore: function(evt){

				let offset = this.blacklist.length;
				console.log(this.blacklist)
				console.log('asas'+offset)
				this.busy = true;
				let temp_offset = offset ;
				

				if(offset < this.count   ){


				this.$http.get(this.$apistore.urls.getblacklist, {params: {
						count: '10',
				       	offset: offset
				       }, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {	

				       this.blacklist =	this.blacklist.concat(response.data.result.items)
				       	this.busy = false;
				       	 
						
				       	


				        }, function(error){
				        	console.log(error)

				        })

				}

				this.busy = false;

			},
			setAvatarClass: function(image_url){
				let base_class = 'lv-avatar-small'
				let random = Math.round(Math.random() * (10 - 1)) + 1;
				
				if(image_url === null){

					return base_class + ' ' + 'lv-avatar-random-bg--' + random 

				}else{
				// временно устаналивает урл для изображения

					return base_class
				}
				
			},
			setAvatarStyle: function(image_url){
				let url = '//lava.top/' + image_url

				if(image_url === null || image_url === undefined){

					return ''

				}else{
				// временно устаналивает урл для изображения
					  
					return 'background-image: url("'+ url + '");'
				}
				
			},
			setAvatarSymbols: function(name,last_name){
				return name.slice(0, 1) + last_name.slice(0, 1)
			},



		},
		created: function(){
			this.getList()
		}

	}
</script>