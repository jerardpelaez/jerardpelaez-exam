<template>
  <v-card class="mx-auto" flat>
    <v-list-item
      v-for="(product, productIndex) in selectedItems"
      :key="productIndex"
      @click="addToSelected(product)"
      :class="selected.includes(product) ? 'light-blue lighten-4' : ''"
    >
      <v-list-item-content>
        <v-row no-gutters>
          <v-col cols="1" align-self="center">
            <v-img
              contain
              width="50"
              height="50"
              src="https://cdn-icons-png.flaticon.com/512/4129/4129437.png"
            ></v-img>
          </v-col>
          <v-col cols="7" align-self="center" class="pl-5">
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
              @input="detectValue(product)"
              v-model="product.purchasePrices[0].quantityStart"
            ></v-text-field>
            <span v-if="addedItemsSummary.includes(product)"
              >In list: {{ product.purchasePrices[0].quantitySummary.toLocaleString() }}</span
            >
          </v-col>
          <v-col
            cols="2"
            class="pl-4 text-center"
            align-self="center"
            v-if="selected.includes(product)"
          >
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
    quantity: 1,
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

    detectValue(value) {
      if (value.purchasePrices[0].quantityStart <= 0) {
        let invalidValue = this.selectedItems.find((item) => {
          return item.id == value.id;
        });

        setTimeout(() => {
          if (
            !invalidValue.purchasePrices[0].quantityStart ||
            invalidValue.purchasePrices[0].quantityStart <= 0
          )
            invalidValue.purchasePrices[0].quantityStart = 1;
        }, 1000);
      }
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
    },
  },
};
</script>
