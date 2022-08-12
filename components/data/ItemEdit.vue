<template>
  <div class="container-md box p-2">
    <button data-bs-toggle="collapse" data-bs-target="#editItemForm" class="btn btn-primary" @click="toggleVis">
      <span>Bearbeiten...</span>
    </button>

    <div id="editItemForm" class="collapse ">
      <form class="" :class="{'was-validated': unsavedChanges}" @submit.prevent="create">
        <!--General Data-->
        <h3>Grunddaten</h3>
        <div class="form-group row">
          <!--Item ID-->
          <div class="col-sm-4">
            <label for="itemID">ID:</label>
            <input v-model.number="item.itemID" type="number" class="form-control" id="itemID" disabled="true" />
            <div class="invalid-feedback">Muss eine ganze Zahl sein</div>
          </div>
          <!--Item Name-->
          <div class="col-sm-4">
            <label for="itemName">Name: </label>
            <input v-model="item.name" type="text" class="form-control" id="itemName" required pattern="[a-zA-Z0-9]+( *[a-zA-Z0-9]+)*" />
            <div class="invalid-feedback">Nur Buchstaben, Zahlen und Leerzeichen erlaubt</div>
          </div>
          <!--Item Type-->
          <div class="col-sm-4">
            <label for="itemType" class="">Typ: </label>
            <select v-model="item.type" type="text" class="form-select" id="itemType">
              <option v-for="type in itemTypes">{{ type }}</option>
            </select>
          </div>
        </div>
        <!--Start of Blueprint-->
        <div class="form-check form-switch mt-1">
          <input class="form-check-input" v-model.boolean="hasBp" type="checkbox" id="hasBp" name="blueprint" @change="changeBp">
          <label class="form-check-label" for="hasBp">Blueprint</label>
        </div>
        <div id="blueprintInput" class="mt-2 pt-2 border-top border-secondary" v-if="item.blueprint">
          <div class="form-group row">
            <h3>Blueprint<button type="button" class="btn btn-danger ms-2" @click="deleteBp"><i class="bi bi-trash"></i></button></h3>
            <div class="col-sm-6">
              <label for="itemResQ">Menge pro BP:</label>
              <input v-model.number="item.blueprint.resultQuantity" min="1" type="number" class="form-control t-input" id="itemResQ" required pattern="[0-9]+" />
              <div class="invalid-feedback">Ganze Zahl größer als 0 erwartet</div>
            </div>
            <div class="col-sm-6">
              <label for="itemFees" class="">Stationsgebühren: </label>
              <input v-model.number="item.blueprint.stationFees" min="0" type="number" class="form-control t-input" id="itemFees" required pattern="[0-9]+" />
              <div class="invalid-feedback">Ganze Zahl erwartet</div>
            </div>
          </div>

          <div class="mt-2">
            <!--List for Blueprint Base Cost-->
            <h4>Item Kosten (bei 150%)</h4>
            <div v-for="c in item.blueprint.baseCost">
              <label :for="'itemBp-' + c.itemID">{{ c.itemName }}</label>
              <div class="input-group">
                <button class="btn btn-danger" @click="deleteCost(c.itemID)"><i class="bi bi-trash" /></button>
                <input v-model.number="item.blueprint.baseCost[getResIndex(c.itemID)].quantity" min="1" type="number" class="form-control" :id="'itemBp-' + c.itemID" required pattern="[0-9]+" />
              </div>
            </div>
            <!--Add Item Input-->
            <div class="input-group mt-2">
              <!--Add Item Data-->
              <button class="btn btn-outline-primary" type="button" @click="saveNewItem"><i class="bi bi-plus-circle"></i></button>
              <input v-model="newItemName" type="text" list="itemNames" class="form-control min-1" id="newItemName" autocomplete="off" placeholder="Item Name" pattern="[a-zA-Z0-9]*( *[a-zA-Z0-9]+)*" />
              <span class="input-group-text">Menge: </span>
              <input v-model.number="newItemQuantity" type="number" min="1" step="1" class="form-control min-1" id="newItemQ" required pattern="[0-9]+" />

              <datalist id="itemNames">
                <option v-for="name in itemNames">{{ name }}</option>
              </datalist>
            </div>
          </div>
        </div>
        <!--Price data-->
        <div>
          <h3>Preise</h3>
          <div v-for="p in item.prices">
            <label :for="'itemPrice-' + p.item + '-' + p.type">{{ p.type }}</label>
            <div class="input-group">
              <button class="btn btn-danger" @click="deletePrice(p)"><i class="bi bi-trash" /></button>
              <input v-model.number="p.value" min="1" type="number" class="form-control" :id="'itemPrice-' + p.item + '-' + p.type" required pattern="[0-9]+(.[0-9]+)?" />
            </div>
          </div>
          <div class="input-group mt-2">
            <!--Add Price Data-->
            <button class="btn btn-outline-primary" type="button" @click="saveNewPrice"><i class="bi bi-plus-circle"></i></button>
            <input v-model="newPrice.type" type="text" list="priceTypes" class="form-control min-1" id="newPriceType" autocomplete="off" placeholder="Price Typ" pattern="[a-zA-Z]+([_\-]+[a-zA-Z]+)*" />
            <span class="input-group-text">Wert: </span>
            <input v-model.number="newPrice.value" type="number" min="1" step="1" class="form-control min-1" id="newPriceValue" required pattern="[0-9]+(.[0-9]+)?" />

            <datalist id="priceTypes">
              <option v-for="type in priceTypes">{{ type }}</option>
            </datalist>
          </div>
        </div>
        <!--Error alert-->
        <div class="alert alert-danger" v-if="errorMsg != null">
          <strong>Fehler!</strong> {{ errorMsg }}
        </div>
        <!--Save + delete button-->
        <div class="d-flex align-items-center pt-2">
          <div class="form-group">
            <button class="btn btn-primary" @click="save">
              Speichern
            </button>
            <button type="button" class="btn btn-danger" id="delete" @click="deleteItem()">
              <i class="bi bi-trash" />
            </button>
          </div>
          <div class="alert alert-warning ms-2" v-if="unsavedChanges">
            <strong>Achtung!</strong> Ungespeicherte Änderungen!
          </div>
        </div>
      </form>
    </div>
    <!--Toasts-->
    <div class="position-fixed bottom-0 center p-3" style="z-index: 11">
      <div id="saveToast" class="toast border hide" :class="'border-' + saveToast.color" data-bs-delay="5000">
        <div class="toast-header" id="saveToastHeader">
          {{ saveToast.header }}
          <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body" id="saveToastBody">
          {{ saveToast.body }}
        </div>
        <div class="progress save-bar-parent" id="stBarP">
          <div id="stBar" class="progress-bar save-bar" :class="'bg-' + saveToast.color"></div>
        </div>
      </div>
    </div>
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
        priceTypes: [
          "MARKET_LOWEST_SELL",
          "MARKET_SELL",
          "MARKET_BUY",
          "VCB_SELL",
          "VCB_BUY"
        ],
        hasBp: false,
        addItem: false,
        visible: false,
        newItemVis: false,
        newItemName: "",
        newItemQuantity: 1,
        errorMsg: null,
        unsavedChanges: false,
        saveToast: {
          color: "success",
          header: "Gespeichert!",
          body: "Das Item wurde gespeichert."
        },
        newPrice: {
          type: "",
          value: 0
        }
      }
    },
    props: {
      item: {
        type: Object,
        default() {
          return new Item(null, "Name", "OTHER_ITEMS");
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
        for (const i in this.item.blueprint.baseCost) {
          if (this.item.blueprint.baseCost[i].itemID == id) {
            return i;
          }
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
        for (const i in this.item.blueprint.baseCost) {
          if (this.item.blueprint.baseCost[i].itemID == id) {
            this.item.blueprint.baseCost.splice(i, 1);
            return;
          }
        }
      },
      changeBp() {
        if (this.hasBp && this.item.blueprint == null) {
          this.item.blueprint = {
            resultQuantity: 1,
            stationFees: 0,
            baseCost: []
          };
          document.getElementById("hasBp").disabled = true;
        } else {

        }
      },
      deleteBp() {
        this.item.blueprint = null;
        this.hasBp = false;
        document.getElementById("hasBp").disabled = false;
      },
      saveNewPrice() {
        this.item.prices.push({
          item: this.item.itemID,
          type: this.newPrice.type,
          value: this.newPrice.value
        });
      },
      deletePrice(price) {
        for (const i in this.item.prices) {
          if (this.item.prices[i] == price) {
            this.item.prices.splice(i, 1);
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
        for (let i of this.item.blueprint.baseCost) {
          if (i.itemID == item.itemID) {
            this.errorMsg = "Dieses Item ist bereits vorhanden!";
            console.error("Item with ID " + i.itemID + " does already exist!");
            return;
          }
        }
        this.errorMsg = null;
        this.item.blueprint.baseCost.push({
          itemID: item.itemID,
          itemName: item.name,
          quantity: this.newItemQuantity
        });
      },
      async save() {
        const res = await this.$services.item.save(this.item);
        if (res) {
          this.unsavedChanges = false;
          let toast = bootstrap.Toast.getOrCreateInstance(document.getElementById("saveToast"));
          document.getElementById("saveToast").addEventListener('shown.bs.toast', function (event) {
            document.getElementById("stBar").classList.add("shrink");
          })
          toast.show();
          new Promise(resolve => setTimeout(resolve, 100)).then(() => {
            
          });
          
        }
      },
      async deleteItem() {
        const res = await this.$services.item.deleteItem(this.item.itemID);
        
        if (res) {
          this.saveToast.color = "danger";
          this.saveToast.header = "Gelöscht!";
          this.saveToast.body = "Das Item wurde gelöscht!";
          document.getElementById("saveToast").addEventListener('shown.bs.toast', function (event) {
            document.getElementById("stBar").classList.add("shrink");
          })
          new Promise(resolve => setTimeout(resolve, 200)).then(() => {
            //Has to be inside a promise to wait until nuxt has refreshed the page
            let toast = bootstrap.Toast.getOrCreateInstance(document.getElementById("saveToast"));
            toast.show();
          });
        }
      }
    },
    watch: {
      item: {
        deep: true,
        handler(n, o) {
          this.unsavedChanges = true;
        }
      }
    },
    mounted() {
      this.hasBp = this.item.blueprint != undefined && this.item.blueprint != null;
      if (this.hasBp) {
        document.getElementById("hasBp").disabled = true;
      }
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

  .center {
    left: 50%;
    transform: translateX(-50%);
  }

  .min-1 {
    flex-basis: 200px !important;
  }

</style>
