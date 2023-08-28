<template>
  <div class='pt-10'>
    <FeatureModal />
    <SnackbarMessage />
    <SelectedItemsSummary />
  </div>
</template>

<script>
import FeatureModal from '@/components/FeatureModal.vue';
import SnackbarMessage from '@/components/SnackbarMessage.vue';
import SelectedItemsSummary from '@/components/SelectedItemsSummary.vue';

export default {
  name: "HomeView",

  components: { FeatureModal, SnackbarMessage, SelectedItemsSummary },
  
  computed: {
    addedItemsSummary() {
      return this.$store.state.addedItemsSummary
    }
  }
};
</script>
