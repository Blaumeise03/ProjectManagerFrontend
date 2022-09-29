import Item from '~/assets/data/Item.class'
import Price from '~/assets/data/Price.class'

export default class ItemApi {
  constructor($axios) {
    this.axios = $axios
  }

  findById(id) {
    if (id == null || id == -1) return null;

    return this.axios({
      method: 'get',
      url: 'item/' + id,
      withCredentials: true
    }).then((response) => {
      const d = response.data;
      return new Item(d.itemID, d.itemName, d.itemType, d.order);
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return null;
    })
  }

  findFullById(id) {
    if (id == null || id == -1) return null;

    return this.axios({
      method: 'get',
      url: 'item/' + id + '/full',
      withCredentials: true
    }).then((response) => {
      const d = response.data;
      return Item.parseFullItem(d);
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return null;
    })
  }

  findByName(name) {
    if (name == null || name == -1) return null;

    return this.axios({
      method: 'get',
      url: 'item/byName/' + name,
      withCredentials: true
    }).then((response) => {
      const d = response.data;
      return Item.parseFullItem(d);
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return null;
    })
  }

  findFullAll() {
    return this.axios({
      method: 'get',
      url: 'item/full',
      withCredentials: true
    }).then((response) => {
      const d = response.data;
      var items = [];
      response.data.forEach((d) => {
        items.push(Item.parseFullItem(d));
      })
      return items;
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return [];
    })
  }

  findAllNames() {
    return this.axios({
      method: 'get',
      url: 'item/allNames',
      withCredentials: true
    }).then((response) => {
      const d = response.data;
      var items = [];
      response.data.forEach((d) => {
        items.push(d);
      })
      return items;
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return [];
    })
  }

  loadPrices(item) {
    if (item == null) return null;

    return this.axios({
      method: 'get',
      url: 'item/' + item.itemID + '/price',
      withCredentials: true
    }).then((response) => {
      item.prices = [];
      response.data.forEach((d) => {
        item.prices.push(new Price(d.item, d.priceType, d.value));
      });
      return item;
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return null;
    })
  }

  batchLoadPricesByIDs(ids) {
    if (ids == null) return null;
    return this.axios({
      method: 'post',
      url: 'item/prices',
      data: ids,
      withCredentials: true
    }).then((response) => {
      let res = response.data;
      return res;
    }).catch(() => {
      return [];
    })
  }

  loadBlueprint(item) {
    if (item == null) return null;

    return this.axios({
      method: 'get',
      url: 'item/' + item.itemID + '/blueprint',
      withCredentials: true
    }).then((response) => {
      item.blueprint = {};
      item.blueprint.baseCost = [];
      item.blueprint.stationFees = response.data.stationFees;
      item.blueprint.resultQuantity = response.data.resultQuantity;
      response.data.baseCost.forEach((d) => {
        item.blueprint.baseCost[d.item] = d.quantity;
      });
      return item;
    }).catch((error) => {
      if (!error.intercepted) {
        throw error.error;
      }
      return null;
    });
  }

  save(item) {
    return this.axios({
      method: 'post',
      url: 'item',
      data: this.itemToJSON(item),
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

  deleteItem(id) {
    return this.axios({
      method: 'delete',
      url: 'item/' + id,
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

  itemToJSON(item) {
    var res = {
      itemID: item.itemID,
      itemName: item.name,
      itemType: item.type,
      order: item.order == -1 ? null : item.order
    };
    if (item.blueprint != null) {
      res.blueprint = {};
      res.blueprint.baseCost = [];
      item.blueprint.baseCost.forEach((b) => {
        res.blueprint.baseCost.push({
          item: b.itemID,
          quantity: b.quantity
        });
      });
      res.blueprint.resultQuantity = item.blueprint.resultQuantity;
      res.blueprint.stationFees = item.blueprint.stationFees;
    }
    if (item.prices != null) {
      res.prices = [];
      item.prices.forEach((p) => {
        res.prices.push({
          item: p.item,
          priceType: p.type,
          value: p.value
        });
      });
    }
    return res;
  }
}
