<template>
  <v-card max-width="800" class="mx-auto mb-10">
    <v-toolbar color="black" dark>
      <v-toolbar-title> Cart Items </v-toolbar-title>
      <v-spacer></v-spacer>
      <FeatureModal />
    </v-toolbar>

    <v-list three-line v-if="addedItemsSummary.length > 0">
      <template v-for="(item, index) in addedItemsSummary">
        <v-list-item :key="`list-${item.id}`">
          <v-list-item-avatar>
            <v-img
              src="https://www.pngitem.com/pimgs/m/27-272007_transparent-product-icon-png-product-vector-icon-png.png"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content class="text-caption">
            <span>Price per item: €{{ item.purchasePrices[0].price }}</span>
            <v-list-item-title
              >Name: {{ item.name }} | SKU: {{ item.sku }}</v-list-item-title
            >
            <v-list-item-subtitle
              >Quantity:
              <span style="font-weight: bold"
                >x{{ item.purchasePrices[0].quantitySummary }}</span
              >
            </v-list-item-subtitle>
            <v-list-item-subtitle
              >Total Price: €{{
                Math.round(
                  item.purchasePrices[0].price *
                    item.purchasePrices[0].quantitySummary
                )
              }}</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon
                color="red lighten-1"
                @click="removeItem({ item: item, index: index })"
                >mdi-minus</v-icon
              >
            </v-btn>
            <p style="font-size: 12px"></p>
          </v-list-item-action>
        </v-list-item>
        <v-divider :key="`divider-${item.id}`"></v-divider>
      </template>
    </v-list>
    <v-list class="px-8" v-if="addedItemsSummary.length > 0">
      All items price summary: <strong>€ {{ totalPriceSummary }}</strong>
    </v-list>
  </v-card>
</template>

<script>
import FeatureModal from "./FeatureModal.vue";
export default {
  components: { FeatureModal },

  computed: {
    addedItemsSummary() {
      return this.$store.state.addedItemsSummary;
    },
    totalPriceSummary() {
      let total = 0;

      this.addedItemsSummary.forEach((item) => {
        total += Math.round(
          item.purchasePrices[0].price * item.purchasePrices[0].quantitySummary
        );
      });
      return total;
    },
  },

  methods: {
    removeItem(item) {
      this.$store.commit("removeAddedItemSummary", item);
    },
  },
};
</script>