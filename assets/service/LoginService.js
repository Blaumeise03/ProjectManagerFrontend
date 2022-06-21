export default class LoginService {
  constructor($axios) {
    this.axios = $axios
  }

  performLogin(username, password) {
    const data = new FormData()
    data.append('username', username)
    data.append('password', password)
    return this.axios({
      method: 'post',
      url: 'login',
      data
    }).then(() => {
      return true
    }).catch(() => {
      return false
    })
  }

  performLogout() {
    return this.axios({
      method: 'post',
      url: 'logout',
      data: {}
    }).then(() => {
      return true
    }).catch(() => {
      return false
    })
  }

  getSessionDetails() {
    return this.axios({
      method: 'get',
      url: 'user/current',
      data: {}
    }).then((response) => {
      return {
        name: response.data.name,
        uid: response.data.uid,
        mainCharName: response.data.mainCharName,
        mid: response.data.mid,
        cid: response.data.cid,
        cTag: response.data.ctag
      }
    }).catch(() => {
      return null
    })
  }
}
