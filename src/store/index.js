import { createStore } from 'vuex'

export default createStore({
  state: {
    userRole: null,
  },
  getters: {
    getUserRole(state) {
      return state.userRole;
    },
  },
  mutations: {
    setUserRole(state, role) {
      state.userRole = role;
    },
  },
  actions: {
    fetchUserRole({ commit }) {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData && userData.role) {
        commit('setUserRole', userData.role);
      } else {
        commit('setUserRole', null);
      }
    },
  },
  modules: {
  }
})
