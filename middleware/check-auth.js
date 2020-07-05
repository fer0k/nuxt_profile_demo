import cookies from 'js-cookie'

export default async ({ app: { store } }) => {
  if (cookies.get('token_type') !== 'undefined' && !store.getters['auth/accessToken']) {
    await store.dispatch('auth/saveToken', {
      tokenType: cookies.get('token_type') === 'undefined' ? undefined : cookies.get('token_type'),
      accessToken: cookies.get('access_token') === 'undefined' ? undefined : cookies.get('access_token'),
      refreshToken: cookies.get('refresh_token') === 'undefined' ? undefined : cookies.get('refresh_token'),
      expiresIn: 36000
    })
  }
  if (!!store.getters['auth/accessToken'] && !store.getters['auth/loginIn']) {
    await store.dispatch('auth/fetchUser')
  }
}
