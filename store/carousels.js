export const state = () => ({
  data: [],
  metadata: null,
});

export const mutations = {
  setCarousels(state, carousels) {
    state.data = carousels;
  },
  setMetadata(state, metadata) {
    state.metadata = metadata;
  },
};

export const actions = {
  async fetchCarousels({ commit }) {
    try {
      const { carousels, ...metadata } = await this.$axios.$get(
        "api/v1/carousels"
      );
      commit("setCarousels", carousels);
      commit("setMetadata", metadata);
    } catch {
      commit("setCarousels", []);
      commit("setMetadata", null);
    }
  },
};
