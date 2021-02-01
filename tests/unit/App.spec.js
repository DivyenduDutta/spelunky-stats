import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils';
import App from '@/App';
import { createStore } from 'vuex';


describe('App.vue', () => {
  let wrapper;
  let store;
  let getters;

  beforeEach(() => {
    getters = {
      loading: () => false
    };

    store = createStore({getters});
    wrapper = shallowMount(App, {
      global: {
        plugins: [store],
        stubs: {
          appHeader: true,
          dataEntryRoot: true,
          dataDisplay: true,
          appFooter: true
        }
      }
    });
  });

  it('should load the 4 basic components', () => {
    expect(wrapper.html()).to.contain('<app-header-stub>'); //header to be present
    expect(wrapper.html()).to.contain('<data-entry-stub>'); //data entry component to be present
    expect(wrapper.html()).to.contain('<data-display-stub>'); //data display component to be present
    expect(wrapper.html()).to.contain('<app-footer-stub>'); //footer to be present
  });
})
