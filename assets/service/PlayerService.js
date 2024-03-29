import Player from '~/assets/data/Player.class'
import Wallet from '~/assets/data/Wallet.class'

export default class PlayerAPI {
  constructor($axios) {
    this.axios = $axios
  }

  /**
   * Fetches a player from the API.
   * 
   * @param {number} id The ID of the player.
   * @returns {Player} The player with the given ID.
   */
  findById(id) {
    if (id == null || id == -1) return null;

    return this.axios({
      method: 'get',
      url: 'player/' + id,
      withCredentials: true
    }).then((response) => {
      const t = response.data;
      return new Player(t.id, t.name, t.ingameID, t.corp, t.parent, t.user);
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return null;
    })
  }

  /**
   * Fetches a player from the API.
   * 
   * @param {String} name The name of the player.
   * @returns {Player} The player with the given ID.
   */
  findByName(name) {
    if (name == null) return null;

    return this.axios({
      method: 'get',
      url: 'player/name/' + name,
      withCredentials: true
    }).then((response) => {
      const t = response.data;
      return new Player(t.id, t.name, t.ingameID, t.corp, t.parent, t.user);
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return null;
    })
  }

  /**
   * Fetches all players of a corp with a given corptag.
   * 
   * @param {string} tag The corptag.
   * @returns {Player[]} The players of the given corp.
   */
  findAllCorpTag(tag) {
    return this.axios({
      method: 'get',
      url: 'player/corpTag/' + tag,
      withCredentials: true
    }).then((response) => {
      const players = []
      response.data.forEach((t) => {
        players.push(new Player(t.id, t.name, t.ingameID, t.corp, t.parent, t.user))
      })
      return players
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return [];
    })
  }

  /**
   * Fetches all players of a corp with a given ID.
   * 
   * @param {number} id The ID of the corp.
   * @returns {Player[]} The players of the given corp.
   */
  findAllByCorpID(id) {
    if (id == null || id == -1) return []

    return this.axios({
      method: 'get',
      url: 'player/corp/' + id,
      withCredentials: true
    }).then((response) => {
      const players = []
      response.data.forEach((t) => {
        players.push(new Player(t.id, t.name, t.ingameID, t.corp, t.parent, t.user))
      })
      return players
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return [];
    })
  }

  /**
   * Fetches all wallets of a given corp ID.
   * 
   * @param {number} id The corp ID.
   * @returns {Wallet[]} The wallets of the corp.
   */
  findWalletsByCorp(id) {
    if (id == null || id == -1) return [];
    return this.axios({
      method: 'get',
      url: 'player/corp/' + id + '/wallet',
      withCredentials: true
    }).then((response) => {
      const wallets = []
      response.data.forEach((t) => {
        wallets.push(new Wallet(t.id, t.name, t.verified, t.unverified))
      })
      return wallets;
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return [];
    })
  }

  /**
   * Fetches all players of a corp with a given corp tag.
   * 
   * @param {string} tag The tag of the corp.
   * @returns {string[]} The player names of the given corp.
   */
  findNamesByCorpTag(tag) {
    if (tag == null || tag == "") return [];
    return this.axios({
      method: 'get',
      url: 'player/corpTag/' + tag + '/names',
      withCredentials: true
    }).then((response) => {
      return response.data;
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return [];
    })
  }
}
