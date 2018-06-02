<template>
	
	<div class="lv-album-wrapper">


		<div v-if="popupDelete" class="lv-albums-add--popup-wrap" >
			<div class="lv-albums-add-popup-body">

				<div v-if="popupDelete" class="lv-album-delete-popup--wrapper">

					<div class="lv-album-delete-popup--img"></div>
					<div class="lv-album-delete-poup--title">
					Delete album
						
					</div>
					<p class="lv-album-delete-popup--text">Are you sure you want to delete video "{{deleteVideoTargetName}}"?</p>

					<div class="lv-album-delete-popup-buttons-wrap">
							
					<span class="lv-album-delete-popup-cancel" @click="closeDeletePopup">cancel</span>
					<span class="lv-album-delete-popup-confirm" @click="deleteVideoConfirm">Yes, delete</span>
					</div>


			</div>




			</div><!--lv-albums-add-body -->

		</div><!--lv-albums-add popup-wrap -->





















		<span class="lv-albums-back" @click="backtoWall"> Back</span>
		 

		 <div class="lv-album-view-title-wrap">
		 
		 	<div class="lv-album-view-titlendesc-wrap">
		 		<div class="lv-album-view-title">Videos</div>
		 		<div class="lv-album-view-desc"></div>
		 	</div><!-- lv-album-view-titlendesc-wrap -->


		 	


		 </div><!-- lv-album-view-title-wrap -->

		 <div class="lv-albums--wrapper" >

		 <div>
			<div class="lv-album-item--wrap lv-darg-item" v-for="(video, index) in videos"  :index="index" >
			
				


				<div class="lv-album-item--img" :style="setVideoCover(video.cover)" @click.self="">

				
				<div class="lv-album-item--quickctrl" @click.self="showSlider(index)" >

					<div  @click="deletePopupVideo(video.id, index)" class="lv-album-item-delete"></div>	

					

				</div>

					
				</div>


				<div class="lv-album-item--title" @click="">{{video.title }}</div>
				<div class="lv-album-item--desc" @click="" v-html="VideoDescToBr(video.description)"></div>

			</div>

		</div>
		 </div>

	<lava-slider   v-if="SliderFlag" @close="SliderClose" :firstshow="VideoIndex" :array="videos" @delete="photoDeletePopup(id, index)" content="videos">
		

	</lava-slider>


	</div>

</template>

<script >
	module.exports = {

		data: function() {
			return {
				videos: [],
				SliderFlag: false,
				popupDelete: false,
				deleteVideoTargetName: '',
				deleteVideoTargetIndex: 0,
				
			}
		},
		computed:{
		
		},
		methods:{
			SliderClose: function(){
				this.SliderFlag = false;
				window.removeEventListener('keypress', this.KeyPress);
			},
			KeyPress: function(e){
				 var key = e.keyCode || e.which;
				 
				 if(key == 27){
				 	this.SliderClose()
				 	this.closeDeletePopup()
				 }
			},
			showSlider: function(VideoIndex){
				this.SliderFlag = true;
				this.VideoIndex = VideoIndex;
				window.addEventListener('keypress', this.KeyPress);

			},


			closeDeletePopup: function(){
				this.popupDelete = false;
				window.removeEventListener('keypress', this.KeyPress);
			},

			deletePopupVideo: function(video_id, index){
				
				this.deleteVideoTarget = video_id;
				this.deleteVideoTargetName = this.videos[index].title;
				this.popupDelete = true;
				this.deleteVideoTargetIndex = index;
				window.addEventListener('keypress', this.KeyPress);

			},
			deleteVideoConfirm: function(){
				// запрос на сервер


				this.$http.get(this.$apistore.urls.videosdelete, {params: {
                   		id: this.deleteVideoTarget,
                   		
	                }, 
                    headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
		       		// записываем данные в память $store
		       		this.videos.splice(this.deleteVideoTargetIndex, 1);
		       		this.closeDeletePopup()
		       		


		          				          
			        }, function(error){
	        		// Ошибка от сервера	                


				})



			},
			backtoWall: function(){
				let current_url = this.$router.history.current.path;


				let id = this.$route.params.id;

				if(id != undefined){
					let url =  '/id' + id
					this.$router.push({path: url});
				}else{
					this.$router.push({path: '/'});
				}
				

			},
			getVideo: function(){
				var user_id = ''
				if(this.$store.state.guest === false){
					user_id = this.$store.state.user.id
				}else{
					user_id = this.$store.state.guest.id
				}

				console.log('VIDEOS ID' + user_id)

				this.$http.get(this.$apistore.urls.videosget, {params: {
                   		user_id: user_id,
                   		
	                }, 
                    headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
		       		// записываем данные в память $store
		       		
		       		this.videos = response.data.result.items;

		       		

		       		

		          				          
			        }, function(error){
	        		// Ошибка от сервера	                


				})
			},

			VideoDescToBr: function(str){
				if(str != undefined){
				console.log(str)
				let string = str.replace(/\r\n|\r|\n/g,"<br>");
				return string
				}
				
			},
			setVideoCover: function(cover_url){
				console.log('COVER' +cover_url)
				if(cover_url[0] === 'h'){


				let url = '//lava.top/' + cover_url
				return 'background-image: url("'+ url + '") !important; background-size:cover !important;'
				}else{
					return '';
				}

			},

			
		},
		created: function(){
			this.getVideo()
		}

	}
</script>