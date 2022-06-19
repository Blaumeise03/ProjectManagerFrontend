import Player from '~/assets/data/Player.class'

export default class PlayerAPI {
  constructor($axios) {
    this.axios = $axios
  }

  findById(id) {
    //console.log(id)
    if (id == null || id == -1) return null;

    return this.axios({
      method: 'get',
      url: 'player/' + id,
      withCredentials: true
    }).then((response) => {
      const t = response.data;
      //console.log(response.data)
      return new Player(t.uid, t.name, t.ingameID, t.corp, t.parent, t.user);
    })
  }

  findAllCorpTag(tag) {
    return this.axios({
      method: 'get',
      url: 'player/corpTag/' + tag,
      withCredentials: true
    }).then((response) => {
      const players = []
      response.data.forEach((t) => {
        players.push(new Player(t.uid, t.name, t.ingameID, t.corp, t.parent, t.user))
      })
      return players
    })
  }

  findAllByCorpID(id) {
    if (id == null || id == -1) return []

    return this.axios({
      method: 'get',
      url: 'player/corp/' + id,
      withCredentials: true
    }).then((response) => {
      const players = []
      response.data.forEach((t) => {
        players.push(new Player(t.uid, t.name, t.ingameID, t.corp, t.parent, t.user))
      })
      //console.log(players)
      return players
    })
  }
}
