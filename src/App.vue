<template>
  <v-app>
    <v-app-bar
      app
      color="primary lighten-1"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

       <h3>Jerard Pelaez - Caplinq Frontend Developer Exam</h3>
      </div>
    </v-app-bar>

    <v-main class="grey lighten-4">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
