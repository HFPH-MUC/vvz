// https://nuxtjs.org/guide/vuex-store

export const state = () => ({
  courses: {}
})

export const actions = {
  async fetchCourses(state) {
    // make request
    let req = await this.$axios.$get('/a5-vlvz-api')
      .then((data) => {
        console.log(data)
      })
    state.courses = req.data;
    return req.data;
  }
}

export const mutations = {
  increment(state) {
    state.counter++
  }
}

export const getters = {
  getCounter(state) {
    return state.counter
  }
}