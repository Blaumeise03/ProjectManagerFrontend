export default class Transaction {
  constructor(tid, fromID, toID, price, purpose, reference, time, verified, fromName, toName) {
    this.tid = tid;
    this.fromID = fromID;
    this.toID = toID;
    this.price = price;
    this.purpose = purpose;
    this.reference = reference;
    this.time = time;
    this.verified = verified;
    this.fromName = fromName;
    this.toName = toName;
  }
}
