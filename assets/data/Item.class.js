export default class Item {
  constructor(itemID, name, type) {
    this.itemID = itemID;
    this.name = name;
    this.type = type;
    this.prices = [];
    this.baseCost = [];
    this.resultQuantity = null;
    this.stationFees = null;
  }

  getPrice(type) {
    for (const price of this.prices) {
      if (price.type == type) {
        return price.value;
      }
    }
    return null;
  }
}