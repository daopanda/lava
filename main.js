var Vue = require('vue/dist/vue.js')




// Plugins
var VueRouter = require('vue-router')
var VueResource = require('vue-resource')
var VeeValidate = require('vee-validate')
// Pages
var singin = require('./views/auth/singin-view.vue')
var singup = require('./views/auth/singup-view.vue')

// Template blocks
var header_view = require('./views/auth/header-view.vue')

// Components
var input_email = require('./views/elements/input-email-component.vue')
var input_password = require('./views/elements/input-password-component.vue')
var input_name = require('./views/elements/input-name-component.vue')
var input_lastname = require('./views/elements/input-lastname-component.vue')
var input_birthdate = require('./views/elements/input-birthdate-component.vue')
var input_sex = require('./views/elements/input-sex-component.vue')


var singup_form = require('./views/elements/singup-form-component.vue')

// Registration plugins 

Vue.use(VueRouter)
Vue.use(VueResource)

// Routing
var router = new VueRouter({
	routes: [
	{ 'path': '/singin', component: singin},
	{ 'path': '/singup', component: singup},
	{ 'path': '/', component: singin },	
	]
})

// store
var store = {
  user: {
  	
  	email: '',
  	password:'',
  	name: '',
  	lastname: ''

  },
  api: {
  	baseurl: 'https://api.lava.top/#'
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
Vue.component('input-email', input_email)
Vue.component('input-password', input_password)
Vue.component('input-name', input_name)
Vue.component('input-lastname', input_lastname)
Vue.component('input-birthdate', input_birthdate)
Vue.component('input-sex', input_sex)

Vue.component('singup-form', singup_form )

new Vue({
	el: '#app',
	router: router,

	data:{
		
		
	}

	

})