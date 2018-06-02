<template>

	<div class="lv-media-menu-wrap">
			
			<div class="lv-media-menu-item  lv-media-menu-icon--photo" @click="clickPhoto"><span :class="[{'lv-media-menu-item-select' : isPhotos()}]">Photos</span>
			<span class="lv-media-menu-count"> {{ PhotoCount() }}</span>

			</div>
			<div class="lv-media-menu-item lv-media-menu-icon--video" @click="clickVideo"><span :class="[{'lv-media-menu-item-select' : isVideos()}]">Videos</span>
			<span class="lv-media-menu-count"> {{ VideoCount() }}</span>
			</div>


		</div>


</template>

<script >
	module.exports = {
		data: function() {
			return {

				
				
			
				
			}
		},
		
		methods:{
			PhotoCount: function(){
				if(this.$store.state.guest === false){
					// количество фото залогиненого пользователя
					return  this.$store.state.user.photos_count
				}else{
					// количество фото пользователя у которог ов гостях
					return this.$store.state.guest.photos_count
				}
			},
			VideoCount: function(){
				if(this.$store.state.guest === false){
					// количество фото залогиненого пользователя
					return  this.$store.state.user.videos_count
				}else{
					// количество фото пользователя у которог ов гостях
					return this.$store.state.guest.videos_count
				}
			},
		
			
			isPhotos: function(){
				let query = this.$route.fullPath
				
				if(query[1] === 'm' || query[1]=== 'a'){
					return true;
				}else{
					return false;
				}
				
			},
			isVideos: function(){
				let query = this.$route.fullPath
				
				if(query[1] === 'v'){
					return true;
				}else{
					return false;
				}

			},
			clickVideo: function(){
				let id
				if(this.$store.state.guest === false){
					// количество фото залогиненого пользователя
					id = this.$store.state.user.id
				}else{
					// количество фото пользователя у которог ов гостях
					id = this.$store.state.guest.id
				}
				 
				let url = 'videos' + id
				this.$router.push(url)
			},
			clickPhoto: function(){
				let id
				if(this.$store.state.guest === false){
					// количество фото залогиненого пользователя
					id = this.$store.state.user.id
				}else{
					// количество фото пользователя у которог ов гостях
					id = this.$store.state.guest.id
				}
				let url = 'media' + id
				this.$router.push(url)
			},

			
		},
		created: function(){
			
			

		}

	}
</script>