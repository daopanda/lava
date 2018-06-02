<template>
	
	<div :class="['lv-album-wrapper', {'lv-album-embed' : embed === 'true'}]" >










		<div v-if="albumpopup" class="lv-albums-add--popup-wrap" >
			<div class="lv-albums-add-popup-body">
			<div v-if="popuptarget === 'add' ">
				<div class="lv-albums-add-popup-title-wrap">
					<span class="lv-album-add-popup-title">Edit album</span>
					<span class="lv-albums-add-popup--close" @click="closeAddPopup"></span>
				</div><!-- lv-albums-add-popup-title-wrap -->


				<div class="lv-album-add-popup--form">			



				<div class="lv-album-add-popup--input">

                        <label class="lv-album-add-popup--label" for="album_name_input">name</label> 

                            <input  v-model="createalbum_name" type="text" name="name" placeholder="Add album name" class="lv-album-add-popup--form-input"  maxlength="80" id="album_name_input" >                        

                </div><!-- lv-album-add-popup input-->



                <div class="lv-album-add-popup--input">

                        <label class="lv-album-add-popup--label" for="">description</label> 
   

                            <textarea  maxlength="255" v-model="createalbum_desc" style="min-height: 5em;" placeholder="Add album description" class="lv-album-add-popup--form-input" ></textarea>                     

                </div><!-- lv-album-add-popup input -->


                <div :class="[{ 'lv-settings-select--dropdownShow': showPrivacydropdown }, 'lv-albums-select--wrap' ] ">

                <label class="lv-settings-content--label">Who can see this album</label>
                	<div class="lv-settings-content-select" 
                	@click="showPrivacydropdown = !showPrivacydropdown" >{{ selectText }}</div>

                	<div class="lv-settings-content-dropdown" >
								<div class="lv-settings-content-dropdown-wrap" >
									<div class="lv-settings-content-dropdown-item" @click="setSelect('Nobody')">
										Nobody
									</div>
									<div class="lv-settings-content-dropdown-item" @click="setSelect('Only followers')">
										Only followers
									</div>
									<div class="lv-settings-content-dropdown-item" @click="setSelect('Eventyone')">
										Eventyone
									</div>

								</div>
							</div>
                </div><!-- lv-albums-select wrap -->

                <div class="lv-album-add-popup-buttons--wrap">
               		<span class="lv-album-add-popup-cancel" @click="closeAddPopup">cancel</span>
                 	<div class="lv-album-add-popup-create" @click="saveAlbum">Save album</div>
                </div><!-- lv-album-add-popup-buttons wrap -->

				</div><!-- lv-album-add form -->
			</div>
				






			</div><!--lv-albums-add-body -->

		</div><!--lv-albums-add popup-wrap -->









































		<span class="lv-albums-back" @click="backtoAlbums" v-if="embed === 'false'"> Back</span>
		 

		 <div class="lv-album-view-title-wrap" v-if="embed === 'false'">
		 
		 	<div class="lv-album-view-titlendesc-wrap" >
		 		<div class="lv-album-view-title">{{ album.title}}</div>
		 		<div class="lv-album-view-desc" v-html="albumDescToBr(album.description)"></div>
		 	</div><!-- lv-album-view-titlendesc-wrap -->


		 	<div class="lv-album-view-buttons-wrap">
		 	<div class="lv-album-view-editbutton" @click="openAddPopup()">Edit album</div>
		 	<div class="lv-album-view-addphoto">
		 	 add photo
		 	 <input type="file" name="myfile" class="lv-album-addphoto-ipt" @change="processFile($event)" accept="image/jpeg,image/png" multiple />

		 	</div>
		 	</div>






		 </div><!-- lv-album-view-title-wrap -->


		  <div class="lv-album-view-title-wrap" v-if="embed === 'true'">
		 
		 	<div class="lv-album-view-titlendesc-wrap" >
		 		<div class="lv-album-view-title">All Photos</div>
		 		
		 	</div><!-- lv-album-view-titlendesc-wrap -->


		 	<div class="lv-album-view-buttons-wrap">
		 	
		 	<div class="lv-album-view-addphoto">
		 	 add photo
		 	 <input type="file" name="myfile" class="lv-album-addphoto-ipt" @change="processFile($event)" accept="image/jpeg,image/png" multiple />

		 	</div>
		 	</div>






		 </div><!-- lv-album-view-title-wrap -->


		 <div v-if="!photocount && embed === 'false'" class="lv-album-nophotos" >
		 			<p class="lv-album-nophotos-text">There are no photos yet</p>

		 			<div class="lv-album-nophotos-editbutton" @click="openAddPopup()" v-if="$store.state.guest === false">Edit album</div>

		 </div>



		  <div v-if="!photocount && embed === 'true'" class="lv-album-nophotos" >
		 			<p class="lv-album-nophotos-text">There are no photos yet</p>

		 			

		 </div>


		
		 <div :class="galleryClasses" v-if="photocount && embed === 'false'">
		 <draggable v-model="photos" :options="dragOptions" @end="onEndDrag"  @start="onStartDrag" class="lv-photo-gallery-wrap">

		 	
		 	

		 		
    		<div  v-for="(photo, index) in photos" class="lv-photo-gallery-item" :style="generateStyleFirst(photo)" :index="index" @click.self="showSlider(index)">
      			<i class="lv-photo-gallery-subitem" :style="generateStyleSecond(photo)" @click.self="showSlider(index)"></i>
      			<div class="lv-photo-gallery-delete-button" @click.self="photoDeletePopup(photo.id,index)"></div>
      			<img class="lv-photo-gallery-img" :src="getSrc(photo.image_h176)" alt="" @click.self="showSlider(index)">
   			</div>
  				
		 
		


		</draggable>

		 </div>













 






























