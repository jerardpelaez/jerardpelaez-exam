import Vue from 'vue'
import Vuex from 'vuex'

import suppliersData from '@/api/suppliers'
import productsData from '@/api/products'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    suppliers: suppliersData,
    products: productsData,
    searchValue: null,
    searchValueProduct: null,
    selectedItems: [],
    snackbarMessage: "",
    snackbar: false,
    addedItemsSummary: []
  },
  getters: {
    selectedSuppliers(state) {
      try {
        if (!state.searchValue) {
          return state.suppliers
        } else {
          return state.suppliers.filter((supplier) => {
            return supplier.id == state.searchValue.id;
          });
        }
      } catch (error) {
        return [];
      }
    },
    selectedProducts(state) {
      try {
        if (!state.searchValueProduct) {
          return state.products.data.filter((product) => {
            return product.supplierId == state.searchValue.id;
          });
        } else {
          return state.products.data.filter((product) => {
            return product.id == state.searchValueProduct.id;
          });
        }
      } catch (error) {
        return [];
      }
    },
  },
  mutations: {
    setSearchValue(state, searchValue) {
      state.searchValue = searchValue
    },
    setSearchValueProduct(state, searchValueProduct) {
      state.searchValueProduct = searchValueProduct
    },
    setAddedItemsSummary(state, addedItemsSummary) {
      let arr = state.addedItemsSummary.concat(addedItemsSummary);
      let mergedArr = [...new Set(arr)]
      state.addedItemsSummary = mergedArr
    },
    removeAddedItemSummary(state, product) {
      let filtered = state.addedItemsSummary.filter(function (item) {
        return item !== product.item
      })
      state.addedItemsSummary = filtered
    },
    addSelectedItem(state, selectedItem) {
      if (!state.selectedItems.includes(selectedItem)) {
        state.selectedItems.push(selectedItem)
      } else {
        const objWithIdIndex = state.selectedItems.findIndex((obj) => obj.id === selectedItem.id);

        if (objWithIdIndex > -1) {
          state.selectedItems.splice(objWithIdIndex, 1);
        }
      }
    },
    deleteSelectedItem(state, selectedItem) {
      const objWithIdIndex = state.selectedItems.findIndex((obj) => obj.id === selectedItem.id);

      if (objWithIdIndex > -1) {
        state.selectedItems.splice(objWithIdIndex, 1);
      }
      state.snackbar = true
      state.snackbarMessage = `<span>Deleted <span style="font-weight: bold; color: black;"> ${selectedItem.name}</span> successfully!</span>`

      setTimeout(() => {
        state.snackbar = false
        state.snackbarMessage = ""
      }, 3000);
    },
    showSnackBar(state, showMessage) {
      state.snackbarMessage = showMessage
      state.snackbar = true
    },
    resetState(state) {
      state.suppliers = suppliersData,
        state.products = productsData,
        state.searchValue = null,
        state.searchValueProduct = null,
        state.selectedItems = [],
        state.snackbarMessage = "",
        state.snackbar = false
    }
  },
  actions: {
  },
  modules: {
  }
})
