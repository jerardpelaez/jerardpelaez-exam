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
    snackbar: false
  },
  getters: {
    selectedSuppliers(state) {
      try {
        if(!state.searchValue) {
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
        if(!state.searchValueProduct) {
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
    showSnackBar(state, showMessage) {
      state.snackbarMessage = showMessage
      state.snackbar = true
    },
  },
  actions: {
  },
  modules: {
  }
})
