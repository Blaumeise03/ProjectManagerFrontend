import Item from '~/assets/data/Item.class'

export default class Contract {
  constructor(id, playerID, created) {
    this.id = id;
    this.playerID = playerID;
    this.created = created;
    this.items = [];
  }

  static toData(contract) {
    let data = {
      id: contract.id,
      playerID: contract.playerID,
      created: contract.created,
      items: []
    }
    for (let item of contract.items) {
      data.items.push({
        id: item.id,
        item: { itemID: item.item.itemID },
        quantity: item.quantity,
        investmentContract: contract.id
      })
    }
    return data;
  }

  static parseContract(data) {
    let contract = new Contract(data.id, data.playerID, data.created);
    for (let raw of data.items) {
      contract.items.push({
        id: raw.id,
        item: Item.parseFullItem(raw.item),
        quantity: raw.quantity,
        contractId: raw.investmentContract
      });
    }
    return contract;
  }
}
