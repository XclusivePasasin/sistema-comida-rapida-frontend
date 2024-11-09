<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: 'App',
  created() {
    this.$store.dispatch('fetchUserRole');
  },
  methods: {
    ...mapActions(["fetchUserRole"]),
  },
}
</script>
