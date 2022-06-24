export default {
  set(state, { name, uid, mainCharName, mid, cid, cTag }) {
    state.user = {
      name: name,
      uid: uid,
      mainCharName: mainCharName,
      mid: mid,
      cid: cid,
      cTag: cTag
    }
    //console.log(state)
  },

  setDefault(state) {
    Object.assign(state.user, {
      name: "N/A",
      uid: null,
      mainCharName: "N/A",
      mid: null,
      cid: null,
      cTag: null
    })
  }
}
