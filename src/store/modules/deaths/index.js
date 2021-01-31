import myAxios from '../../../helpers/axios';
import actualAxios from 'axios';
import * as StateConstants from '../../../constants/stateConstants';
import * as CommonConstants from '../../../constants/commonConstants';
import store from '../../../store';

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
    async addNewDeathCause({commit}, death){
        commit(StateConstants.SET_LOADING, true);
        const axios = await myAxios();
        return axios.post('/deaths.json?auth='+store.state.auth.user.jwtToken, death).then((res) => {
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
            if(err.response.data.error === "Auth token is expired"){
                store.dispatch('auth/signOut');
                return 'Session timed out. Please log in again.';
            }
            return 'error';
        });
    },
    async getAllDeaths({commit}){
        commit(StateConstants.SET_LOADING, true);
        actualAxios.get(CommonConstants.BASE_RTDB_URL + '/deaths.json').then((res) => {
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
    async updateDeathCount({commit}, {deathKey, updatedDeath}){
        commit(StateConstants.SET_LOADING, true);
        const axios = await myAxios();
        return axios.put('/deaths/'+deathKey+'.json?auth='+store.state.auth.user.jwtToken, updatedDeath)
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
                if(err.response.data.error === "Auth token is expired"){
                    store.dispatch('auth/signOut');
                    return {errorCode: 'Session timed out. Please log in again.'};
                }
                
                return {errorCode: 'Error while updating death count'};
            });
    },
    async deleteDeathCause({commit}, deathKey){
        commit(StateConstants.SET_LOADING, true);
        const axios = await myAxios();
        return axios.delete('/deaths/'+deathKey+'.json?auth='+store.state.auth.user.jwtToken)
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
                if(err.response.data.error === "Auth token is expired"){
                    store.dispatch('auth/signOut');
                    return {errorCode: 'Session timed out. Please log in again.'};
                }
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