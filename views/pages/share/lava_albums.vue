<template>

	<div class="lv-photovideo--wrapper">


		<div v-if="albumpopup" class="lv-albums-add--popup-wrap" >
			<div class="lv-albums-add-popup-body">
			<div v-if="popuptarget === 'add' ">
				<div class="lv-albums-add-popup-title-wrap">
					<span class="lv-album-add-popup-title">Create album</span>
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
                 	<div class="lv-album-add-popup-create" @click="createAlbum">Create album</div>
                </div><!-- lv-album-add-popup-buttons wrap -->

				</div><!-- lv-album-add form -->
			</div>
				


			<div v-if="popuptarget === 'delete' " class="lv-album-delete-popup--wrapper">

					<div class="lv-album-delete-popup--img"></div>
					<div class="lv-album-delete-poup--title">
					Delete album
						
					</div>
					<p class="lv-album-delete-popup--text">Are you sure you want to delete album "{{deleteAlbumTargetName}}"?</p>

					<div class="lv-album-delete-popup-buttons-wrap">
							
					<span class="lv-album-delete-popup-cancel" @click="closeAddPopup">cancel</span>
					<span class="lv-album-delete-popup-confirm" @click="deleteAlbumConfirm">Yes, delete</span>
					</div>


			</div>




			</div><!--lv-albums-add-body -->

		</div><!--lv-albums-add popup-wrap -->






		<span class="lv-albums-back" @click="backtoWall"> Back</span>
		<div class="lv-albums-title-wrapper">

		<span class="lv-albums--title">Albums</span>

		

		<div class="lv-albums--add-album-button" @click="openAddPopup()" v-if="$store.state.guest === false ">Add album</div>

			
		</div><!-- END lv-albums-title-wrapper -->
		<div class="lv-albums--wrapper" >

		
		<draggable v-model="albums" :options="dragOptions" @end="onEnd" >


			<div class="lv-album-item--wrap lv-darg-item" v-for="(album, index) in albums"  :index="index" >
			
				


				<div class="lv-album-item--img" :style="setAlbumCover(album.cover)" @click.self="gotoAlbum(album.id)">

				
				<div class="lv-album-item--quickctrl" @click.self="gotoAlbum(album.id)" >

					<div v-if="album.is_delete === 1" @click="deletePopupAlbum(album.id, index)" class="lv-album-item-delete"></div>	

					<div class="lv-album-item-insidecount">{{album.count_photos}}</div>

				</div>

					
				</div>


				<div class="lv-album-item--title" @click="gotoAlbum(album.id)">{{ album.title }}</div>
				<div class="lv-album-item--desc" @click="gotoAlbum(album.id)" v-html="albumDescToBr(album.description)"></div>

			</div>


			</draggable>



		</div><!-- END lv-albums wrapper -->
		<!-- <div class="lv-albums-show-all-button">
		SHOW ALL ALBUMS
		</div>-->





		




















	</div><!-- END lv-photovideo wrapper -->

</template>

