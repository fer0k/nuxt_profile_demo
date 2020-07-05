<template lang="pug">
  v-card(v-if="!user")
    v-card-title Авторизация
    v-card-text
      v-form(v-model="authFormValid")
        v-text-field(v-model="authForm.email" label="Почта" type="email"
          :rules="[rules.required, rules.email]")
        v-text-field(v-model="authForm.password" label="Пароль" type="password"
          :rules="[rules.required, rules.minLength]")
      v-card-actions
        v-btn(@click="userLogin" :disabled="!authFormValid") Войти
  v-card(v-else)
    v-card-title Вы авторизованы
    v-card-actions
      v-btn(@click="userLogout") Выйти
</template>

<script>
export default {
  name: 'AuthCard',
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      authFormValid: false,
      authForm: {
        email: '',
        password: ''
      },
      rules: {
        required: value => !!value || 'Обязательно для заполнения',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Не корректный e-mail-адрес'
        },
        minLength: value => value.length > 3 || 'Короткий пароль'
      }
    }
  },
  methods: {
    async userLogin () {
      // const data = await this.$axios.post('/get_token/', { /*params*/ })
      await this.saveToken({
        tokenType: 'Bearer',
        accessToken: 'mF_9.B5f-4.1JqM',
        refreshToken: 'tGzv3JOkF0XG5Qx2TlKWIA',
        expiresIin: 3600
      })
      await this.$router.push('/profile')
    },
    async userLogout () {
      await this.$store.dispatch('auth/logout')
      await this.$router.push('/')
    },
    async saveToken (data) {
      await this.$store.dispatch('auth/saveToken', data)
    }
  }
}
</script>
