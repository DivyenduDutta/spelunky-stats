import { createStore } from 'vuex';
import deaths from './modules/deaths';

export default createStore({
  modules: {
    deaths
  }
})
