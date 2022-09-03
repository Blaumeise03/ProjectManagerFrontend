import Contract from '~/assets/data/Contract.class'

export default class ContractService {
  constructor($axios) {
    this.axios = $axios
  }

  findByID(id) {
    if (id == null || id == -1) return null;
    //API call
    return this.axios({
      method: 'get',
      url: 'project/contract/' + id,
      withCredentials: true
    }).then((response) => {
      let contract = Contract.parseContract(response.data);
      return contract;
    }).catch(() => {
      return null;
    })
  }

  save(contract) {
    if (contract == null) return null;
    //API call
    return this.axios({
      method: 'post',
      url: 'project/contract',
      data: Contract.toData(contract),
      withCredentials: true
    }).then((response) => {
      return true;
    }).catch(() => {
      return false;
    })
  }
}