<div class="lv-album-view-photo-popupwrapper" v-if="photo_poup_delete" @click.self="photoDeletePopupClose()">

		<div class="lv-album-view-photo-body" >

			<div  class="lv-album-delete-popup--wrapper">

					<div class="lv-album-delete-popup--img"></div>
					<div class="lv-album-delete-poup--title">
					Delete photo
						
					</div>
					<p class="lv-album-delete-popup--text">Are you sure you want to delete this photo ?</p>

					<div class="lv-album-delete-popup-buttons-wrap">
							
					<span class="lv-album-delete-popup-cancel" @click="photoDeletePopupClose()">cancel</span>
					<span class="lv-album-delete-popup-confirm" @click="photoDelete()">Yes, delete</span>
					</div>


			</div>
			
		</div>
	
</div>






	<lava-slider   v-if="SliderFlag" @close="SliderFlag = false" :firstshow="PhotoIndex" :array="photos" @delete="photoDeletePopup" :albumid="albumid">
		

	</lava-slider>









	</div>

</template>

<script >
	module.exports = {
		 props: ['embed'],
		data: function() {
			return {

				SliderFlag: false,
				PhotoIndex: 0,
				galleryClasses: {
					'lv-album-view-photos-wrap' : true,
					 'lv-album-view-photos-grid' : true,
					 'lv-album-view-photos-gridDrag' : false

				},
				
				photo_poup_delete: false,
				deletePhotoTargetId: '',
				deletePhotoIndex: '',
				photos: [],
				album: this.$store.state.albumview,
				albumid: '',
				formData: '',
				selectText: 'Nobody',
				showPrivacydropdown: false,
				albumpopup: false,
				createalbum_name: '',
				createalbum_desc: '',
				createalbum_privacy: '',
				popuptarget: 'add',
				grid_counter: 0,
				grid_forthree: 1,
				two_or_one: true,
				photocount: false,
				dragOptions: {
					draggable:'.lv-photo-gallery-item',
					sort: true,
					disabled: this.$store.state.guest === false ? false : true,
					
					
					chosenClass: ".lv-album-view-photo-item-choise",
					}

				
			}
		},
		computed:{
			gridSetter: function(){
				
				
			}
		},
		methods:{

			generateStyleFirst: function(image){
				let image_h = 176
				let width = image.width
				let height = image.height
				let currentWidth = (width * image_h) / height
				


				return 'width:'+(currentWidth*120/image_h)+'px;flex-grow:'+(currentWidth*120/image_h)+';';
			},
			generateStyleSecond: function(image){
				let image_h = 176
				let width = image.width
				let height = image.height
				let currentWidth = (width * image_h) / height
				return 'padding-bottom:'+(image_h/currentWidth*100)+'%;';
			},
			getSrc: function (image){

				return "//lava.top/" + image;

			},

			showSlider: function(photoIndex){
				this.SliderFlag = true;
				this.PhotoIndex = photoIndex;


			},
			KeyPress: function(e){
				 var key = e.keyCode || e.which;
				 console.log(key)
				 if(key == 27){
				 	this.photoDeletePopupClose()
				 	this.closeAddPopup()
				 }
			},
			photoDeletePopupClose: function(){
				this.photo_poup_delete = false;
				window.removeEventListener('keypress', this.KeyPress);
			},
			photoDeletePopup: function (id, index){
				console.log(id + ":" + index + " ALBUM")
				this.deletePhotoTargetId = id;
				this.deletePhotoIndex = index;
				console.log(this.deletePhotoTargetId)
				this.photo_poup_delete = true;
				window.addEventListener('keypress', this.KeyPress);


			},
			photoDelete: function (id, index){
				let photoid
				if(id === undefined){
					photoid = this.deletePhotoTargetId;
				}else{
					photoid = id;
				}


				let photoIndex
				if(index === undefined){
					photoIndex = this.deletePhotoIndex;
				}else{
					photoIndex = index;
				}


				console.log('DELETE ID: ' + photoid)
				 
				let albumid = this.photos[photoIndex].album_id;
				 

				this.$http.get(this.$apistore.urls. deletephoto, {params: {
                   		
                   		album_id: albumid,
                   		photo_id: photoid
	                }, 
                    headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
		       		// записываем данные в память $store
		       		
		       		

		       		this.photos.splice(photoIndex, 1)      		
		       		
		       		this.$store.commit('photocount_decrese')
		          	// убираем прелоадер
		          	this.photo_poup_delete = false;			          
			        }, function(error){
	        		// Ошибка от сервера	                


				})



			},			
			lookPhoto: function(index){

			},
			setImage: function(url){

				return "background-image: url('//lava.top/" + url + "');"
				
				
			},
			processFile: function(event){
				
				let formData = new FormData();	


				for( var i = 0; i < this.photos.length; ++i){
					console.log(this.photos[i].id)
				}	
				
				var index;
				console.log(this.album.id + " SET NOW ALBUM ID")
				if(this.embed === 'false'){
					formData.append('album_id', this.album.id)
				}else{
					
				}
				console.log(formData.get('album_id'))



				for (index = 0; index < event.target.files.length; ++index) {

					formData.append('image', event.target.files[index])

					console.log(formData)

					this.$http.post(this.$apistore.urls.photosupload, formData,{headers: {'X-Auth-Token': this.$apistore.token}}, {emulateJSON: true}).then( function(response)  {        


						console.log(this.photos)

							
								this.photos.unshift(response.data.result);
								this.photocount = true;
								this.$store.commit('photocount_increse')
							
                            
							console.log(this.photos)
                        
							for( var i = 0; i < this.photos.length; ++i){
							console.log(this.photos[i].id)
						}	
				
    
                            console.log(response)
                            

                        }, function(error){
                             // Ошибка от сервера                   
                             console.log(error)

                        });



    			
				}




				
				

			


             
			





                },
			openAddPopup: function(){
				this.popuptarget= 'add';
				this.albumpopup = true;
				this.createalbum_name = this.album.title
				this.createalbum_desc = this.album.description
				this.createalbum_privacy = this.album.privacy
				window.addEventListener('keypress', this.KeyPress);
				console.log(this.selectText )
				console.log(this.createalbum_privacy)

				if(this.createalbum_privacy === 'none') {

   						this.selectText = 'Nobody';

   					}else if(this.createalbum_privacy === 'following'){

   						this.selectText  = 'Only followers';

   					}else if(this.createalbum_privacy === 'all' ){

   						this.selectText = 'Eventyone';

   					}     		


				
			},
			closeAddPopup: function(){
				window.removeEventListener('keypress', this.KeyPress);
				this.albumpopup = false;
			},

			setSelect: function(text){
					this.selectText = text			
					console.log(this.selectText )
   					if(text === 'Nobody') {
   						this.createalbum_privacy = 'none';
   					}else if(text === 'Only followers'){
   						this.createalbum_privacy = 'following';
   					}else if(text === 'Eventyone'){
   						this.createalbum_privacy = 'all';
   					}     			

      				console.log(this.createalbum_privacy)
					this.showPrivacydropdown = false;
			},
			saveAlbum: function(){

				console.log(this.createalbum_privacy)

				this.$http.get(this.$apistore.urls.editalbums, {params: {
						id: this.album.id,
                   		title: this.createalbum_name,
                   		description: this.createalbum_desc,
                   		privacy: this.createalbum_privacy
	                }, 
                    headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
		       		// записываем данные в память $store
		       		
		       		console.log(response.data)



		       		this.album = response.data.result



		          	// убираем прелоадер
		          	this.sendPreloader = false  			          
			        }, function(error){
	        		// Ошибка от сервера	                


				})

                    this.closeAddPopup()
			},






			albumDescToBr: function(str){
				if(str != undefined){
				console.log(str)
				let string = str.replace(/\r\n|\r|\n/g,"<br>");
				return string
				}
				
			},
			getAllPhotos: function(){

				let userid 

				if(this.$store.state.guest === false){
					userid  = this.$store.state.user.id
				}else{
					userid  = this.$store.state.guest.id
				}

				
				// Запрос к серверу                
					this.$http.get(this.$apistore.urls.getalbum, {params: {
                   		user_id: userid,
                   		
	                }, 
                    headers: {'X-Auth-Token': this.$apistore.token}}).then((res) => {
							
									
									if(res.data.message === 'need_login'){
										console.log('NEED_LOGIN')
										 this.$router.replace('/singin');

									}else{
										if( res.data.result.count === 0){
											this.photocount = false


										}else{
											this.photocount = true
											this.photos = res.data.result.items;

											
										}

										
									}	

					        
					}, function(error){

					        	console.log(error)

					});








			},
			getAlbumPhotos: function(){
				this.albumid = this.$route.params.id
				console.log(this.albumid)
				// Запрос к серверу                
					this.$http.get(this.$apistore.urls.getalbum, {params: {
                   		album_id: this.albumid,
                   		
	                }, 
                    headers: {'X-Auth-Token': this.$apistore.token}}).then((res) => {
							
									
									if(res.data.message === 'need_login'){
										console.log('NEED_LOGIN')
										 this.$router.replace('/singin');

									}else{
										if( res.data.result.count === 0){
											this.photocount = false


										}else{
											this.photocount = true
											this.photos = res.data.result.items;
											
										}

										
									}	

					        
					}, function(error){

					        	console.log(error)

					});

			},
			backtoAlbums: function(){
				
				if(this.$store.state.guest === false){
					let url = '/media' + this.$store.state.user.id
					this.$router.push({path: url});
					
				}else{

					let url = '/media' + this.$store.state.guest.id
					this.$router.push({path: url});
				}
			},
			onStartDrag: function(evt){


				this.galleryClasses = {
					'lv-album-view-photos-wrap' : true,
					 'lv-album-view-photos-grid' : false,
					 'lv-album-view-photos-gridDrag' : true

				}



			},
			onEndDrag: function(evt){
				
				let newIndex = evt.newIndex;
				let itemsCount = this.photos.length;
				let current_id = this.photos[newIndex].id
				let before = false;
				let after = false;
				let album_id = this.albumid;


				if((newIndex - 1) >= 0){
					console.log(this.photos[newIndex - 1].id)
					after = this.photos[newIndex - 1].id
				}

				if((newIndex + 1) < itemsCount){
					console.log(this.photos[newIndex + 1].id)
					before = this.photos[newIndex + 1].id
				}





				this.galleryClasses = {
					'lv-album-view-photos-wrap' : true,
					 'lv-album-view-photos-grid' : true,
					 'lv-album-view-photos-gridDrag' : false

				},


				// отправка на сервер


				this.$http.get(this.$apistore.urls.sortphoto, {params: { 		
                   		album_id: album_id,
                   		photo_id: current_id,
                   		before: before ? before : '',
                   		after: after ? after : ''
                   		
	                }, 
                    headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
		       		// записываем данные в память $store
		       		
		       		

		          				          
			        }, function(error){
	        		// Ошибка от сервера	                


				})


				console.log('ENDDRAG NEW INDEX  '+ evt.newIndex + '')
			},














			
		},
		created: function(){
			
			if(this.embed === 'true'){
				this.getAllPhotos()
			}else{
				this.getAlbumPhotos()
			}
		}

	}
</script>