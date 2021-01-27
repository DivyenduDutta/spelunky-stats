import axios from 'axios';
import * as StateConstants from '../../../constants/stateConstants';
import * as CommonConstants from '../../../constants/commonConstants';

const state = {
    deaths : []
}

const mutations = {
    [StateConstants.ADD_NEW_DEATH_CAUSE](state, payload){
        state.deaths.push(payload);
    }
}

const actions = {
    addNewDeathCause({commit}, death){
        return axios.post('https://spelunky-stats-default-rtdb.europe-west1.firebasedatabase.app/deaths.json', death).then((res) => {
            if(res.status == CommonConstants.OK_200){
                commit(StateConstants.ADD_NEW_DEATH_CAUSE, death);
                return CommonConstants.OK_200;
            }else{
                //TODO: handle error
            }
        });
    }
}

const getters = {
    deaths : state => state.deaths
}

const deathModule = {
    state,
    mutations,
    actions,
    getters
}

export default deathModule;