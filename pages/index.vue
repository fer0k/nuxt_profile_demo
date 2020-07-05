<template lang="pug">
  v-row(justify="center")
    v-col(lg="4" sm="6" cols="12")
      auth-card(:user="user")
</template>

<script>
import { mapGetters } from 'vuex'
import AuthCard from '~/components/AuthCard'

export default {
  components: { AuthCard },
  computed: {
    ...mapGetters({ user: 'auth/user' })
  }
}
</script>
