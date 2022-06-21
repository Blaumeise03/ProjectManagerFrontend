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
    //console.log(state.user)
  },
}
