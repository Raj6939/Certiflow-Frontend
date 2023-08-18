import Vue from 'vue';
import Vuex from 'vuex';
import issuerStore from '../store/issuerStore'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {     
        issuerStore,        
    }
})

