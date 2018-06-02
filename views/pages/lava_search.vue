<template>
	<div class="lv-searchfilter-wrapper">
		<div class="lv-searchfilter-leftcolumn">
			
		<span class="lv-searchfilter-back" @click="goBack"> Back</span>

		<!-- showfilter -->

		<div :class="['lv-searchfilter-control-wrap',{'showfilter': showfilterFlag}]" @click.self="showfilterFlag = !showfilterFlag">
			

		<div class="lv-searchfilter-control-body-wrapper" @click.self="showfilterFlag = !showfilterFlag">
			<div class="lv-searchfilter-control-body">

				<div class="lv-searchfilter-control-title">
					Filter
				</div>

				<div class="lv-searchfilter-control-gender-wrap">

					<span class="lv-searchfilter-control-minititle">
						gender
					</span>


					<div class="lv-searchfilter-control-gender">
						
						<div :class="['lv-searchfilter-control-gender-item',{'lv-searchfilter-gender-select': sex === 0}]" @click="changeSex(0)">all</div>
						<div :class="['lv-searchfilter-control-gender-item',{'lv-searchfilter-gender-select': sex === 1}]"  @click="changeSex(1)">male</div>
						<div :class="['lv-searchfilter-control-gender-item',{'lv-searchfilter-gender-select': sex === 2}]"  @click="changeSex(2)">female</div>

					</div>

				</div><!-- lv-searchfilter-control-gender-wrap -->


				<div class="lv-searchfilter-control-gender-wrap">
					<div class="lv-searchfilter-control-minititlewrap">
						<span class="lv-searchfilter-control-minititledistance">
						distance 
						</span>
						<span class="lv-searchfilter-control-minititledistancevalue">
							KM: {{ distance }}
						</span>

					</div>
					 <vue-slider v-model="distance" v-bind="rangeSlider" @drag-end="dragEndDistance"></vue-slider>
				</div><!-- lv-searchfilter-control-gender-wrap -->



				<div class="lv-searchfilter-control-gender-wrap">
					<div class="lv-searchfilter-control-minititlewrap">
						<span class="lv-searchfilter-control-minititledistance">
						AGE 
						</span>
						<span class="lv-searchfilter-control-minititledistancevalue">
							 {{ age[0] }} - {{ age[1] }}
						</span>

					</div>
					 <vue-slider v-model="age" v-bind="ageSlider" @drag-end="dragEndAge"></vue-slider>
				</div><!-- lv-searchfilter-control-gender-wrap -->


				<div class="lv-searchfilter-control-button" @click="applyresult">
					apply <span class="lv-searchfilter-control-button-count" >{{ count }}</span>
				</div>
			</div><!-- lv-searchfilter-control-body-->
		</div>
	</div>

	</div><!--lv-searchfilter-leftcolumn  -->






		<div class="lv-searchfilter-rightcolumn">

		<div class="lv-fullsearch-result-wrapper">

			<div class="lv-searchfilter-content-title">
					{{ fssetTitle }}
			</div>

			

			<input type="text" class="lv-fullsearch-result-input icn-search--bg" name="search"  maxlength="30" v-model="query"  @keyup="changeQuery">

			<preloader v-if="preload"></preloader>	



				<div class="lv-fullsearch-result-content-wrapper" v-if="showresult" >
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







		</div><!--lv-fullsearch-result-wrapper  -->	

		</div>
	</div>

</template>

