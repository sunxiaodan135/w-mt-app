import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
<<<<<<< HEAD
import home from './modules/home'
=======
>>>>>>> 89e936dd289e4c8ab5c14c35700dd312fb210aa5

Vue.use(Vuex)

const store = () =>
    new Vuex.Store({
        modules: {
<<<<<<< HEAD
            geo,
            home
        },
        //ssr渲染
        actions: {
            async nuxtServerInit({ commit }, { req, app }) {
                const {status,data: { province, city }} = await app.$axios.get('/geo/getPosition')
                //    console.log(province,city)
=======
            geo
        },
        actions: {
            async nuxtServerInit({ commit }, { req, app }) {
                const {
                    status,
                    data: { province, city }
                } = await app.$axios.get('/geo/getPosition')
                console.log(province,city)
>>>>>>> 89e936dd289e4c8ab5c14c35700dd312fb210aa5
                commit(
                    'geo/setPosition',
                    status === 200
                        ? {
                            city,
                            province
                        }
                        : {
                            city: '',
                            province: ''
                        }
                )
<<<<<<< HEAD
                const {status:status2,data: { menu}} = await app.$axios.get('/geo/menu')
                commit('home/setMenu',status2 === 200?menu:[])
                const {status:status3,data: { result}} = await app.$axios.get('/search/hotPlace',{
                    params:{
                        city:app.store.state.geo.position.city.replace('市','')
                    }
                })
                commit('home/setHotPlace',status3 === 200?result:[],         
                        
                )
=======

>>>>>>> 89e936dd289e4c8ab5c14c35700dd312fb210aa5
            }
        }
    })

<<<<<<< HEAD
export default store
=======
export default store
>>>>>>> 89e936dd289e4c8ab5c14c35700dd312fb210aa5
