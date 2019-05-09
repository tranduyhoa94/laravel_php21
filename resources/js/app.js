
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
const randomString = require( "randomstring" );
import Vue from "vue";
import App from "./App.vue";
import router from "./routers";
import store from "./store";
import Axios from "axios";
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader

import CookieFunction from "./utils/cookie.util.js";
import SecureFunction from "./utils/secure.util.js";

import Vuetify from 'vuetify'

Vue.use(Vuetify, {
 iconfont: 'fa'
})


Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

const token = CookieFunction.getCookie( "sid" ),
  cfr = CookieFunction.getCookie( "cfr" );

if ( token && cfr ) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token;
  Vue.prototype.$http.defaults.headers.common.cfr = cfr;
}


const role = randomString.generate( 10 ) + 0 + randomString.generate( 1997 );
CookieFunction.setCookie( "cfr", role );
const test = parseInt( SecureFunction.decodeRole( CookieFunction.getCookie( "cfr" ), 10 ));
// console.log(role);
// console.log(test);

/** ******************* SECURED ROUTER ************************/
router.beforeEach( ( to, from, next ) => {
	if ( !CookieFunction.getCookie( "sid" ) && to.path !== "/signin" ) {
		next( "/signin" );
	} else if ( CookieFunction.getCookie( "sid" ) && to.path === "/signin" ) {
    	next( "/" );
	} else {
		next();
	}
} );

new Vue({
	store,
	router,
	template: '<app></app>',
	render: h => h(App),
}).$mount('#app')


