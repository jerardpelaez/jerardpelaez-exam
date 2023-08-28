<template>
  <v-card class="mx-auto" max-width="500">
    <v-list>
      <v-list-group v-for="(item, index) in listItems" :key="index">
        <template v-slot:activator>
          <v-list-item-content @click="setActive(item)">
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(product, productIndex) in item.childProducts"
          :key="productIndex"
          @click="addSelectedItem(product)"
          :class="selectedItems.includes(product) ? 'light-blue' : ''"
        >
          <v-list-item-content>
            <v-row no-gutters>
              <v-col cols="2">
                <v-checkbox
                  disabled
                  :value="selectedItems.includes(product)"
                ></v-checkbox>
              </v-col>
              <v-col cols="8">
                <v-row no-gutters>
                  <v-col cols="12"> {{ product.sku }} | {{ product.name }} </v-col>
                  <v-col cols="12"> SKU: {{ product.sku }} </v-col>
                </v-row>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  @click.prevent.stop
                  type="number"
                  :disabled="!selectedItems.includes(product)"
                  v-model="product.purchasePrices[0].quantityStart"
                ></v-text-field>
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
  },
};
</script>
