const state = () => ({
    position: {}
})

const mutations = {
    setPosition(state, val) {
        state.position = val
    }
}

const actions = {
    setPosition: ({ commit }, position) => {
        commit('setPosition', position)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
<<<<<<< HEAD
}
=======
}
>>>>>>> 89e936dd289e4c8ab5c14c35700dd312fb210aa5
