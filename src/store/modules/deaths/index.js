import axios from 'axios';
import * as StateConstants from '../../../constants/stateConstants';
import * as CommonConstants from '../../../constants/commonConstants';

const state = {
    deaths : {},
    errorCode: ''
}

const mutations = {
    [StateConstants.ADD_NEW_DEATH_CAUSE](state, { key, payload}){
        state.deaths[key] = payload;
    },
    [StateConstants.GET_ALL_DEATHS](state, payload){
        if(payload === null || payload === undefined){
            payload = {};
        }
        state.deaths = payload;
    }
}

const actions = {
    addNewDeathCause({commit}, death){
        return axios.post('https://spelunky-stats-default-rtdb.europe-west1.firebasedatabase.app/deaths.json', death).then((res) => {
            if(res.status == CommonConstants.OK_200){
                let newDeath = {
                    key: res.data.name,
                    payload: death
                };
                commit(StateConstants.ADD_NEW_DEATH_CAUSE, newDeath);
                return CommonConstants.OK_200;
            }else{
                return res.status;
            }
        });
    },
    getAllDeaths({commit}){
        axios.get('https://spelunky-stats-default-rtdb.europe-west1.firebasedatabase.app/deaths.json').then((res) => {
            if(res.status == CommonConstants.OK_200){
                commit(StateConstants.GET_ALL_DEATHS, res.data);
            }else{
                state.errorCode = 'Error retrieving all causes of deaths';
            }
        });
    }
}

const getters = {
    causesOfDeaths : state => state.deaths,
    errorCode : state => state.errorCode
}

const deathModule = {
    state,
    mutations,
    actions,
    getters
}

export default deathModule;