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
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
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
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return false;
    })
  }

  delete(contractID) {
    if (contractID == null) return false;
    //API call
    return this.axios({
      method: 'delete',
      url: 'project/contract/' + contractID,
      withCredentials: true
    }).then((response) => {
      return true;
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return false;
    })
  }

  create(newContract) {
    if (newContract == null) return null;
    //API call
    return this.axios({
      method: 'post',
      url: 'project/contract/new',
      data: newContract,
      withCredentials: true
    }).then((response) => {
      let contract = Contract.parseContract(response.data);
      return contract;
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return false;
    })
  }

  findAll(page) {
    if (!page)
      page = 0;
    return this.axios({
      method: 'get',
      url: 'project/contract/all',
      params: {
        page: page,
        length: 10
      },
      withCredentials: true
    }).then((response) => { 
      let contracts = [];
      for (let d of response.data) {
        contracts.push(Contract.parseContract(d));
      }
      return contracts;
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return [];
    })
  }
}
