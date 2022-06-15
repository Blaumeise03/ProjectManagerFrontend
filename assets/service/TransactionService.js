import Transaction from '~/assets/data/Transaction.class'

export default class TransactionAPI {
  constructor($axios) {
    this.axios = $axios
  }

  getVerified(transactions) {
    const verified = [];
    transactions.forEach((t) => {
      if (t.verified) verified.push(t);
    });
    return verified;
  }

  getUnverified(transactions) {
    const unverified = [];
    transactions.forEach((t) => {
      if (!t.verified) unverified.push(t);
    });
    return unverified;
  }

  findAllByUserId(id) {
    return this.axios({
      method: 'get',
      url: 'bank/transaction/user/' + id,
      withCredentials: true
    }).then((response) => {
      const transactions = []
      response.data.forEach((t) => {
        transactions.push(new Transaction(t.tid, t.fromID, t.toID, t.price, t.purpose, t.reference, t.time, t.verified, t.nameFrom, t.nameTo))
      })
      return transactions
    })
  }
  getBalanceByUserId(id) {
    return this.axios({
      method: 'get',
      url: 'bank/transaction/user/' + id + "/sum",
      withCredentials: true
    }).then((response) => {
      var balance = -1
      //console.log(response)
      balance = response.data
      return balance
    })
  }
}
