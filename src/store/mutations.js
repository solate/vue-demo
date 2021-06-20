const mutations = {
  //保存token
  setToken(state, object) {
    state.token = object.data.token;
  },
};
export default mutations;
