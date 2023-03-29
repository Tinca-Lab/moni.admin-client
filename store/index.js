export const state = () => ({
  isLoading: false,
  isError: false,
  configs: {},
});

export const mutations = {
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setIsError(state, isError) {
    state.isError = isError;
  },
  setConfigs(state, configs) {
    state.configs = configs;
  },
};

export const actions = {
  async getConfigs({ commit }) {
    const configs = await this.$axios.$get(`/api/v1/website/configs`);
    commit("setConfigs", configs);
  },
};
