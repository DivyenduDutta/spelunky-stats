import { expect } from 'chai'
import { mount } from '@vue/test-utils';
import dataEntryDisplay from '@/components/dataEntry/dataEntryDisplay';
import { createStore } from 'vuex';

describe('dataEntryDisplay.vue', () => {
    let wrapper;
    let store;
    let state;
    let getters;
    let actions;

    beforeEach(() => {
        state = {
            deaths: {
                "FirstDeathKey":{
                    "cause": "Didnt use bombs correctly",
                    "deathCount": 7,
                    "color": "#333333"
                }
            }

        };

        actions = {
            getAllDeaths(){
                return state.deaths;
            }
        }

        getters = {
            causesOfDeaths : state => state.deaths
        };

        store = createStore({ 
            state, 
            actions,
            getters
        });
        wrapper = mount(dataEntryDisplay, {
        global: {
            plugins: [store]
          }
        });
    });

    it('should display the death cause', () => {
        expect(wrapper.html()).to.contain('Didnt use bombs correctly');
    });

    it('should have the correct number of tally marks', () => {
        expect(wrapper.findAll('img').length).to.equal(3);
    });
});