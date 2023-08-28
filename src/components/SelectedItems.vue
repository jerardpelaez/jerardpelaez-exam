<template>
  <v-card class="mx-auto" max-width="500">
    <v-list-item
      v-for="(product, productIndex) in selectedItems"
      :key="productIndex"
      @click="addToSelected(product)"
      :class="selected.includes(product) ? 'light-blue' : ''"
    >
      <v-list-item-content>
        <v-row no-gutters>
          <v-col cols="2">
            <v-icon>mdi-laptop</v-icon>
          </v-col>
          <v-col cols="7">
            <v-row no-gutters>
              <v-col cols="12"> {{ product.sku }} | {{ product.name }} </v-col>
              <v-col cols="12"> SKU: {{ product.sku }} </v-col>
            </v-row>
          </v-col>
          <v-col cols="2">
            <v-text-field
              @click.prevent.stop
              type="number"
              :disabled="!selected.includes(product)"
              v-model="product.purchasePrices[0].quantityStart"
            ></v-text-field>
            <span v-if="addedItemsSummary.includes(product)"
              >In list: {{ product.purchasePrices[0].quantitySummary }}</span
            >
          </v-col>
          <v-col cols="1" v-if="selected.includes(product)">
            <v-icon @click="deleteSelectedItem(product)"> mdi-delete </v-icon>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    selected: [],
    quantity: 1
  }),

  computed: {
    selectedItems() {
      return this.$store.state.selectedItems;
    },
    addedItemsSummary() {
      return this.$store.state.addedItemsSummary;
    },
  },

  methods: {
    deleteSelectedItem(selectedItem) {
      this.$store.commit("deleteSelectedItem", selectedItem);
    },

    addToSelected(product) {
      if (!this.selected.includes(product)) {
        this.selected.push(product);
      } else {
        const objWithIdIndex = this.selected.findIndex(
          (obj) => obj.id === product.id
        );

        if (objWithIdIndex > -1) {
          this.selected.splice(objWithIdIndex, 1);
        }
      }
    }
  },
};
</script>
