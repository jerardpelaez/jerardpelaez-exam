<template>
  <div class="pt-10">
    <SnackbarMessage />
    <SelectedItemsSummary />
  </div>
</template>

<script>
import SnackbarMessage from "@/components/SnackbarMessage.vue";
import SelectedItemsSummary from "@/components/SelectedItemsSummary.vue";

export default {
  name: "HomeView",

  components: { SnackbarMessage, SelectedItemsSummary },
};
</script>
