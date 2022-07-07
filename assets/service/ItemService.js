import Item from '~/assets/data/Item.class'
import Price from '~/assets/data/Price.class'

export default class ItemApi {
  constructor($axios) {
    this.axios = $axios
  }

  findById(id) {
    //console.log(id)
    if (id == null || id == -1) return null;

    return this.axios({
      method: 'get',
      url: 'item/' + id,
      withCredentials: true
    }).then((response) => {
      const d = response.data;
      return new Item(d.itemID, d.itemName, d.itemType);
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
      return this.parseFullItem(d);
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
      return this.parseFullItem(d);
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
        items.push(this.parseFullItem(d));
      })
      return items;
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
    })
  }

  loadBlueprint(item) {
    if (item == null) return null;

    return this.axios({
      method: 'get',
      url: 'item/' + item.itemID + '/blueprint',
      withCredentials: true
    }).then((response) => {
      item.baseCost = {};
      item.stationFees = response.data.stationFees;
      item.resultQuantity = response.data.resultQuantity;
      response.data.baseCost.forEach((d) => {
        item.baseCost[d.item] = d.quantity;
      });

      return item;
    })
  }

  parseFullItem(data) {
    var item = new Item(data.itemID, data.itemName, data.itemType);
    if (data.prices != null) {
      data.prices.forEach((p) => {
        item.prices.push(new Price(p.item, p.priceType, p.value));
      });
    }
    if (data.blueprint != null) {
      this.parseBlueprint(item, data.blueprint)
    }
    return item;
  }

  save(item) {
    return this.axios({
      method: 'post',
      url: 'item',
      data: this.itemToJSON(item),
      withCredentials: true
    }).then((response) => {
      return true;
    }).catch(() => {
      return false;
    })
  }

  itemToJSON(item) {
    var res = {
      itemID: item.itemID,
      itemName: item.name,
      itemType: item.type
    };
    if (item.baseCost != null) {
      res.blueprint = {};
      res.blueprint.baseCost = [];
      item.baseCost.forEach((b) => {
        res.blueprint.baseCost.push({
          item: b.itemID,
          quantity: b.quantity
        });
      });
      res.blueprint.resultQuantity = item.resultQuantity;
      res.blueprint.stationFees = item.stationFees;
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

  parseBlueprint(item, bp) {
    item.baseCost = [];
    bp.baseCost.forEach((b) => {
      item.baseCost.push({
        itemID: b.item,
        itemName: b.itemName,
        quantity: b.quantity
      });
    });
    item.resultQuantity = bp.resultQuantity;
    item.stationFees = bp.stationFees;
  }
}
