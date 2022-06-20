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
  findById(id) {
    //console.log(id);
    return this.axios({
      method: 'get',
      url: 'bank/transaction/' + id,
      withCredentials: true
    }).then((response) => {
      const d = response.data;
      //console.log(response);
      const t = new Transaction(d.tid, d.from, d.to, d.price, d.purpose, d.reference, d.time, d.verified, d.nameFrom, d.nameTo);
      //console.log(t);
      return t;
    })
  }
  findAllByUserId(id) {
    return this.axios({
      method: 'get',
      url: 'bank/transaction/user/' + id,
      withCredentials: true
    }).then((response) => {
      const transactions = []
      response.data.forEach((t) => {
        transactions.push(new Transaction(t.tid, t.from, t.to, t.price, t.purpose, t.reference, t.time, t.verified, t.nameFrom, t.nameTo))
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
  create(tid, from, to, amount, time, purpose, reference, verified) {
    return this.axios({
      method: 'post',
      url: 'bank/transaction',
      data: {
        tid,
        nameFrom: from,
        nameTo: to,
        time,
        price: amount,
        purpose,
        reference,
        verified
      },
      withCredentials: true
    }).then((response) => {
      return true;
    }).catch(() => {
      return false;
    })
  }
}
