export const state = () => ({
  data: [],
  metadata: null,
});

export const mutations = {
  setPromos(state, promos) {
    state.data = promos;
  },
  setMetadata(state, metadata) {
    state.metadata = metadata;
  },
};

export const actions = {
  async fetchPromos({ commit }, page = 1) {
    try {
      const { promos, ...metadata } = await this.$axios.$get(
        `/api/v1/promo?page=${page}`
      );
      commit("setPromos", promos);
      commit("setMetadata", metadata);
    } catch (error) {
      commit("setPromos", []);
      commit("setMetadata", null);
    }
  },
};
