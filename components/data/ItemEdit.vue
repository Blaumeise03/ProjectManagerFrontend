<template>
  <div class="container-md box p-2">
    <button data-bs-toggle="collapse" data-bs-target="#editItemForm" class="btn btn-primary" @click="toggleVis">
      <span>Item</span>
    </button>

    <div id="editItemForm" class="collapse">
      <form class="" @submit.prevent="create">
        <h3>Grunddaten</h3>
        <div class="form-group row">
          <div class="col-sm-4">
            <label for="itemID">ID:</label>
            <input v-model.number="item.itemID" type="number" class="form-control" id="itemID" />
          </div>
          <div class="col-sm-4">
            <label for="itemName">Name: </label>
            <input v-model="item.name" type="text" class="form-control" id="itemName" />
          </div>
          <div class="col-sm-4">
            <label for="itemType" class="">Typ: </label>
            <select v-model="item.type" type="text" class="form-select" id="itemType">
              <option v-for="type in itemTypes">{{ type }}</option>
            </select>
          </div>
        </div>

        <h3>Blueprint</h3>
        <div class="form-group row">
          <div class="col-sm-6">
            <label for="itemResQ">Menge pro BP:</label>
            <input v-model.number="item.resultQuantity" min="0" type="number" class="form-control t-input" id="itemResQ" />
          </div>
          <div class="col-sm-6">
            <label for="itemFees" class="">Stationsgebühren: </label>
            <input v-model.number="item.stationFees" min="0" type="number" class="form-control t-input" id="itemFees" />
          </div>
        </div>
        <h4>Blueprint Items</h4>
        <div class="">
          <div v-for="c in item.baseCost">
            <label :for="'itemBp-' + c.itemID">{{ c.itemName }}</label>
            <div class="input-group">
              <button class="btn btn-danger" @click="deleteCost(c.itemID)"><i class="bi bi-trash" /></button>
              <input v-model.number="item.baseCost[getResIndex(c.itemID)].quantity" min="0" type="number" class="form-control" :id="'itemBp-' + c.itemID" />
            </div>
          </div>
          <div class="pt-4">
            <button class="btn" :class="[newItemVis? 'btn-secondary' : 'btn-success']" data-bs-toggle="collapse" data-bs-target="#addBpItem" @click="toggleNewItemVis">
              <span v-if="!newItemVis"><i class="bi bi-caret-right" /></span>
              <span v-else><i class="bi bi-caret-down" /></span>
            </button>
            <div id="addBpItem" class="form-group row collapse p-2 px-4">
              <div class="input-group mt-2">
                <button class="btn btn-outline-primary" type="button" @click="saveNewItem"><i class="bi bi-plus-circle"></i></button>
                <input v-model="newItemName" type="text" list="itemNames" class="form-control min-1" id="newItemName" autocomplete="off" placeholder="Item Name" />
                <span class="input-group-text">Menge: </span>
                <input v-model.number="newItemQuantity" type="number" min="1" step="1" class="form-control min-1" id="newItemQ" />
                <datalist id="itemNames">
                  <option v-for="name in itemNames">{{ name }}</option>
                </datalist>
              </div>
            </div>
          </div>
        </div>

        <div class="alert alert-danger" v-if="errorMsg != null">
          <strong>Fehler!</strong> {{ errorMsg }}
        </div>

        <div class="form-group pt-2">
          <button class="btn btn-primary" @click="save">
            Speichern
          </button>
        </div>
      </form>
    </div>
    <!--Toasts-->

  </div>
</template>

<script>
  import Item from "~/assets/data/Item.class";
  import moment from "moment";

  export default {
    data() {
      return {
        itemTypes: [
          "PILOT_SERVICE",
          "SHIPS",
          "HIGH_SLOTS",
          "MID_SLOTS",
          "LOW_SLOTS",
          "COMBAT_RIGS",
          "ENGINEER_RIGS",
          "STRUCTURES",
          "MINERALS",
          "RAW_ORES",
          "PLANETARY_RESSOURCE",
          "REPROCESSING_MATERIALS",
          "VESSEL_DEBRIS",
          "DATA",
          "NANOCORE_MATERIALS",
          "COMPONENTS",
          "SHIP_BLUEPRINTS",
          "MODULE_BLUEPRINTS",
          "DRONE_BLUEPRINTS",
          "RIG_BLUEPRINTS",
          "STRUCTURE_BLUEPRINTS",
          "COMPONENT_BLUEPRINTS",
          "FIGHTER_BLUEPRINTS",
          "NANOCORES",
          "SHIP_SKINS",
          "OTHER_ITEMS"
        ],
        addItem: false,
        visible: false,
        newItemVis: false,
        newItemName: "",
        newItemQuantity: 1,
        errorMsg: null,
      }
    },
    props: {
      item: {
        type: Object,
        default() {
          return {};
        }
      },
      itemNames: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    computed: {

    },
    methods: {
      create() {

      },
      getResIndex(id) {
        for (const i in this.item.baseCost) {
          if (this.item.baseCost[i].itemID == id) return i;
        }
        return 0;
      },
      toggleAddItem() {
        this.addItem = !this.addItem;
      },
      toggleVis() {
        this.visible = !this.visible
      },
      toggleNewItemVis() {
        this.newItemVis = !this.newItemVis
      },
      deleteCost(id) {
        for (const i in this.item.baseCost) {
          if (this.item.baseCost[i].itemID == id) {
            this.item.baseCost.splice(i, 1);
            return;
          }
        }
      },
      saveNewItem: async function () {
        if (this.newItemName == "") {
          this.errorMsg = "Das Item darf nicht leer sein!";
          return;
        }
        const item = await this.$services.item.findByName(this.newItemName);
        if (item.itemID == this.item.itemID) {
          this.errorMsg = "Das Item darf nicht sich selbst als Kosten enthalten";
          console.error("Base Cost may not contain itself (item ID " + item.itemID);
          return;
        }
        for (let i of this.item.baseCost) {
          if (i.itemID == item.itemID) {
            this.errorMsg = "Dieses Item ist bereits vorhanden!";
            console.error("Item with ID " + i.itemID + " does already exist!");
            return;
          }
        }
        this.errorMsg = null;
        this.item.baseCost.push({
          itemID: item.itemID,
          itemName: item.name,
          quantity: this.newItemQuantity
        });
      },
      async save() {
        const res = await this.$services.item.save(this.item);
      }
    },
    mounted() {
      //console.log("ItemEdit.vue mounted");
      //var timeString = new Date().toISOString();
    },
    updated() {
      //Without this line, the form collapes on first update() and has to be re-opened
      if (this.visible) {
        document.getElementById('editItemForm').classList.add('show');
      }
      if (this.newItemVis) {
        document.getElementById('addBpItem').classList.add('show');
      }
    }
  }
</script>

<style lang="scss">
  .lockedInput {
    background-color: #494949 !important;
    border-color: #494949 !important;
  }

  .hidden {
    display: none;
  }

  .min-1 {
      flex-basis: 200px !important;
  }
</style>
