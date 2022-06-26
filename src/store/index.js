import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN'),
        },
        surveys: {
          loading: false,
          data : []
        },
        currentSurvey: {
          loading: false,
          data: {

          }
        },
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"],

    },
    getters: {},
    actions: {
      deleteSurvey({}, id){
        return axiosClient.delete(`/survey/${id}`);
      },
      getSurveys({commit}){
        commit('setSurveysLoading', true);
        return axiosClient.get('/survey').then((res) => {
          commit('setSurveysLoading', false);
          commit('setSurveys', res.data);
          return res;
        });
      },
      getSurvey({commit}, id){
        commit("setCurrentSurveyLoading", true);
        return axiosClient
        .get(`/survey/${id}`)
        .then((res) => {
         commit("setCurrentSurvey", res.data);
         commit("setCurrentSurveyLoading", false);
        return res;
        })
        .catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
      },
      saveSurvey({ commit }, survey) {
        delete survey.image_url;
        let response; 
        if (survey.id){
          response = axiosClient
          .put(`/survey/${survey.id}`, survey)
          .then((res) => {
            return res;
          });
        }else {
          response = axiosClient.post("/survey", survey).then((res) => {
            return res;
          });
        }
        return response;
      },
        register({commit}, user){
            return axiosClient.post('/register', user)
            .then(({data}) =>{
                commit('setUser', data)
                commit('setToken', data.token)
                return data;
            });
        },

        login({commit}, user){
            return axiosClient.post('/login', user)
            .then(({data}) =>{
                commit('setUser', data)
                commit('setToken', data.token)
                return data;
            })
        },
        logout({commit}){
            return axiosClient.post('/logout')
            .then(response => {
                commit('logout')
                return response;
            })
        },
        getUser({commit}) {
            return axiosClient.get('/user')
            .then(res => {
              commit('setUser', res.data)
            })
        }
    },
    mutations: {
      setSurveysLoading: (state, loading) => {
        state.surveys.loading = loading;
      },
      setCurrentSurveyLoading: (state, loading) => {
        state.currentSurvey.loading = loading;
      },
      setSurveys: (state, surveys) => {
        state.surveys.data = surveys.data;
      },
      setCurrentSurvey: (state, survey) => {
        state.currentSurvey.data = survey.data;
      },
       saveSurvey: (state, survey) => {
        state.surveys = [...state.surveys, survey.data];
       },
      //  updateSurvey: (state, survey) => {
      //   state.surveys = state.surveys.map((s) => {
      //     if (s.id == survey) {
      //       return survey;
      //     }
      //     return s;
      //   });
      //  },
        logout: (state) =>{
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem('TOKEN');
        },
        setUser: (state, user) => {
            state.user.data = user;
          },
          setToken: (state, token) => {
            state.user.token = token;
            sessionStorage.setItem('TOKEN', token);
          },
        
    },
    modules: {}
})

export default store;