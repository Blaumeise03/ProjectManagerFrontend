<template>
  <div class="">
    <div class="table-responsive-lg box p-2">
      <table class="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th v-if="edit">Edit</th>
            <th>Name</th>
            <th>Menge</th>
          </tr>
        </thead>
        <tbody>
          <contract-item v-for="item in items" :contractItem="item" :edit="edit" :key="'ci-' + item.id" />
        </tbody>
      </table>
    </div>

    <div v-if="edit" class="mt-2 box p-2">
      <h4>Item hinzufügen</h4>
      <div class="row">
        <div class="input-group col-md mt-2">
          <!--Add Item Data-->
          <button class="btn btn-outline-primary" type="button" @click="addItem()"><i class="bi bi-plus-circle"></i></button>
          <datalist id="itemNames">
            <option v-for="name in itemNames">{{ name }}</option>
          </datalist>
          <input v-model="newItemName" type="text" list="itemNames" class="form-control min-1" id="newItemName" autocomplete="off" placeholder="Item Name" pattern="[a-zA-Z0-9]*( *[a-zA-Z0-9]+)*" />
        </div>
        <div class="input-group col-md mt-2">
          <span class="input-group-text">Menge: </span>
          <input v-model.number="newItemQuantity" type="number" min="1" step="1" class="form-control min-1" id="newQuantity" required pattern="[0-9]+" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ContractItem from "~/components/project/contract/ContractItem.vue"

  export default {
    components: {
      ContractItem
    },
    props: {
      items: {
        type: Array,
        default() {
          return [];
        }
      },
      contractID: {
        type: Number,
        default() {
          return -1;
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
          return true;
        }
      }
    },
    data() {
      return {
        newItemName: "",
        newItemQuantity: 1,
        nextItemID: -1
      }
    },
    methods: {
      async addItem() {
        let item = await this.$services.item.findByName(this.newItemName);
        if (item) {
          this.items.push({
            contractID: this.contractID,
            id: this.nextItemID,
            item: item,
            quantity: this.newItemQuantity
          })
          this.nextItemID--;
          this.newItemQuantity = 1
          this.newItemName = ""
        }
      },
      deleteItem(id) {
        for (let i in this.items) {
          if (this.items[i].id === id) {
            this.items.splice(i, 1);
            break;
          }
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
