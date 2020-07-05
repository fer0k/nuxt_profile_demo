import Cookies from 'js-cookie'
import * as types from './mutation-types'

// state
export const state = () => ({
  user: null,
  tokenType: Cookies.get('token_type'),
  accessToken: Cookies.get('access_token'),
  refreshToken: Cookies.get('refresh_token')
})

// getters
export const getters = {
  user: state => state.user,
  tokenType: state => state.tokenType,
  accessToken: state => state.accessToken,
  refreshToken: state => state.refreshToken,
  loginIn: state => state.user !== null
}

// mutations
export const mutations = {
  [types.SAVE_TOKEN] (state, { tokenType, accessToken, refreshToken, expiresIin }) {
    state.tokenType = tokenType || ''
    state.accessToken = accessToken || ''
    state.expiresIin = expiresIin || ''
    state.refreshToken = refreshToken || ''
    Cookies.set('token_type', tokenType || '', { expires: expiresIin })
    Cookies.set('access_token', accessToken || '', { expires: expiresIin })
    Cookies.set('refresh_token', refreshToken || '', { expires: expiresIin })
  },

  [types.FETCH_USER_SUCCESS] (state, { user }) {
    state.user = user
  },

  [types.FETCH_USER_FAILURE] (state) {
    state.tokenType = null
    state.accessToken = null
    state.refreshToken = null
    Cookies.remove('token_type')
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
  },

  [types.LOGOUT] (state) {
    state.user = null
    state.tokenType = null
    state.accessToken = null

    Cookies.remove('token_type')
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
  }
}

// actions
export const actions = {
  saveToken ({ commit, dispatch }, payload) {
    commit(types.SAVE_TOKEN, payload)
  },
  fetchUser ({ commit }) {
    try {
      if (!Cookies.get('access_token')) {
        throw new TypeError('Token is corrupt')
      }
      // const { data } = await this.$axios.get('/user/')
      const userData = {
        email: 'login@domain.com',
        firstName: 'Имя',
        lastName: 'Фамилия',
        photo: 'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg'
      }
      commit(types.FETCH_USER_SUCCESS, { user: userData })
    } catch (e) {
      commit(types.FETCH_USER_FAILURE)
    }
  },
  logout ({ commit }) {
    try {
      // await this.$axios.get('/user/logout/')
    } catch (e) { }
    commit(types.LOGOUT)
  }
}
