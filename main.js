var Vue = require('vue/dist/vue.js')

var VueResource = require("vue-resource")


// Plugins
var VueRouter = require('vue-router')
var VueResource = require('vue-resource')
var VeeValidate = require('vee-validate')
// Pages
var singin = require('./views/auth/singin-view.vue')
var singup = require('./views/auth/singup-view.vue')
var lava = require('./views/app/lava-index.vue')
// Template blocks
var header_view = require('./views/auth/header-view.vue')

// Components



var singup_form = require('./views/elements/singup-form-component.vue')

// Registration plugins 

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueResource)

// Routing
var router = new VueRouter({
	routes: [
	{ 'path': '/singin', component: singin},
	{ 'path': '/singup', component: singup},
	{ 'path': '/', component: lava },	
	]
})

// store
var store = {
  user: {
  	
  	email: '',
  	password:'',
  	first_name: '',
  	last_name: '',
  	sex: 0,
  	birthdate: '',
  	language: 'en'

  },
  api: {
  	
  	token: '',
  	userRegistration: 'https://cors-anywhere.herokuapp.com/https://api.lava.top/api.php?method=users.register',
  	userlogin: 'https://cors-anywhere.herokuapp.com/https://api.lava.top/api.php?method=users.login'
  }
}




store.install = function(){
  Object.defineProperty(Vue.prototype, '$store', {
    get () { return store }
  })
}

Vue.use(store);


// Form Validation
Vue.use(VeeValidate);


// Registration components
Vue.component('header-view', header_view)
Vue.component('lava', lava)
Vue.component('singin', singin)
Vue.component('singup-form', singup_form )

new Vue({
	el: '#app',
	router: router,

	data:{
		
		
	},
	created:function(){
		// прочитать cookie
	}

	

})