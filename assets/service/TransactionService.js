import Transaction from '~/assets/data/Transaction.class'

export default class TransactionAPI {
  constructor($axios) {
    this.axios = $axios
  }

  /**
   * Filters the array for verified transactions.
   * 
   * @param {Transaction[]} transactions The array of transactions to filter.
   * @returns {Transaction[]} All verified transactions.
   */
  getVerified(transactions) {
    const verified = [];
    transactions.forEach((t) => {
      if (t.verified) verified.push(t);
    });
    return verified;
  }

  /**
   * Filters the array for unverified transactions
   * 
   * @param {Transaction[]} transactions The array of transactions to filter.
   * @returns {Transaction[]} All unverified transactions.
   */
  getUnverified(transactions) {
    const unverified = [];
    transactions.forEach((t) => {
      if (!t.verified) unverified.push(t);
    });
    return unverified;
  }

  /**
   * Fetches the transaction with the given id from the API.
   * 
   * @param {number} id The id of the transaction.
   * @returns {Transaction} The fetched transaction.
   */
  findById(id) {
    return this.axios({
      method: 'get',
      url: 'bank/transaction/' + id,
      withCredentials: true
    }).then((response) => {
      const d = response.data;
      return new Transaction(d.tid, d.from, d.to, d.price, d.purpose, d.reference, d.time, d.verified, d.nameFrom, d.nameTo);;
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return null;
    });
  }

  /**
   * Fetches an array of transactions with the given user ID from the API.
   * 
   * @param {number} id The id of the user.
   * @returns {Transaction[]} The fetched transations.
   */
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
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return [];
    });
  }

  /**
   * Fetches the total balance of a given user ID.
   * 
   * @param {number} id The user ID.
   * @returns {number} The balance of the user.
   */
  getBalanceByUserId(id) {
    if (id == undefined || id == null) return [];
    return this.axios({
      method: 'get',
      url: 'bank/transaction/user/' + id + "/sum",
      withCredentials: true
    }).then((response) => {
      return response.data;
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return -1;
    });
  }

  /**
   * Pushes a new or a changed transaction to the API.
   * 
   * @param {any} tid The transaction ID.
   * @param {(number|null)} from The sender ID of the transaction, if any.
   * @param {(number|null)} to The receiver ID of the transaction, if any.
   * @param {number} amount The amount of the transaction.
   * @param {number} time The UNIX timestamp of the transaction (UTC).
   * @param {string} purpose The purpose of the transaction.
   * @param {(string|null)} reference The reference of the transaction.
   * @param {boolean} verified Whether the transaction is verified.
   * @returns {boolean} Whether the transaction was created.
   */
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
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return false;
    })
  }

  /**
   * Deletes a transaction from the API.
   * 
   * @param {number} tid The ID of the transaction.
   * @returns {boolean} Whether the transaction was deleted.
   */
  delete(tid) {
    return this.axios({
      method: 'delete',
      url: 'bank/transaction/' + tid,
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
}
