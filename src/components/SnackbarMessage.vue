<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="snackbarState" :timeout="3000">
      {{ snackbarMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  computed: {
    snackbarState() {
      return this.$store.state.snackbar;
    },
    snackbarMessage() {
      return this.$store.state.snackbarMessage;
    },
  },
};
</script>
