export const state = () => ({

})

export const getter = {

}

export const mutations = {

}

export const actions = {
  async nuxtServerInit(store) {
    //console.log("teeeeest")
    var u = await this.$services.login.getSessionDetails();
    //console.log(u)
    if (u != null) {
      store.commit('user/set', u);
      //console.log(u)
    }
  }
}
