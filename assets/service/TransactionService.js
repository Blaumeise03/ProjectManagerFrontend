import Transaction from '~/assets/data/Transaction.class'

export default class TransactionAPI {
  constructor($axios) {
    this.axios = $axios
  }

  //Filters the array for verified transactions
  getVerified(transactions) {
    const verified = [];
    transactions.forEach((t) => {
      if (t.verified) verified.push(t);
    });
    return verified;
  }

  //Filters the array for unverified transactions
  getUnverified(transactions) {
    const unverified = [];
    transactions.forEach((t) => {
      if (!t.verified) unverified.push(t);
    });
    return unverified;
  }

  //Returns the transaction with the given ID
  findById(id) {
    return this.axios({
      method: 'get',
      url: 'bank/transaction/' + id,
      withCredentials: true
    }).then((response) => {
      const d = response.data;
      return new Transaction(d.tid, d.from, d.to, d.price, d.purpose, d.reference, d.time, d.verified, d.nameFrom, d.nameTo);;
    })
  }

  //Returns an array of transactions with the given user ID
  findAllByUserId(id) {
    if (id == undefined || id == null) return [];
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

  //Returns the total balance of a given user ID
  getBalanceByUserId(id) {
    if (id == undefined || id == null) return [];
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

  //Pushes a new or a changed transaction into the server
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
