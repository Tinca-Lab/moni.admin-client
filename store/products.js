export const state = () => ({
  data: [],
  metadata: null,
});

export const mutations = {
  setProducts(state, products) {
    state.data = products;
  },
  setMetadata(state, metadata) {
    state.metadata = metadata;
  },
};

export const actions = {
  async fetchProducts({ commit }, page = 1) {
    try {
      const { products, ...metadata } = await this.$axios.$get(
        `/api/v1/products?page=${page}`
      );
      commit("setProducts", products);
      commit("setMetadata", metadata);
    } catch {
      commit("setProducts", []);
      commit("setMetadata", null);
    }
  },
  fetchProduct({ commit }, productId) {
    return this.$axios.$get(`api/v1/products/${productId}`);
  },
};
