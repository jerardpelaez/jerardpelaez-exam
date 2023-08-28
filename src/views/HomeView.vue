<template>
  <div>
    <v-btn>{{ selectedItems.length }} products selected</v-btn>
    <v-btn>add</v-btn>
    <SearchAutocompleteVue type="supplier" />
    <ListItems :listItems="selectedSuppliers" :type="'supplier'" class="mb-10" />
    <SearchAutocompleteVue type="products" />
    <ListItems :listItems="selectedProducts" :type="'products'" />
    <SelectedItems class="mt-10" />
    <SnackbarMessage />
  </div>
</template>

<script>
import SearchAutocompleteVue from "@/components/SearchAutocomplete.vue";
import ListItems from "@/components/ListItems.vue";
import SelectedItems from "@/components/SelectedItems.vue";
import SnackbarMessage from "@/components/SnackbarMessage.vue";

export default {
  name: "HomeView",

  components: {
    SearchAutocompleteVue,
    ListItems,
    SelectedItems,
    SnackbarMessage,
  },

  computed: {
    products() {
      return this.$store.state.products;
    },
    suppliers() {
      return this.$store.state.suppliers;
    },
    searchValue() {
      return this.$store.state.searchValue;
    },
    selectedItems() {
      return this.$store.state.selectedItems;
    },
    selectedSuppliers() {
      return this.$store.getters.selectedSuppliers;
    },
    selectedProducts() {
      return this.$store.getters.selectedProducts;
    },
  },
};
</script>
