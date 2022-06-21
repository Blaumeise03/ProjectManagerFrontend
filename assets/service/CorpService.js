import Corp from '~/assets/data/Corp.class'

export default class CorpService {
  constructor($axios) {
    this.axios = $axios
  }

  findByID(id) {
    if (id == null || id == -1) return null;

    return this.axios({
      method: 'get',
      url: 'corp/' + id,
      withCredentials: true
    }).then((response) => {
      const c = response.data;
      return new Corp(c.id, c.tag, c.name);
    })
  }
}
