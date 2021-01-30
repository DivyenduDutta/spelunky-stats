import { createStore } from 'vuex';
import deaths from './modules/deaths';
import auth from './modules/auth';

import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [
    createPersistedState({key : 'spleunky-stats', paths: ["auth"]})
  ],
  modules: {
    deaths,
    auth
  }
})
