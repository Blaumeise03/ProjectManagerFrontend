<template>
  <tr>
    <td v-if="edit"><button type="button" class="del-btn btn btn-danger py-0 px-2 mx-1" @click="deleteItem()"><i class="bi bi-trash"></i></button></td>
    <td class="" >
      <div class="d-inline-flex cell-l">
        <button v-if="changed" type="button" class="del-btn btn btn-success py-0 px-2 mx-1" @click="changeItem()"><i class="bi bi-check"></i></button>
        <input v-model="itemName" type="text" class="form-control-plaintext py-0" :disabled="!edit" />
      </div>
    </td>
    <td><input v-model.number="contractItem.quantity" type="number" min="0" step="1" class="form-control-plaintext cell-m py-0" :disabled="!edit" /></td>
  </tr>
</template>

<script>
  export default {
    props: {
      contractItem: {
        type: Object,
        default() {
          return null;
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
        itemName: this.contractItem.item.name,
        changed: false
      }
    },
    mounted() {
      
    },
    methods: {
      deleteItem() {
        this.$parent.deleteItem(this.contractItem.id);
      },
      async changeItem() {
        let item = await this.$services.item.findByName(this.itemName);
        if (item != null) {
          this.contractItem.item = item;
          this.changed = false;
        }
      }
    },
    watch: {
      itemName(newVal, oldVal) {
        if (newVal != this.contractItem.item.name) {
          this.changed = true;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cell-l {
      min-width: 150px;
      width: 100%;
  }

  .cell-m {
    min-width: 100px;
    width: 100%;
  }
</style>
