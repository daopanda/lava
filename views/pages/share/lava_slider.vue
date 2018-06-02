<template>

	<div class="lv-slider" @click.self="onHide">
	<div class="lv-slider-gap" @click.self="onHide"></div>
		<div class="lv-slider-body">
			<div class="lv-slider-left">


			

				<div class="lv-slider-item" :style="getImg()" v-if="content != 'videos'">
					
					<div class="lv-slider-controls-wrap">
						<div @click="prev()" class="lv-prev"></div>
						<div @click="next()" class="lv-next"></div>
					</div>

					<div class="lv-slider-info-wrap">

						<div class="lv-slider-info-delimetr">
						<div class="lv-slider-info-likes">123</div>
						<div class="lv-slider-info-comments">{{ array[currentIndex].id}}</div>
						<div class="lv-slider-info-share">33</div>
						</div>


						<div class="lv-slider-info-more">
							<div :class="['lv-slider-info-more-drop' , { 'lv-slider-info-more-drop-GUEST' : isGuest },]">
								<div class="lv-slider-info-more-drop-body">
									<div class="lv-slider-more-delete" @click="onDelete(array[currentIndex].id, currentIndex)" > Delete photo </div>
									<div class="lv-slider-more-cover" @click="setCover" > Set as cover </div>
									<a :href="setOriginalLink" target="_blank" class="lv-slider-more-download"> Download original </a>
								</div>

							</div>

						</div>
					</div>

				</div>





					<div class="lv-slider-item"  v-if="content === 'videos'">
					
					

					<div class="lv-slider-video-container">
					<iframe v-if="isYoutube" width="100%" height="100%" :src="getUrl(firstshow)" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

					<div class="lv-slider-video-container" v-if="!isYoutube">
						<video  width="100%" height="100%" preload controls>
    						<source src="getUrl(firstshow)" />
    					
						</video>
					</div>
					</div>






					<div class="lv-slider-info-wrap">

						<div class="lv-slider-info-delimetr">
						<div class="lv-slider-info-likes">123</div>
						<div class="lv-slider-info-comments">{{ array[currentIndex].id}}</div>
						<div class="lv-slider-info-share">33</div>
						</div>


						<div class="lv-slider-info-more" v-if="$store.state.guest === false">
							<div class="lv-slider-info-more-drop-video">
								<div class="lv-slider-info-more-drop-body">
									<div class="lv-slider-more-delete-video" @click="onDelete(array[currentIndex].id, currentIndex)" > Delete photo </div>
								
								</div>

							</div>

						</div>
					</div>

				</div>

				



			</div>



			<div class="lv-slider-right">

			<div class="lv-slider-aside-owner">

				<div class="lv-slider-aside-owner-photo" :style="setPhoto">{{ getInitials}}</div>


				<div class="lv-slider-aside-owner-info-wrap">
					<div class="lv-slider-aside-owner-name">{{ getOwnerFullName}}</div>
					<div class="lv-slider-aside-owner-photo-date">9 JUN 2017 AT 12:20</div>
				</div>


				
			</div><!-- lv-slider-aside-owner -->

			<div class="lv-slider-aside-comments-wrap">
				<div class="lv-slider-aside-comment">
					


				</div>


			</div>





			<div class="lv-slider-aside-addcomment-wrap">
				<div class="lv-slider-aside-owner-photo" :style="setMyPhoto">{{ getInitials}}</div>


				
			</div>







			</div><!-- lv-slider-right -->	


		</div><!-- lv-slider-body -->	


			<div class="lv-album-popup-coverset-kill" @click.self="coverPopup = false" v-if="coverPopup">
		<div class="lv-album-popup-coverset-body">
			<span class="lv-album-popup-coverset-text">Cover photo successfully set</span>
			<div class="lv-album-popup-set-cover-close" @click="coverPopup = false"> Close</div>
			
		</div>
		
	</div>

		<div class="lv-slider-gap" @click.self="onHide"></div>
		
		
	</div>

</template>

