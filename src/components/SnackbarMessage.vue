<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="snackbar" :timeout="3000" color="green lighten-2" right width="50">
      <div v-html="message"></div>
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    snackbar: false,
    message: "",
  }),
  computed: {
    snackbarState() {
      return this.$store.state.snackbar;
    },
    snackbarMessage() {
      return this.$store.state.snackbarMessage;
    },
  },

  watch: {
    snackbarState() {
      this.snackbar = this.snackbarState;
    },
    snackbarMessage() {
      this.message = this.snackbarMessage;
    },
  },
};
</script>