<script >
	module.exports = {
		data: function() {
			return {
				count: 0,
				notfound: false,
				sex: 0,
				uid: '',
				preload: false,
				SearchType: 'all',
				showfilterFlag: false,
				showresult: false,
				query: '',
				distance: 50,
				age:[25, 45],
				searchrecommend: [],
				searchrecent: [],
				SearchType: 'all',
				applyarray:[],
				index: '',
				old_data:'',
				
				rangeSlider:{
					dotSize: 25,
					processStyle: {"backgroundImage": "-webkit-linear-gradient(left,  #6253B8, #ED80C2)"},
					tooltipStyle: {"backgroundColor": "#6253B8","borderColor": "#6253B8"}
				},
				ageSlider:{
					min:17,
					max:55,
					dotSize: 25,
					processStyle: {"backgroundImage": "-webkit-linear-gradient(left,  #6253B8, #ED80C2)"},
					tooltipStyle: {"backgroundColor": "#6253B8","borderColor": "#6253B8"}

				}

				
			}
		},
		computed: {
			fssetTitle: function() {

				var url = this.$route.path;
				
				if(url[7] === 'e'){
					this.SearchType = 'Followers'
					return 'Followers'
					// followers
				}else if(url[7] === 'i'){
					// followings
					this.SearchType = 'Followings'
					return 'Followings'
				}else{
					//all
					this.SearchType = 'all'
					return 'Search result'
				}
				
			},


		

		},


		methods:{
			applyresult:function(){
				console.log('APPLY')
				if(this.applyarray.length === 0 ){
					this.getResultsForApply()
				}

				this.showfilterFlag = !this.showfilterFlag
					this.searchrecent = []
					this.searchrecommend = []

				  this.applyarray.map((value, key)=>{
				         		// сортировка новых данных

				         		if(value.following_by_me === 1){
				         			this.searchrecent.push(value)
				         		}else{
				         			this.searchrecommend.push(value)
				         		}
     							

   							})


			},
			changeSex:function(digit){
				this.sex = digit
				this.getResultsForApply()

			},
			dragEndDistance: function(){
				this.getResultsForApply()

			},
			dragEndAge: function(){
				this.getResultsForApply()
			},
		
			
			onClickOutside: function(e, el){
				 console.log('OUTSIDE')
        		this.showresult = false;
			
				
				
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
				       	
				       		this.searchrecommend.splice(this.index, 1, this.old_data)


				       	}
						
				       	


				        }, function(error){
				        	console.log(error)

				        })



			},
			goBack: function(){
				let url
				if(this.$store.state.guest === false){
					url = "/id" + this.$store.state.user.id
				}else{
					url = "/id" + this.$store.state.guest.id
				}
				
				this.$router.push(url)
			},






























			setSearchType:function(){

				if(this.fssetTitle === 'Search result'){
					this.SearchType = 'all'
				}else{
					this.SearchType = this.fssetTitle
				}
				

			},
			getQuery: function(){
				let path = this.$route.query;
				let query;
				for(key in path){
					if(path[key] === null){
						query = key
					}
				}
				this.query = query;
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
			getResults: function(){
				this.preload = true;
				this.setSearchType()

				 	
				
				console.log(this.SearchType)


				if(this.SearchType === 'all'){


				let setparams = {}
				 	
				 	if(this.sex != 0){
				 		setparams = {
				       	
				       	fields: 'following_by_me',
				       	name: this.query,
				       	count: '20',
				       	sex: this.sex,
				       	age_from: this.age[0],
				       	age_to: this.age[1]
				       }

				 	}else{

				 		setparams = {
				       	
				       	fields: 'following_by_me',
				       	
				       	name: this.query,
				       	count: '20',
				       	age_from: this.age[0],
				       	age_to: this.age[1]
				       }

				 	}


			console.log('all')
					this.$http.get(this.$apistore.urls.usersearch, {params: setparams , headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
				       	// данные пришли от сервера

				       	// сброс массива
				       	this.searchrecent = []
						this.searchrecommend = []
						this.count =  response.data.result.count

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

				}else if(this.SearchType === 'Followings'){






							let setparams = {}
				 	
				 	if(this.sex != 0){
				 		setparams = {
				       	
				       	fields: 'following_by_me',
				       	following_id: this.uid,
				       	name: this.query,
				       	count: '20',
				       	sex: this.sex,
				       	age_from: this.age[0],
				       	age_to: this.age[1]
				       }

				 	}else{

				 		setparams = {
				       	
				       	fields: 'following_by_me',
				       	following_id: this.uid,
				       	name: this.query,
				       	count: '20',
				       	age_from: this.age[0],
				       	age_to: this.age[1]
				       }

				 	}
					// поиск по followings
					console.log('SEARCH IN FOLLOWINGS')




				       	






					this.$http.get(this.$apistore.urls.usersearch, {params: setparams, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
				       	// данные пришли от сервера

				       	// сброс массива
				       	this.searchrecent = []
						this.searchrecommend = []
							this.count =  response.data.result.count
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


				}else if(this.SearchType === 'Followers'){
							let setparams = {}
				 	
				 	if(this.sex != 0){
				 		setparams = {
				       	
				       	fields: 'following_by_me',
				       	followers_id: this.uid,
				       	name: this.query,
				       	count: '20',
				       	sex: this.sex,
				       	age_from: this.age[0],
				       	age_to: this.age[1]
				       }

				 	}else{

				 		setparams = {
				       	
				       	fields: 'following_by_me',
				       	followers_id: this.uid,
				       	name: this.query,
				       	count: '20',
				       	age_from: this.age[0],
				       	age_to: this.age[1]
				       }

				 	}
					// поиск по followings
					console.log('SEARCH IN FOLLOWS')
				

					this.$http.get(this.$apistore.urls.usersearch, {params: setparams, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
				       	// данные пришли от сервера

				       	// сброс массива
				       	this.searchrecent = []
						this.searchrecommend = []
						this.count =  response.data.result.count
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





			getResultsForApply: function(){
				
				this.setSearchType()

				
				 	
				
				console.log(this.SearchType)


				if(this.SearchType === 'all'){


					let setparams = {}
				 	
				 	if(this.sex != 0){
				 		setparams = {
				       	
				       	fields: 'following_by_me',
				       
				       	name: this.query,
				       	count: '20',
				       	sex: this.sex,
				       	age_from: this.age[0],
				       	age_to: this.age[1]
				       }

				 	}else{

				 		setparams = {
				       	
				       	fields: 'following_by_me',
				       
				       	name: this.query,
				       	count: '20',
				       	age_from: this.age[0],
				       	age_to: this.age[1]
				       }

				 	}


			console.log('all')
					this.$http.get(this.$apistore.urls.usersearch, {params: setparams , headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
				       	// данные пришли от сервера

				       	// сброс массива
				       	
						this.count =  response.data.result.count
						this.applyarray = response.data.result.items
				         

				       		
				         
				          
				         


				        }, function(error){
				        	
				        })

				}else if(this.SearchType === 'Followings'){



					let setparams = {}
				 	
				 	if(this.sex != 0){
				 		setparams = {
				       	
				       	fields: 'following_by_me',
				       	following_id: this.uid,
				       	name: this.query,
				       	count: '20',
				       	sex: this.sex,
				       	age_from: this.age[0],
				       	age_to: this.age[1]
				       }

				 	}else{

				 		setparams = {
				       	
				       	fields: 'following_by_me',
				       	following_id: this.uid,
				       	name: this.query,
				       	count: '20',
				       	age_from: this.age[0],
				       	age_to: this.age[1]
				       }

				 	}








					// поиск по followings
					console.log('SEARCH IN FOLLOWINGS')




				       	






					this.$http.get(this.$apistore.urls.usersearch, {params: setparams, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
				       	// данные пришли от сервера

				       	// сброс массива
				       
							this.count =  response.data.result.count
				        this.applyarray = response.data.result.items

				       		
				         

				        }, function(error){
				        	
				        })


				}else if(this.SearchType === 'Followers'){




					let setparams = {}
				 	
				 	if(this.sex != 0){
				 		setparams = {
				       	
				       	fields: 'following_by_me',
				       	followers_id: this.uid,
				       	name: this.query,
				       	count: '20',
				       	sex: this.sex,
				       	age_from: this.age[0],
				       	age_to: this.age[1]
				       }

				 	}else{

				 		setparams = {
				       	
				       	fields: 'following_by_me',
				       	followers_id: this.uid,
				       	name: this.query,
				       	count: '20',
				       	age_from: this.age[0],
				       	age_to: this.age[1]
				       }

				 	}
					// поиск по followings
					console.log('SEARCH IN FOLLOWS')
				

					this.$http.get(this.$apistore.urls.usersearch, {params: setparams, headers: {'X-Auth-Token': this.$apistore.token}}).then( function(response)  {				          
				       	// данные пришли от сервера

				       	// сброс массива
				       
						this.count =  response.data.result.count
						this.applyarray = response.data.result.items
				         



				        }, function(error){
				        	
				        })


				}

				

			},































			changeQuery: function(){
				// убирает результат
				this.showresult = false
				
				// включает прелоадер
				this.preload = true
				// выключает 404
				this.notfound = false
				
				// сбрасывает полученные ранее данные
				this.searchrecent = []
				this.searchrecommend = []
				// если строка запроса не пуста
					this.uid = this.$route.params.id
						// отправка запроса
						this.getResults();

					
					

				
			}

		},
			
		created: function(){
			this.getQuery();
			this.uid = this.$route.params.id;
			this.setSearchType()
			this.getResults()
			this.getResultsForApply()
		}

	}
</script>