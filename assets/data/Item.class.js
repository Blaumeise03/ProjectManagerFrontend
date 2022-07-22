export default class Item {
  constructor(itemID, name, type) {
    this.itemID = itemID;
    this.name = name;
    this.type = type;
    /*
     * Prices:
     * [
     *    {
     *      item: Number, //ItemID
     *      type: String, //Price Type
     *      value: Number
     *    }
     * ]
     */
    this.prices = [];
    /*
     * Blueprint-Object:
     * resultQuantity: Number,
     * stationFees: Number,
     * baseCost: [
     *   {
     *    itemID: Number,
     *    itemName: String,
     *    quantity: Number
     *   }
     * ]
     */
    this.blueprint = null;
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
