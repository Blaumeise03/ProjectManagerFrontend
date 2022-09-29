<template>
  <div>
    <h2>Kosten</h2>
    <!--div class="form-check form-switch">
      <input v-model.boolean="edit" class="form-check-input" type="checkbox" id="editModeSwitch" name="editMode" value="true" checked>
      <label class="form-check-label" for="editModeSwitch">Edit Mode</label>
    <div-->
    <div class="table-responsive">
      <table class="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th v-if="edit">ID</th>
            <th v-if="edit">Order</th>
            <th v-if="edit">Edit</th>
            <th>Item</th>
            <th>Fertig</th>
            <th>Geplant</th>
            <th>Effizienz</th>
            <th>Stationsgebühr</th>
            <th>Blueprint</th>
            <th v-for="item in costTypes" nowrap>{{ item.name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="project.content.length == 0"></tr>
          <project-content-row v-for="content in project.content" class="project-content" :edit="edit" :projectContent="content" :parent="getParent(content.parent)" :costTypes="costTypes" :key="'pc-' + content.id" />
        </tbody>
        <tfoot>
          <tr class="content-child" data-bs-toggle="collapse" data-bs-target=".contentPrices">
            <td v-if="edit"></td>
            <td v-if="edit"></td>
            <td v-if="edit"></td>
            <td><i class="bi bi-caret-down"></i>Kosten</td>
            <td></td>
            <td></td>
            <td></td>
            <td>{{ project.iskCosts }} ISK</td>
            <td></td>
            <td v-for="sum in sums" nowrap>{{ sum.price }} ISK</td>
          </tr>
          <tr class="content-child collapse no-transition contentPrices">
            <td v-if="edit"></td>
            <td v-if="edit"></td>
            <td v-if="edit"></td>
            <td>Summe</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td v-for="sum in sums">{{ sum.amount }}</td>
          </tr>
          <tr class="content-child collapse no-transition contentPrices">
            <td v-if="edit"></td>
            <td v-if="edit"></td>
            <td v-if="edit"></td>
            <td>Ausstehend</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td v-for="sum in sums">{{ sum.pending }}</td>
          </tr>
          <tr class="content-child collapse no-transition contentPrices">
            <td v-if="edit"></td>
            <td v-if="edit"></td>
            <td v-if="edit"></td>
            <td>Marktpreis</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td v-for="item in costTypes" nowrap>{{ getPriceString(item) }} ISK</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="mt-2">
      <h3>Item hinzufügen</h3>
      <div class="row">
        <div class="input-group col-md mt-2">
          <!--Add Item Data-->
          <button class="btn btn-outline-primary" type="button" @click="addContent()"><i class="bi bi-plus-circle"></i></button>
          <datalist id="itemNames">
            <option v-for="name in itemNames">{{ name }}</option>
          </datalist>
          <input v-model="newContentItemName" type="text" list="itemNames" class="form-control min-1" id="newContentItemName" autocomplete="on" placeholder="Item Name" pattern="[a-zA-Z0-9]*( *[a-zA-Z0-9]+)*" />
        </div>
        <div class="input-group col-md mt-2">
          <span class="input-group-text">Menge: </span>
          <input v-model.number="newContentQuantity" type="number" min="1" step="1" class="form-control min-1" id="newContentQ" required pattern="[0-9]+" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProjectContentRow from "~/components/project/ProjectContentRow.vue"

  export default {
    components: {
      ProjectContentRow
    },
    props: {
      project: {
        type: Object,
        default() {
          return null;
        }
      },
      itemNames: {
        type: Array,
        default() {
          return [];
        }
      },
      edit: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    data() {
      return {
        /* Headers for the table
         * Format:
         * {
         *    id: Number,
         *    name: String,
         *    sum: Number //Optional
         * }
         */
        costTypes: [],
        sums:[],
        newContentItemName: "",
        newContentQuantity: 1,
        itemSum: []
      }
    },
    computed: {

    },
    methods: {
      getParent(id) {
        for (let c of this.project.content) {
          if (c.id == id) return c;
        }
        return null;
      },
      deleteContent(id) {
        for (let i in this.project.content) {
          if (this.project.content[i].id === id) {
            for (let c of this.project.content[i].childs) {
              this.deleteContent(c.id);
            }
            this.project.content.splice(i, 1);
            break;
          }
        }
      },
      async addContent() {
        let item = await this.$services.item.findByName(this.newContentItemName);
        if (item) {
          let order = 0;
          let id = -1;
          for (let content of this.project.content) {
            if (!content.isChild && content.order >= order) {
              order = content.order + 1;
            }
            if (content.id <= id) {
              id = content.id - 1;
            }
          }
          this.project.content.push({
            amount: this.newContentQuantity,
            auto: false,
            build: 0,
            childs: [],
            efficiency: 0.92,
            id: id,
            isChild: false,
            item: item,
            itemID: item.itemID,
            order: order,
            parent: null,
            project: this.project.id
          });
          this.updateOrder;
          this.newContentQuantity = 1;
          this.newContentItemName = "";
          }
      },
      moveContentUp(element) {
        this.moveContent(element, -1);
        this.updateOrder();
      },
      moveContentDown(element) {
        this.moveContent(element, 1);
        this.updateOrder();
      },
      updateOrder() {
        this.$services.project.orderProjectContent(this.project);
      },
      moveContent(element, offset) {
        function findNextMain(array, index, direction) {
          for (let i = index; i >= 0 && i < array.length; i += direction) {
            if (i != index && array[i].isChild == false) return i;
          }
          return null;
        }

        let array = null;
        if (element.parent == null) {
          array = this.project.content;
        } else {
          for (let el of this.project.content) {
            if (el.id == element.parent) {
              array = el.childs;
              break;
            }
          }
        }
        for (let i in array) {
          i = parseInt(i);
          if (array[i] == element) {
            if (offset < 0 && i > 0) {
              let o = element.order;
              let n = -1;
              if (element.isChild) n = i - 1;
              else n = findNextMain(array, i, -1);
              if (n != null) {
                element.order = array[n].order;
                array[n].order = o;
              }
            } else if (offset > 0 && i < array.length - 1) {
              let o = element.order;
              let n = -1;
              if (element.isChild) n = i + 1;
              else n = findNextMain(array, i, 1);
              if (n != null) {
                element.order = array[n].order;
                array[n].order = o;
              }
            }
            break;
          }
        }
      },
      makeContentParent(element) {
        if (element.isChild) {
          let index = this.project.content.indexOf(element);
          let newOrder = null;
          for (let i = index + 1; i < this.project.content.length; i++) {
            let el = this.project.content[i];
            if (!el.isChild) {
              if (newOrder == null) newOrder = el.order;
              el.order++;
            }
          }
          if (newOrder == null) {
            for (let i = this.project.content.length - 1; i >= 0; i--) {
              let el = this.project.content[i];
              if (!el.isChild) {
                if (newOrder == null) newOrder = el.order + 1;
                break;
              }
            }
          }
          element.order = newOrder;
          for (let e of this.project.content) {
            if (e.id === element.parent) {
              let ind = -1;
              for (let i in e.childs) {
                if (e.childs[i].id == element.id) {
                  ind = i;
                  break;
                }
              }
              if (ind >= 0) e.childs.splice(ind, 1);
              break;
            }
          }
          element.parent = null;
          element.auto = false;
          element.isChild = false;
          this.updateOrder();
        }
      },
      makeContentChild(element) {
        let index = this.project.content.indexOf(element);
        if (index > 0) {
          for (let i = index - 1; i >= 0; i--) {
            let el = this.project.content[i];
            if (!el.isChild) {
              el.childs.push(element);
              element.isChild = true;
              element.parent = el.id;
              for (let e of element.childs) {
                el.childs.push(e);
                e.parent = el.id;
              }
              element.childs = [];
              element.auto = true;
              this.updateOrder;
              return;
            }
          }
        }
        console.warn("Can't make content " + element.id + " at index " + index + " to child!")
      },
      computeSum() {
        for (let item of this.costTypes) {
          item.sum = 0;
          item.pending = 0;
          for (let content of this.project.content) {
            if (content.item.blueprint) {
              let parent = this.getParent(content.parent);
              for (let cost of content.item.blueprint.baseCost) {
                if (cost.itemID === item.id) {
                  let amount = content.amount;
                  let build = 0;
                  if (content.auto === true && parent) {
                    amount = parent.amount * content.amount;
                    build = parent.build * content.amount;
                  } else {
                    build = content.build;
                  }
                  item.sum += (cost.quantity / 1.5 * content.efficiency * amount);
                  item.pending += (cost.quantity / 1.5 * content.efficiency * (amount - build))
                  break;
                }
              }
            }
          }
        }
        let iskCosts = 0;
        for (let content of this.project.content) {
          if (content.item.blueprint) {
            let amount = content.amount;
            let parent = this.getParent(content.parent);
            if (content.auto === true && parent) {
              amount = parent.amount * content.amount;
            }
            iskCosts += content.item.blueprint.stationFees * amount;
          }
        }
        this.sums = [];
        for (let i in this.costTypes) {
          let price = this.getPrice(this.costTypes[i]);
          this.sums[i] = {
            amount: this.costTypes[i].sum.toLocaleString("en-US", { maximumFractionDigits: 0 }),
            pending: this.costTypes[i].pending.toLocaleString("en-US", { maximumFractionDigits: 0 }),
            price: (this.costTypes[i].sum * price).toLocaleString("en-US", { maximumFractionDigits: 0 })
          };
        }
        this.project.iskCosts = iskCosts.toLocaleString("en-US", { maximumFractionDigits: 0 });
      },
      getPrice(costType) {
        if (costType && costType.prices) {
          for (let p of costType.prices) {
            if (p.priceType == this.project.defaultPrice) {
              return p.value;
            }
          }
        }
        return 0;
      },
      getPriceString(costType) {
        return this.getPrice(costType).toLocaleString("en-US");
      }
    },
    async mounted() {
      let res = [];
      for (let content of this.project.content) {
        if (content.item.blueprint) {
          for (let bCost of content.item.blueprint.baseCost) {
            let exists = false;
            for (let t of res) {
              if (t.id == bCost.itemID) {
                exists = true;
                break;
              }
            }
            if (!exists) {
              res.push({
                id: bCost.itemID,
                name: bCost.itemName
              });
            }
          }
        }
      }
      this.costTypes = res;
      let costIDs = [];
      for (let c of this.costTypes) {
        costIDs.push(c.id);
      }
      let prices = await this.$services.item.batchLoadPricesByIDs(costIDs);
      for (let c of this.costTypes) {
        c.prices = [];
        for (let [id, p] of Object.entries(prices)) {
          if (id == c.id) {
            c.prices = p;
            break;
          }
        }
      }
      this.computeSum();
    }
  }
</script>

<style lang="scss">

  /*//Stick table column
    thead th {
    position: -webkit-sticky; /* for Safari *
    position: sticky;
    top: 0;
  }

  thead th:first-child {
    left: 0;
    background-color: white;
    border: none;
    z-index: 5;
    box-shadow: 1px 0 0 0 #ccc, -1px 0 0 0 #ccc, 0 2px 0 0 #000, 0 -1px 0 0 #ccc;
  }

  tbody td:first-child {
    position: -webkit-sticky; /* for Safari *
    position: sticky;
    background-color: white;
    left: 0;
    z-index: 4;
    border: none;
    box-shadow: 1px 0 0 0 #ccc, -1px 0 0 0 #ccc, 0 1px 0 0 #ccc, 0 -1px 0 0 #ccc;
  }

  .project-table {
    overflow: scroll;
  }*/

  .content-child {
    td {
      padding-top: 0px;
      padding-bottom: 0px;
    }

    .content-name {
      font-style: italic;
      padding-left: 20px;
    }
  }

  .project-content {
    .form-control-plaintext {
      padding-top: 0px;
      padding-bottom: 0px;
    }
  }
</style>
