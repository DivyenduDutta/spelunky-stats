import axios from 'axios';
import * as StateConstants from '../../../constants/stateConstants';
import * as CommonConstants from '../../../constants/commonConstants';

const state = {
    deaths : {},
    loading: false,
    initialLoadError: false
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
    },
    [StateConstants.UPDATE_DEATH_COUNT](state, {deathKey, updatedDeath}){
        state.deaths[deathKey] = updatedDeath;
    },
    [StateConstants.DELETE_DEATH_CAUSE](state, deathKey){
        delete state.deaths[deathKey];
    },
    [StateConstants.SET_LOADING](state, isLoading){
        state.loading = isLoading;
    },
    [StateConstants.SET_INITIAL_LOAD_ERROR](state, isInitialLoadError){
        state.initialLoadError = isInitialLoadError;
    }
}

const actions = {
    addNewDeathCause({commit}, death){
        commit(StateConstants.SET_LOADING, true);
        return axios.post('https://spelunky-stats-default-rtdb.europe-west1.firebasedatabase.app/deaths.json', death).then((res) => {
            commit(StateConstants.SET_LOADING, false);
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
        }).catch((err) => {
            commit(StateConstants.SET_LOADING, false);
            return 'error';
        });
    },
    getAllDeaths({commit}){
        commit(StateConstants.SET_LOADING, true);
        axios.get('https://spelunky-stats-default-rtdb.europe-west1.firebasedatabase.app/deaths.json').then((res) => {
            commit(StateConstants.SET_LOADING, false);
            if(res.status == CommonConstants.OK_200){
                commit(StateConstants.GET_ALL_DEATHS, res.data);
            }else{
                commit(StateConstants.SET_INITIAL_LOAD_ERROR, true);
            }
        }).catch((err) => {
            commit(StateConstants.SET_LOADING, false);
            commit(StateConstants.SET_INITIAL_LOAD_ERROR, true);
        });
    },
    updateDeathCount({commit}, {deathKey, updatedDeath}){
        commit(StateConstants.SET_LOADING, true);
        return axios.put('https://spelunky-stats-default-rtdb.europe-west1.firebasedatabase.app/deaths/'+deathKey+'.json', updatedDeath)
            .then((res) => {
                commit(StateConstants.SET_LOADING, false);
                if(res.status == CommonConstants.OK_200){
                    commit(StateConstants.UPDATE_DEATH_COUNT, {deathKey, updatedDeath});
                    return {errorCode: ''};
                }else{
                    return {errorCode: 'Error while updating death count'};
                }
            }).catch((err) => {
                commit(StateConstants.SET_LOADING, false);
                return {errorCode: 'Error while updating death count'};
            });
    },
    deleteDeathCause({commit}, deathKey){
        commit(StateConstants.SET_LOADING, true);
        return axios.delete('https://spelunky-stats-default-rtdb.europe-west1.firebasedatabase.app/deaths/'+deathKey+'.json')
            .then((res) => {
                commit(StateConstants.SET_LOADING, false);
                if(res.status == CommonConstants.OK_200){
                    commit(StateConstants.DELETE_DEATH_CAUSE, deathKey);
                    return {errorCode: ''};
                }else{
                    return {errorCode: 'Error while deleting death cause'};
                }
            }).catch((err) => {
                commit(StateConstants.SET_LOADING, false);
                return {errorCode: 'Error while deleting death cause'};
            });
    }
}

const getters = {
    causesOfDeaths : state => state.deaths,
    loading: state => state.loading,
    initialLoadError: state => state.initialLoadError
}

const deathModule = {
    state,
    mutations,
    actions,
    getters
}

export default deathModule;