<template>
  <div class='pt-10'>
    <FeatureModal />
    <SnackbarMessage />
  </div>
</template>

<script>
import FeatureModal from '@/components/FeatureModal.vue';
import SnackbarMessage from '@/components/SnackbarMessage.vue';

export default {
  name: "HomeView",

  components: { FeatureModal, SnackbarMessage }
};
</script>
