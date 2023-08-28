<template>
  <v-card class="mx-auto">
    <v-list tile elevation="0">
      <v-list-group
        v-for="(item, index) in listItems"
        :key="index"
        :append-icon="type == 'supplier' ? '' : '$expand'"
      >
        <template v-slot:activator>
          <v-list-item-content @click="setActive(item)">
            <v-list-item-title
              :class="
                checkSimilar(item.childProducts) ? 'blue--text' : 'black--text'
              "
              >{{ item.name }}
              <span v-if="countSeletedItems(item)"
                >| Selected Items: {{ countSeletedItems(item) }}</span
              >
            </v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(product, productIndex) in item.childProducts"
          :key="productIndex"
          @click="addSelectedItem(product)"
          :class="selectedItems.includes(product) ? 'light-blue lighten-4' : ''"
        >
          <v-list-item-content>
            <v-row no-gutters>
              <v-col cols="2" align-self="center">
                <v-checkbox
                  disabled
                  :value="selectedItems.includes(product)"
                ></v-checkbox>
              </v-col>
              <v-col cols="8" align-self="center" class="pr-2">
                <v-row no-gutters>
                  <v-col cols="12">
                    {{ product.sku }} | {{ product.name }}
                  </v-col>
                  <v-col cols="12" class="pt-2"> SKU: {{ product.sku }} </v-col>
                </v-row>
              </v-col>
              <v-col cols="2" align-self="center">
                <v-text-field
                  @click.prevent.stop
                  type="number"
                  @input="detectValue(product)"
                  :disabled="!selectedItems.includes(product)"
                  v-model="product.purchasePrices[0].quantityStart"
                ></v-text-field>
                <span v-if="addedItemsSummary.includes(product)"
                  >In list:
                  {{ product.purchasePrices[0].quantitySummary.toLocaleString() }}</span
                >
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: ["listItems", "type"],
  data: () => ({
    active: null,
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
    setActive(item) {
      if (this.type == "supplier") {
        this.$store.commit("setSearchValue", item);
      }
    },
    addSelectedItem(selectedItem) {
      this.$store.commit("addSelectedItem", selectedItem);
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

    checkSimilar(childProduct) {
      try {
        return childProduct.some((element) => {
          return this.selectedItems.indexOf(element) !== -1;
        });
      } catch (error) {
        //
      }
    },

    countSeletedItems(product) {
      try {
        var z = this.selectedItems.filter(function (val) {
          return product.childProducts.indexOf(val) != -1;
        });
        return z.length;
      } catch (error) {
        //
      }
    },
  },
};
</script>

<style scoped>
.border-item {
  border-bottom: 1px solid grey;
}
</style>
