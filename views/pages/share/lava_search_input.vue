<template>

			<form class="lv-search">

			<input type="text" class="lv-search--input icn-search--bg" name="search" :placeholder="placeHolder" maxlength="30" v-model="query" @keyup="changeQuery" ref="mainSearch" :resulttype="SearchType">
			


			<div class="lv-search-popup-off"  @click="popupOff" v-if="popup" ></div>

			<div class="lv-search-popup--result" v-if="popup" v-click-outside="onClickOutside">
			


				<div class="lv-search-popup--result-title-wrap"  >
					<span class="lv-search-popup--result-title">{{ setTitle  }} </span>
					<span  class="lv-search-popup--result-title-filter-button" @click="fullSearch"></span>
				</div>



				<preloader v-if="preload"></preloader>				




				<div class="lv-search-popup-result--wrapper" v-if="showresult" >
					<div class="lv-search-popup-result-recommend--wrap" v-if="searchrecommend.length > 0">
						<span class="lv-search-popup-result--title" >Recommend</span>
						<div class="lv-search-popup-result--content" v-for="(user, index) in searchrecommend">				
							<router-link :to="{path: '/id'+ user.id}" @click.native="popupOff" style="text-decoration: none;" replace>
							<div :class="setAvatarClass(user.image_w320)" :style="setAvatarStyle(user.image_w320)" >
								
								{{ setAvatarSymbols(user.first_name,user.last_name) }}

							</div>
							</router-link>

							<div class="lv-search-popup-result--fullname-wrap">

							<router-link @click.native="popupOff" :to="{path: '/id'+ user.id}" class="lv-search-popup-result--firstname" replace>{{user.first_name}} </router-link>
							<router-link @click.native="popupOff" :to="{path: '/id'+ user.id}" class="lv-search-popup-result--lastname" replace>{{user.last_name}} </router-link>
							</div>		

							<div class="lv-search-popup-result--button-wrap">
							
							<span  class="lv-search--button-follow" @click="follow(user.id,$event)"  v-if="searchrecommend[index].following_by_me != 1" :index="index">FOLLOW</span>

							<span  class="lv-search--button-following" :index="index" v-if="searchrecommend[index].following_by_me != 0" @click="unfollow(user.id,$event)">FOLLOWING</span>

							</div>		


						</div>					


					</div>


					<div class="lv-search-popup-result-recent--wrap" v-if="searchrecent.length > 0">
						<span class="lv-search-popup-result--title" >Recent</span>







						<div class="lv-search-popup-result--content" v-for="(user, index) in searchrecent">				

							<router-link @click.native="popupOff" :to="{path: '/id'+ user.id}" style="text-decoration: none;" replace>
							<div :class="setAvatarClass(user.image_w320)" :style="setAvatarStyle(user.image_w320)" >
								
								{{ setAvatarSymbols(user.first_name,user.last_name) }}

							</div>
							</router-link>

							<div class="lv-search-popup-result--fullname-wrap">

							<router-link @click.native="popupOff" :to="{path: '/id'+ user.id}" class="lv-search-popup-result--firstname">{{user.first_name}}</router-link>
							<router-link @click.native="popupOff" :to="{path: '/id'+ user.id}" class="lv-search-popup-result--lastname">{{user.last_name}}</router-link>
							</div>		

							<div class="lv-search-popup-result--button-wrap">
								<span  class="lv-search--button-follow" @click="follow_rec(user.id,$event)"  v-if="searchrecent[index].following_by_me != 1" :index="index">FOLLOW</span>

							<span  class="lv-search--button-following" :index="index" v-if="searchrecent[index].following_by_me != 0" @click="unfollow_rec(user.id,$event)">FOLLOWING</span>

							</div>
						


						</div>



























							
					</div>







				</div>














				<div class="lv-search-popup--notfound" v-if="notfound">
					<span class="lv-search-popup--notfound-title">Nothing found</span>
					<span class="lv-search-popup--notfound-for">for <span>{{ query }}</span></span>					
				</div>
				


			</div>


			</form>

</template>

