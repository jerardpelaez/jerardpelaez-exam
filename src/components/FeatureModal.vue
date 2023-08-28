<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Add products
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <v-btn v-if="modalTitle !== 'Browse'" outlined class="mr-10 pa-0" small @click="back">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <span class="text-h5">{{ modalTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row no-gutters>
              <v-col
                cols="12"
                v-show="!$store.state.searchValue && !inSelectedList"
              >
                <SearchAutocomplete type="supplier" />
                <ListItems
                  v-if="selectedSuppliers"
                  :listItems="selectedSuppliers"
                  :type="'supplier'"
                  class="mb-10"
                />
              </v-col>
              <v-col
                cols="12"
                v-show="$store.state.searchValue && !inSelectedList"
              >
                <SearchAutocomplete type="products" />
                <ListItems :listItems="selectedProducts" :type="'products'" />
              </v-col>
              <v-col cols="12" v-if="inSelectedList">
                <SelectedItems />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
            v-if="!inSelectedList"
            :disabled="selectedItems.length < 1"
            outlined
            @click="inSelectedList = true"
            >{{ selectedItems.length }} products selected</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn outlined text @click="dialog = false" class="border-btn">
            Cancel
          </v-btn>
          <v-btn
            class="ml-5"
            :class="selectedItems.length < 1 ? '' : 'border-btn'"
            outlined
            text
            :disabled="selectedItems.length < 1"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import ListItems from "./ListItems.vue";
import SearchAutocomplete from "./SearchAutocomplete.vue";
import SelectedItems from "./SelectedItems.vue";

export default {
  components: { SearchAutocomplete, ListItems, SelectedItems },
  data: () => ({
    dialog: false,
    inSelectedList: false,
  }),
  computed: {
    modalTitle() {
      if (this.inSelectedList) {
        return "Selection";
      } else if (this.$store.state.searchValue) {
        return this.$store.state.searchValue.name;
      } else return "Browse";
    },
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

  methods: {
    back() {
      if (!this.inSelectedList) {
        this.$store.commit("setSearchValue", null);
      } else this.inSelectedList = false;
    },
  },
};
</script>

<style scoped>
.border-btn {
  border: 1px solid black !important;
}
</style>