<template>

	<div class="lv-wall-wrapper">
	<lava-slider   v-if="SliderFlag" @close="SliderClose" :firstshow="PhotoIndex" :array="photos" type="wall" @delete="photoDeletePopup(id, index)" >
		
	</lava-slider>


		<div class="lv-wall-album-view--wrapper">
		<router-link :to="{path: toMedia}" class="lv-wall-albums--title" >Photo and video
		</router-link>





		</div>

		<div class="lv-wall-album-view"  :style="reset">
		<div class="lv-photo-gallery-wrap">
			<div  v-for="(photo, index) in photos" class="lv-photo-gallery-item" :style="generateStyleFirst(photo)" :index="index" @click.self="showSlider(index)">
      			<i class="lv-photo-gallery-subitem" :style="generateStyleSecond(photo)" @click.self="showSlider(index)"></i>
      		
      			<img class="lv-photo-gallery-img" :src="getSrc(photo.image_h176)" alt="" @click.self="showSlider(index)">
   			</div>
   			</div>





		

		</div>
		 
		<div class="lv-wall-nophotos-wrap" v-if="PhotoCount">

		 NO PHOTOS


		
		</div>






	</div>

</template>

<script >
	module.exports = {
		data: function() {
			return {
				SliderFlag: false,
				PhotoIndex: 0,
				photos: [],
				PhotoCount:false,
				galleryClasses: {
					'lv-album-view-photos-wrap' : true,
					 'lv-album-view-photos-grid' : true,
					 

				},
				
			}
		},
		computed:{
			reset: function(){
				if(this.$store.state.guest === false){
					this.getPhotos()
				}else{
					this.getPhotos()
				}

			},
			toMedia: function(){
				if(this.$store.state.guest === false){
					return '/media' + this.$store.state.user.id;
				}else{
					return '/media' + this.$store.state.guest.id;
				}
			}
		},
		methods:{
			getSrc: function (image){

				return "//lava.top/" + image;

			},

			generateStyleFirst: function(image){
				let image_h = 176
				let width = image.width
				let height = image.height
				let currentWidth = (width * image_h) / height
				


				return 'width:'+(currentWidth*150/image_h)+'px;flex-grow:'+(currentWidth*150/image_h)+';';
			},
			generateStyleSecond: function(image){
				let image_h = 176
				let width = image.width
				let height = image.height
				let currentWidth = (width * image_h) / height
				return 'padding-bottom:'+(image_h/currentWidth*100)+'%;';
			},
			showSlider: function(photoIndex){
				this.SliderFlag = true;
				this.PhotoIndex = photoIndex;
				  window.addEventListener('keypress', this.KeyPress);
				


			},
			KeyPress: function(e){
				 var key = e.keyCode || e.which;
				 console.log(key)
				 if(key == 27){
				 	this.SliderClose()
				 }
			},
			SliderClose: function(){
				this.SliderFlag = false;
				window.removeEventListener('keypress', this.KeyPress);
			},
		

			setImage: function(url){

				return "background-image: url('//lava.top/" + url + "');"
				
				
			},
			getPhotos: function(){

				let userid
				if(this.$store.state.guest === false){
					// количество фото залогиненого пользователя
					userid = this.$store.state.user.id
				}else{
					// количество фото пользователя у которог ов гостях
					userid = this.$store.state.guest.id
				}
				 
				

				
				
				// Запрос к серверу                
					this.$http.get(this.$apistore.urls.getalbum, {params: {
                   		user_id: userid,
                   		count: 6
                   		
	                }, 
                    headers: {'X-Auth-Token': this.$apistore.token}}).then((res) => {
							
									
									if(res.data.message === 'need_login'){
										console.log('NEED_LOGIN')
										this.$cookie.delete('lava-token')
										 this.$router.replace('/singin');

									}else{
										console.log('WALL PHOTOS')

	  									this.photos = res.data.result.items

										
										
									}	

					        
					}, function(error){

					        	console.log(error)

					});
			}
		},
		created: function(){
			this.getPhotos()
		}

	}
</script>