<script >
	module.exports = {
		data: function() {
			return {
				query: '',
				
				preload: false,
				popup: false,			
				notfound: false,
				showresult: false,				
				searchrecent: [],
				searchrecommend: [],
				placeHolder: 'Search',
				uid: '',
				index: '',
				old_data:'',
				target_array:[]
			}
		},
		computed:{


			
			setTitle: function(){
				
				if( this.$store.state.init.searchType.searchfor === 'all'){
					this.placeHolder = 'Search'
					return 'Search result';
				}else if(this.$store.state.init.searchType.searchfor === 'followings'){
					this.placeHolder = 'Search in Followings'
					console.log('SEARCH RESULT')
					this.getResults()
					return 'Followings';
				}else if(this.$store.state.init.searchType.searchfor === 'follows'){
					this.placeHolder = 'Search in Follows'
					this.getResults()
					return 'Followers';
				}
			},
			SearchType: {

				get:function (){
					
					window.addEventListener('keypress', this.KeyPress);
					if(this.$store.state.init.searchType.searchfor != 'all'){
						this.popup = true;

						return this.$store.state.init.searchType.searchfor;
					}else{
						return this.$store.state.init.searchType.searchfor;
					}


				
				},
				set:function (value){
					console.log(this.$store.state.init.searchType.searchfor)
					this.$store.commit({
	  				type: 'searchtype',
	  				searchfor: value

	  				});
	  				
				}			
				
			},
			
	
				
		},
		getUserUrl: function(id){
			return '/' + id;
		},
		
		methods:{
			onClickOutside: function(e, el){
				 
        		console.log('click heard outside element:', el);
        		console.log('element clicked:', e.target);
       			console.log('event:', e);
       			



       			if(e.target.getAttribute('forsearch') === 'follows'){
       				this.popupOff()
       				this.SearchType = 'follows'
       				console.log("FROM CLICKOUT"+this.$store.state.init.searchType.searchfor)
       			}else if(e.target.getAttribute('forsearch') === 'followings'){
       				this.popupOff()
       				this.SearchType = 'followings'
       				console.log("FROM CLICKOUT"+this.$store.state.init.searchType.searchfor)
       			}else if(e.target.getAttribute('name') === 'search'){
       				
       			}else{
       				this.popupOff()
       			}
				
			
				
				
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

				if(image_url === null){

					return ''

				}else{
				// временно устаналивает урл для изображения
					  
					return 'background-image: url("'+ url + '");'
				}
				
			},
			setAvatarSymbols: function(name,last_name){
				return name.slice(0, 1) + last_name.slice(0, 1)
			},


			popupOff: function(){
				this.query = ''
				this.popup = false

				this.placeHolder = 'Search'
				this.SearchType = 'all'
				window.removeEventListener('keypress', this.KeyPress);
				
				console.log("FROM POPUPOFF"+this.$store.state.init.searchType.searchfor)
				
				
			},
			fullSearch: function(){
				
				if(this.$store.state.guest === false){// ОБРАБОТКА ПОИСКА В ДОМА

					let sType = this.SearchType

				 if(sType === 'followings'){

						let url = 'followings' + this.$store.state.user.id;
						this.$router.push({path: url});
					}else if(sType === 'follows'){

						let url = 'followers' + this.$store.state.user.id;
						this.$router.push({path: url});
					}


				}else{// ОБРАБОТКА ПОИСКА В ГОСТЯХ
					let sType = this.SearchType
					if(sType === 'followings'){

						let url = 'followings' + this.$store.state.guest.id;
						this.$router.push({path: url});
					}else if(sType === 'follows'){

						let url = 'followers' + this.$store.state.guest.id;
						this.$router.push({path: url});
					}



				}

					if(this.SearchType === 'all'){

						if(this.query != ''){
							let url = '/search?'+this.query
							this.$router.push({ path: url });
						}else{
							this.$router.push({ path: '/search'});
						}
				

					}				
				
				this.popupOff()





				
			},

			unfollow_rec: function(id,evt){


				console.log(id)
				
				this.index = evt.currentTarget.getAttribute('index')

				this.old_data = this.searchrecent[this.index]
				this.old_data.following_by_me = 0;

				
				

				this.$http.get(this.$apistore.urls.followersdelete, {params: {
				       	user_id: id
				       }, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {	



				       	// добаить follower count
				       	// Изменяем количество подписчиков
				       	if(response.data.message != 'invalid_request'){
				       		this.$store.commit('decreseUserFollowingCount');
				       		this.searchrecent.splice(this.index, 1, this.old_data)


				       	}
						
				       	


				        }, function(error){
				        	console.log(error)

				        })



			},
			follow_rec: function(id,evt){
				console.log(id)
				
				this.index = evt.currentTarget.getAttribute('index')

				this.old_data = this.searchrecent[this.index]
				this.old_data.following_by_me = 1;

				
				

				this.$http.get(this.$apistore.urls.followersadd, {params: {
				       	user_id: id
				       }, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {	



				       	// добаить follower count
				       	// Изменяем количество подписчиков
				       	if(response.data.message != 'invalid_request'){
				       		this.$store.commit('increseUserFollowingCount');
				       		this.searchrecent.splice(this.index, 1, this.old_data)


				       	}
						
				       	


				        }, function(error){
				        	console.log(error)

				        })



			},



			unfollow: function(id,evt){


				console.log(id)
				
				this.index = evt.currentTarget.getAttribute('index')

				this.old_data = this.searchrecommend[this.index]
				this.old_data.following_by_me = 0;

				
				

				this.$http.get(this.$apistore.urls.followersdelete, {params: {
				       	user_id: id
				       }, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {	



				       	// добаить follower count
				       	// Изменяем количество подписчиков
				       	if(response.data.message != 'invalid_request'){
				       		this.$store.commit('decreseUserFollowingCount');
				       		this.searchrecommend.splice(this.index, 1, this.old_data)


				       	}
						
				       	


				        }, function(error){
				        	console.log(error)

				        })



			},
			follow: function(id,evt){
				console.log(id)
				
				this.index = evt.currentTarget.getAttribute('index')

				this.old_data = this.searchrecommend[this.index]
				this.old_data.following_by_me = 1;

				
				

				this.$http.get(this.$apistore.urls.followersadd, {params: {
				       	user_id: id
				       }, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {	



				       	// добаить follower count
				       	// Изменяем количество подписчиков
				       	if(response.data.message != 'invalid_request'){
				       		this.$store.commit('increseUserFollowingCount');
				       		this.searchrecommend.splice(this.index, 1, this.old_data)


				       	}
						
				       	


				        }, function(error){
				        	console.log(error)

				        })



			},

			getResults: function(){
				this.preload = true;



				if(this.$store.state.guest != false){
					this.uid = this.$store.state.guest.id;
				}else{
					this.uid = this.$store.state.user.id;
				}

				if(this.SearchType === 'all'){

					this.$http.get(this.$apistore.urls.usersearch, {params: {
				       	name: this.query,
				       
				       	count: '10'
				       }, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
				       	// данные пришли от сервера

				       	// сброс массива
				       	this.searchrecent = []
						this.searchrecommend = []

				         response.data.result.items.map((value, key)=>{
				         		// сортировка новых данных

				         		if(value.following_by_me === 1){
				         			
				         					this.searchrecent.push(value)
				         			
				         		
				         		}else{
				         			if(value.id != this.$store.state.user.id){
				         			this.searchrecommend.push(value)
				         			}
				         		}
     							

   							})


				       		
				         
				          // убираем прелоаде
				          this.preload = false 
				          // если массивы не пустые показываем рузельтат в другом случае 404 
				          if(this.searchrecent.length === 0 && this.searchrecommend.length === 0){
				          	this.showresult = false
				          	this.notfound = true
				          }else{
				          	this.notfound = false
				          	this.showresult = true
				          }



				        }, function(error){
				        	
				        })

				}else if(this.SearchType === 'followings'){

					// поиск по followings
					console.log('SEARCH IN FOLLOWINGS')
				
				 	// поддержка id

					this.$http.get(this.$apistore.urls.usersearch, {params: {
				       	
				       	fields: 'following_by_me',
				       	following_id: this.uid,
				       	name: this.query,
				       	count: '10'
				       }, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
				       	// данные пришли от сервера

				       	// сброс массива
				       	this.searchrecent = []
						this.searchrecommend = []

				         response.data.result.items.map((value, key)=>{
				         		// сортировка новых данных

				         		if(value.following_by_me === 1){
				         			this.searchrecent.push(value)
				         		}else{
				         			this.searchrecommend.push(value)
				         		}
     							

   							})


				       		
				         
				          // убираем прелоаде
				          this.preload = false 
				          // если массивы не пустые показываем рузельтат в другом случае 404 
				          if(this.searchrecent.length === 0 && this.searchrecommend.length === 0){
				          	this.showresult = false
				          	this.notfound = true
				          }else{
				          	this.notfound = false
				          	this.showresult = true
				          }



				        }, function(error){
				        	
				        })


				}else if(this.SearchType === 'follows'){

					// поиск по followings
					console.log('SEARCH IN FOLLOWS')
				

					this.$http.get(this.$apistore.urls.usersearch, {params: {
				       	
				       	fields: 'following_by_me',
				       	followers_id: this.uid,
				       	name: this.query,
				       	count: '10'
				       }, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
				       	// данные пришли от сервера

				       	// сброс массива
				       	this.searchrecent = []
						this.searchrecommend = []

				         response.data.result.items.map((value, key)=>{
				         		// сортировка новых данных

				         		if(value.following_by_me === 1){
				         			this.searchrecent.push(value)
				         		}else{
				         			this.searchrecommend.push(value)
				         		}
     							

   							})


				       		
				         
				          // убираем прелоаде
				          this.preload = false 
				          // если массивы не пустые показываем рузельтат в другом случае 404 
				          if(this.searchrecent.length === 0 && this.searchrecommend.length === 0){
				          	this.showresult = false
				          	this.notfound = true
				          }else{
				          	this.notfound = false
				          	this.showresult = true
				          }



				        }, function(error){
				        	
				        })


				}
				

			},

			changeQuery: function(){
				// убирает результат
				this.showresult = false
				// включает поап
				this.popup = true
				// включает прелоадер
				this.preload = true
				// выключает 404
				this.notfound = false
				
				// сбрасывает полученные ранее данные
				this.searchrecent = []
				this.searchrecommend = []
				// если строка запроса не пуста
				
					
				   
					// отправка запроса
					this.getResults();
					

				
			},
			KeyPress: function(e){
				 var key = e.keyCode || e.which;
				 console.log(key)
				 if(key == 27){
				 	this.popupOff()
				 	this.$refs.mainSearch.blur();
				 }
			},

		},
		destroy: function(){

			
		},
		created: function(){
			
		}

	}
</script>