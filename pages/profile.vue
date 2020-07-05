<template lang="pug">
  v-row
    v-col(cols="12")
      v-card.mx-auto(max-width="500" tile)
        v-img(height="100%" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg")
          v-row(align="end" class="fill-height")
            v-col(align-self="start" class="pa-0" cols="12")
              v-avatar.profile(color="grey" size="164" tile)
                v-img(:src="user.photo ? user.photo : '/vuetify-logo.svg'")
            v-col.py-0
              v-list-item(color="rgba(0, 0, 0, .4)" dark)
                v-list-item-content
                  v-list-item-title.title(v-text="`${user.firstName} ${user.lastName}`")
                  v-list-item-subtitle(v-text="user.email")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  middleware: ['auth'],
  computed: {
    ...mapGetters({ user: 'auth/user' })
  }
}
</script>
