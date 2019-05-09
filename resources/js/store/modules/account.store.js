import CookieFunction from "../../utils/cookie.util";
import { post, get } from '../../services'


const state = {
	status: "",
	token: CookieFunction.getCookie( "sid" ) || "",
	user: {},
	statusNotification: "",
	mailSender: "",
	statusResetPassword: false,
	textAuth: "",
	users: [],
	usersFilter: [],
	fileAvatar: ""
}

const getters = {
	isLoggedIn: ( state ) => !!state.token,
	authStatus: ( state ) => state.status,
	userInfo: ( state ) => state.user,
	statusNotification: ( state ) => state.statusNotification,
	mailSender: ( state ) => state.mailSender,
	statusResetPassword: ( state ) => state.statusResetPassword,
	textAuth: ( state ) => state.textAuth,
	users: ( state ) => state.users,
	usersFilter: ( state ) => state.usersFilter,
	fileAvatar: ( state ) => state.fileAvatar
}

const mutations = {
	auth_request: ( state ) => {
		state.status = 'loading';
	},
	auth_request_success: ( state ) => {
		state.status = "success"
	},
	auth_success: ( state, payload ) => {
		state.status = "success";
		state.token  = payload.token;
		state.users  = payload.user;
	},
	auth_error: ( state, payload ) => {
		state.status = payload
	}
}

const actions = {
	signIn: ( { commit }, user ) => {
		try {
			commit( "auth_request" );
			post( '/api/signin',user  )
				.then( res => {

				} )
				.catch ( error => {

				} );
			
		} catch( e ) {

		}
	} 
}

export default {
  state,
  getters,
  mutations,
  actions
};
