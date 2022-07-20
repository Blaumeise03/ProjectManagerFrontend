import Corp from '~/assets/data/Corp.class'

export default class CorpService {
  constructor($axios) {
    this.axios = $axios
  }

  /**
   * Fetches the corp with the given id from the API
   * 
   * @param {number} id The id of the target corp.
   */
  findByID(id) {
    if (id == null || id == -1) return null;
    //API call
    return this.axios({
      method: 'get',
      url: 'corp/' + id,
      withCredentials: true
    }).then((response) => {
      const c = response.data;
      return new Corp(c.cid, c.tag, c.name);
    })
  }
}