<script >
	module.exports = {
		data: function() {
			return {
				selectText: 'Nobody',
				showPrivacydropdown: false,
				albumpopup: false,
				createalbum_name: '',
				createalbum_desc: '',
				createalbum_privacy: 'none',
				albums: [],
				popuptarget: 'add',
				deleteAlbumTarget: '',
				deleteAlbumTargetIndex: '',
				deleteAlbumTargetName: '',
				dragOptions: {
					draggable:'.lv-darg-item',
					sort: true,
					disabled: this.$store.state.guest === false ? false : true 
					}
				
				
			}

		},
		computed:{
			

		},
		methods:{
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
			albumDescToBr: function(str){
				if(str != undefined){
				console.log(str)
				let string = str.replace(/\r\n|\r|\n/g,"<br>");
				return string
				}
				
			},
			openAddPopup: function(){
				this.popuptarget= 'add';
				this.albumpopup = true;
				window.addEventListener('keypress', this.KeyPress);
			},
			closeAddPopup: function(){
				this.albumpopup = false;
				window.removeEventListener('keypress', this.KeyPress);
			},
			KeyPress: function(e){
				 var key = e.keyCode || e.which;
				 console.log(key)
				 if(key == 27){
				 	this.closeAddPopup()
				 }
			},
			setSelect: function(text){
					this.selectText = text			
					
   					if(text === 'Nobody') {
   						this.createalbum_privacy = 'none';
   					}else if(text === 'Only followers'){
   						this.createalbum_privacy = 'friends';
   					}else if(text === 'Eventyone'){
   						this.createalbum_privacy = ' all';
   					}     					     			
      				
					this.showPrivacydropdown = false;
			},
			createAlbum: function(){



				this.$http.get(this.$apistore.urls.createalbum, {params: {
                   		title: this.createalbum_name,
                   		description: this.createalbum_desc,
                   		privacy: this.createalbum_privacy
	                }, 
                    headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
		       		// записываем данные в память $store
		       		
		       		console.log(response.data)



		       		this.albums.splice(0, 0, response.data.result)



		          	// убираем прелоадер
		          	this.sendPreloader = false  			          
			        }, function(error){
	        		// Ошибка от сервера	                


				})

                    this.closeAddPopup()
			},
			setAlbumCover: function(cover_url){
				console.log('COVER' +cover_url)
				if(cover_url[0] === 'h'){


				let url = '//lava.top/' + cover_url
				return 'background-image: url("'+ url + '") !important; background-size:cover !important;'
				}else{
					return '';
				}

			},
			deletePopupAlbum: function(album_id, index){
				this.popuptarget = 'delete';
				this.deleteAlbumTarget = album_id;
				this.deleteAlbumTargetName = this.albums[index].title;
				this.albumpopup = true;
				  window.addEventListener('keypress', this.KeyPress);
				this.deleteAlbumTargetIndex = index;
				

			},
			deleteAlbumConfirm: function(){
				// запрос на сервер


				this.$http.get(this.$apistore.urls.deletealbums, {params: {
                   		id: this.deleteAlbumTarget,
                   		
	                }, 
                    headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
		       		// записываем данные в память $store
		       		this.albums.splice(this.deleteAlbumTargetIndex, 1);
		       		this.closeAddPopup()
		       		


		          				          
			        }, function(error){
	        		// Ошибка от сервера	                


				})



			},
			gotoAlbum: function(album_id){
					let url = '/album' + album_id;
					this.$router.push(url)
				
				
			},
			getAlbums: function(){
				var user_id = ''
				if(this.$store.state.guest === false){
					user_id = this.$store.state.user.id
				}else{
					user_id = this.$store.state.guest.id
				}

				console.log('ALBUMS ID' + user_id)

				this.$http.get(this.$apistore.urls.getalbums, {params: {
                   		user_id: user_id,
                   		count: '4',
                   		
	                }, 
                    headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
		       		// записываем данные в память $store
		       		
		       		this.albums = response.data.result.items;

		       		//response.data.result.items.map((value, key)=>{
				         		// сортировка новых данных

				        // 		if(value.is_delete != 1){
				         //			this.albums.push(value)
				         //		}
     							

   							//})

		       		

		          				          
			        }, function(error){
	        		// Ошибка от сервера	                


				})
			},
			// Element dragging ended
			onEnd: function (/**Event*/evt) {
				//var itemEl = evt.item;  // dragged HTMLElement
				//evt.to;    // target list
				//evt.from;  // previous list
				//evt.oldIndex;  // element's old index within old parent
				//evt.newIndex;  // element's new index within new parent
				let newIndex = evt.newIndex;
				let itemsCount = this.albums.length;
				let current_id = this.albums[newIndex].id
				let before = false;
				let after = false;

				if((newIndex - 1) >= 0){
					console.log(this.albums[newIndex - 1].id)
					after = this.albums[newIndex - 1].id
				}

				if((newIndex + 1) < itemsCount){
					console.log(this.albums[newIndex + 1].id)
					before = this.albums[newIndex + 1].id
				}


				// отправка на сервер


				this.$http.get(this.$apistore.urls.sortalbums, {params: {
                   		id: current_id,
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
				this.getAlbums()
				console.log('ALBUMS CREATED')
			}

	}
</script>