import Price from '~/assets/data/Price.class'

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

  static parseFullItem(data) {
    var item = new Item(data.itemID, data.itemName, data.itemType);
    if (data.prices != null && data.prices != undefined) {
      data.prices.forEach((p) => {
        item.prices.push(new Price(p.item, p.priceType, p.value));
      });
    }
    if (data.blueprint != null && data.blueprint != undefined) {
      Item.parseBlueprint(item, data.blueprint)
    }
    return item;
  }

  static parseBlueprint(item, bp) {
    item.blueprint = {};
    item.blueprint.baseCost = [];
    bp.baseCost.forEach((b) => {
      item.blueprint.baseCost.push({
        itemID: b.item,
        itemName: b.itemName,
        quantity: b.quantity
      });
    });
    item.blueprint.resultQuantity = bp.resultQuantity;
    item.blueprint.stationFees = bp.stationFees;
  }
}
