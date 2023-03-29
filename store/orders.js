export const state = () => ({
  data: [],
  metadata: null,
});

export const mutations = {
  setOrders(state, orders) {
    state.data = orders;
  },
  setMetadata(state, metadata) {
    state.metadata = metadata;
  },
};

export const actions = {
  async fetchOrders({ commit }, page = 1) {
    try {
      const { orders, ...metadata } = await this.$axios.$get(
        `/api/v1/orders?page=${page}`
      );
      commit("setMetadata", metadata);
      commit("setOrders", orders);
    } catch {
      commit("setOrders", []);
      commit("setMetadata", null);
    }
  },
};
