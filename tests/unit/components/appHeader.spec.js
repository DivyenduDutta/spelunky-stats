import { expect } from 'chai'
import { mount } from '@vue/test-utils';
import AppHeader from '@/components/appHeader';
import { createStore } from 'vuex';

describe('appHeader.vue', () => {
    let wrapper;
    let store;
    let state;
    let getters;

    beforeEach(() => {
        state = {
            user: {
                name: ''
            }
        };

        getters = {
            username : (state) => state.user.name,
            isSignedIn: () => false,
            isAdmin: () => false
        };

        store = createStore({
            modules:{
                auth:{
                        namespaced:true, 
                        state, 
                        getters
                    }
                }
            });
        wrapper = mount(AppHeader, {
        global: {
            plugins: [store]
          }
        });
    });

    it('should contain generic admin login when admin NOT logged in initially', ()=> {
        expect(wrapper.html()).to.contain('Admin-Login');
    });

    describe('and then admin logs in', () =>{
        let adminLoggedInWrapper;

         beforeEach(() => {
             state = {
                user: {
                    name: 'divine-sense'
                }
            };
            getters = {
                username : (state) => state.user.name,
                isSignedIn: () => true,
                isAdmin: () => true
            };
    
            store = createStore({
                modules:{
                    auth:{
                            namespaced:true, 
                            state, 
                            getters
                        }
                    }
                });
            adminLoggedInWrapper = mount(AppHeader, {
                    global: {
                        plugins: [store]
                    }
                });
         });

         it('should contain admin gretting message in header', () => {
            expect(adminLoggedInWrapper.html()).to.contain('Hi divine-sense (Admin)');
        });
    });

    
});