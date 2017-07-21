import * as types from '../../mutation-types'
import { getUserState } from '../../getters'
import { userLogin, userLogout } from '../../actions'


const state = {
    userLogged: false
};

const getters = {
    getUserState
};

const actions = {
    userLogin,
    userLogout
};

const mutations = {
    [types.USER_LOGIN_SUCCESS] (state) {
        state.userLogged = true
    },
    [types.USER_LOGOUT_SUCCESS] (state) {
        state.userLogged = false
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
