export default class LoginService {
  constructor($axios) {
    this.axios = $axios
  }

  /**
   * Performs a login into the API.
   * 
   * @param {string} username The username for the login.
   * @param {string} password The password for the login.
   *
   * @returns {boolean} Whether the login was successful.
   */
  performLogin(username, password, rememberMe) {
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    data.append('remember-me', rememberMe);
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

  /**
   * Performs a logout from the API.
   *
   * @returns {boolean} Whether the logout was successful.
   */
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

  /**
   * Fetches the details of the currently logged-in user from the API.
   *
   * @returns {object} The user data or null.
   */
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
