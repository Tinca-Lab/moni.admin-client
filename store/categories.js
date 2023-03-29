export const state = () => ({
  data: [],
  metadata: null,
});

export const mutations = {
  setCategories(state, categories) {
    state.data = categories;
  },
  setMetadata(state, metadata) {
    state.metadata = metadata;
  },
};

export const actions = {
  async fetchCategories({ commit }, page = 1) {
    try {
      const { categories, ...metadata } = await this.$axios.$get(
        `/api/v1/categories?page=${page}`
      );
      commit("setCategories", categories);
      commit("setMetadata", metadata);
    } catch (error) {
      commit("setCategories", []);
      commit("setMetadata", null);
    }
  },
};
