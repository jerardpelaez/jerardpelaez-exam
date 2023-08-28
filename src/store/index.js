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

      state.snackbar = true
      state.snackbarMessage = `<span>Added items successfully!</span>`

      setTimeout(() => {
        state.snackbar = false
        state.snackbarMessage = ""
      }, 3000);
    },
    removeAddedItemSummary(state, product) {
      state.products.data.forEach(productItem => {
        productItem.childProducts.forEach(child => {
          if (child.id == product.item.id) {
            child.purchasePrices[0].quantitySummary = null
          }
        })
      })
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
      // reset products quantity state
      state.products.data.forEach(product => {
        product.childProducts.forEach(child => {
          if (!child.purchasePrices[0].quantitySummary) {
            child.purchasePrices[0].quantitySummary = 0
          }
          if (state.selectedItems.includes(child)) {
            let summary = parseInt(child.purchasePrices[0].quantitySummary)
            let fromList = parseInt(child.purchasePrices[0].quantityStart)
            child.purchasePrices[0].quantitySummary = summary + fromList
          }

          child.purchasePrices[0].quantityStart = 1
        })
      })
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