<script >
	module.exports = {
		  props: ['array', 'firstshow', 'albumid', 'type', 'content'],
		data: function() {
			return {
				currentIndex: this.firstshow,
				isSetPhoto: false,
				comments: [],
				album_id: this.albumid,
				coverPopup: false,
				showMore: false,
				isYoutube: true,

				
			}
		},
		computed:{
			isGuest: function(){
				if(this.$store.state.guest === false){
					

					if(this.showMore === true){
						return true
					}else{
						return false;
					}

				}else{
					return true;

				}
			},
			getOwnerFullName: function(){
				if(this.$store.state.guest === false){
					return this.$store.state.user.first_name + ' ' + this.$store.state.user.last_name
				}else{
					return this.$store.state.guest.first_name + ' ' + this.$store.state.guest.last_name
				}
			},
			setOriginalLink: function(){
				return "//lava.top/"+this.array[this.currentIndex].image


			},
			setMyPhoto: function(){
				if(this.$store.state.user.image_w160 != undefined){
						this.isSetPhoto = true;
						return "background-image: url('//lava.top/" + this.$store.state.user.image_w160 + "');";
					}

			},
			setPhoto: function(){
				if(this.$store.state.guest === false){

					if(this.$store.state.user.image_w160 != undefined){
						this.isSetPhoto = true;
						return "background-image: url('//lava.top/" + this.$store.state.user.image_w160 + "');";
					}
					
				}else{

					if(this.$store.state.guest.image_w160 != undefined){
						this.isSetPhoto = true;

					return "background-image: url('//lava.top/" + this.$store.state.guest.image_w160 + "');";
					}
				}
			},
			getInitials: function(){
				if(!this.isSetPhoto){
					return 'AB';
				}
			}
		},
		methods:{


			getUrl: function(index){
				let old_url = this.array[index].video;
				let format;
				if(old_url[2] === 's'){
					this.isYoutube = false;

					return '//lava.top/'+ this.array[index].video




				}else{
					this.isYoutube = true;
					let url = this.getYoutubeVideoId(old_url);
					return 'http://www.youtube.com/embed/'+ url +'?autoplay=1'
				}
				
				

			},

			getYoutubeVideoId: function (input){
				    var r = input.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
				    if(r[2] !== undefined) {
				        return r[2].split(/[^0-9a-z_\-]/i)[0]
				    } else {
				        r = input.match(/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/)
				        if(r && r[1] !== undefined) {
				            return r[1]
				        }
				        else return input
				    }
			},


			setCover: function(){
				
				this.$http.get(this.$apistore.urls.setphotocover, {params: {
						album_id: this.album_id,
                   		photo_id: this.array[this.currentIndex].id
	                }, 
                    headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
		       		// записываем данные в память $store
		       		
		       		


		       		// POPUP COVER SET
		       		
		       		this.coverPopup = true;

			          
			        }, function(error){
	        		// Ошибка от сервера	                


				})









			},

		
			getImg: function(){
				return "background-image: url('//lava.top/"+this.array[this.currentIndex].image +"');"
				

			},
			prev: function(){

				let prevIndex = this.currentIndex - 1;
				let allCount = this.array.length;
				if(prevIndex < 0){
					this.currentIndex = allCount - 1;
					
				}else{
					this.currentIndex = prevIndex;
					
				}
				console.log(allCount + ":" + prevIndex)

			},
			next: function(){
				let nextIndex = this.currentIndex + 1;
				let allCount = this.array.length;
				if(nextIndex >= allCount){
					this.currentIndex = 0;
				}else{
					this.currentIndex = nextIndex;
				}
				console.log(allCount + ":" + nextIndex)


			},
			KeyPress: function(e){
				 var key = e.keyCode || e.which;
				 
				 if(key == 27){
				 	this.$emit('close')
				 }
			},
			onHide: function(){
				this.$emit('close')
			},
			onDelete: function(id, index){
				console.log('FROM SLIDER:' + id + ' ' + index)
				this.next();
				this.$emit('delete', id, index)
				
			}

		},
		destroy: function(){
			window.removeEventListener('keypress', this.KeyPress);
		},
		created: function(){
			window.addEventListener('keypress', this.KeyPress);
			if(this.type === 'wall'){

				this.showMore = true
			}
			
		}

	}
</script>