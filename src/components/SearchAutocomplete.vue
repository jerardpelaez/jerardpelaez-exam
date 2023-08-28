<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="12">
        <v-autocomplete
          v-if="type == 'supplier'"
          v-model="searchValue"
          :items="suppliers"
          dense
          filled
          return-object
          item-text="name"
          clearable
          placeholder="Search for a supplier"
        ></v-autocomplete>
        <v-autocomplete
          v-else
          v-model="searchValueProduct"
          :items="selectedProducts"
          dense
          clearable
          filled
          return-object
          item-text="name"
          placeholder="Search for a product"
        ></v-autocomplete>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["type"],
  data: () => ({
    searchValue: null,
    searchValueProduct: null,
  }),

  computed: {
    searchValueItem() {
      return this.$store.state.searchValue;
    },
    searchValueProductItem() {
      return this.$store.state.searchValueProduct;
    },
    suppliers() {
      return this.$store.state.suppliers;
    },
    selectedProducts() {
      return this.$store.getters.selectedProducts;
    },
  },

  watch: {
    searchValueItem() {
      this.searchValue = this.searchValueItem;
    },
    searchValueProductItem() {
      this.searchValueProduct = this.searchValueProductItem;
    },
    searchValue() {
      this.$store.commit("setSearchValue", this.searchValue);
    },
    searchValueProduct() {
      this.$store.commit("setSearchValueProduct", this.searchValueProduct);
    },
  },
};
</script>
