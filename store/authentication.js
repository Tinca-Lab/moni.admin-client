export const states = () => ({});

export const actions = {
  async register(_, payload) {
    await this.$axios.post(
      this.$axios.defaults.baseURL + "/api/v1/auth/register",
      payload
    );
  },
};

export const mutations = {};
