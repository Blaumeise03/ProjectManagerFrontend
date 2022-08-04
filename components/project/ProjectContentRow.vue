<template>
  <tr class="collapse no-transition show"
      :class="[projectContent.isChild ? 'content-child' : '', getParentClass()]"
      :id="'pc-' + projectContent.id">
    <td v-if="edit">{{ projectContent.id }}</td>
    <td v-if="edit"><input class="form-control-plaintext" v-model.number="projectContent.order" type="number" min="0" step="1" @change="updateOrder" /></td>
    <td class="px-0" v-if="edit">
      <div class="d-flex flex-row">
        <button type="button" class="btn btn-danger py-0 px-2 mx-1" @click="markDelete()"><i class="bi bi-trash"></i></button>
        <button v-if="projectContent.isChild" type="button" class="btn btn-secondary py-0 px-2 me-1" @click="makeParent()"><i class="bi bi-arrow-bar-left"></i></button>
        <button v-else type="button" class="btn btn-secondary py-0 px-2 me-1" @click="makeChild()"><i class="bi bi-arrow-bar-right"></i></button>
        <button type="button" class="btn btn-secondary py-0 px-2 me-1" @click="moveUp()"><i class="bi bi-arrow-bar-up"></i></button>
        <button type="button" class="btn btn-secondary py-0 px-2 me-1" @click="moveDown()"><i class="bi bi-arrow-bar-down"></i></button>
      </div>
    </td>
    <td class="content-name" data-bs-toggle="collapse" :data-bs-target="'.parent-id-' + projectContent.id" nowrap>{{ projectContent.item.name }}</td>
    <td v-if="!projectContent.auto" nowrap><input class="form-control-plaintext" v-model.number="projectContent.build" type="number" min="0" step="1" /></td>
    <td v-if="!projectContent.auto" nowrap><input class="form-control-plaintext" v-model.number="projectContent.amount" type="number" min="0" step="1" /></td>
    <td v-if="projectContent.auto" class="inline-td" nowrap>
      <span class="inline">{{ getBuild }}</span>
    </td>
    <td v-if="projectContent.auto" class="inline-td" nowrap>
      <input v-if="edit" class="form-control-plaintext inline" v-model.number="projectContent.amount" type="number" min="0" step="1" />
      <span v-if="edit">=</span>
      <span class="inline">{{ getPlanned }}</span>
    </td>
    <td nowrap><input class="form-control-plaintext" v-model.number="projectContent.efficiency" type="number" min="0" step="0.01" /></td>
    <td v-for="cost in costTypes" nowrap>{{ getCostAmount(cost.id) }}</td>
  </tr>
</template>

<script>
  export default {
    props: {
      projectContent: {
        type: Object,
        default() {
          return null;
        }
      },
      parent: {
        type: Object,
        default() {
          return null;
        }
      },
      costTypes: {
        type: Array,
        default() {
          return null;
        }
      },
      edit: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    computed: {
      getBuild() {
        if (this.parent != null) {
          return this.parent.build * this.projectContent.amount;
        }
        return this.projectContent.build;
      },
      getPlanned() {
        if (this.parent != null) {
          return this.parent.amount * this.projectContent.amount;
        }
        return this.projectContent.amount;
      }
    },
    methods: {
      getCostAmount(itemID) {
        if (this.projectContent.item.blueprint) {
          for (let cost of this.projectContent.item.blueprint.baseCost) {
            if (cost.itemID == itemID) {
              return (cost.quantity / 1.5 * this.projectContent.efficiency * this.getPlanned).toLocaleString("en-US");
              break;
            }
          }
        }
      },
      getParentClass() {
        if (this.projectContent.parent) {
          return "parent-id-" + this.projectContent.parent;
        }
        return "";
      },
      markDelete() {
        this.$parent.deleteContent(this.projectContent.id);
      },
      moveUp() {
        this.$parent.moveContentUp(this.projectContent);
      },
      moveDown() {
        this.$parent.moveContentDown(this.projectContent);
      },
      makeParent() {
        this.$parent.makeContentParent(this.projectContent);
      },
      makeChild() {
        this.$parent.makeContentChild(this.projectContent);
      },
      updateOrder() {
        this.$parent.updateOrder();
      }
    },
    watch: {
      "projectContent.amount"() {
        this.$parent.computeSum();
      },
      "projectContent.efficiency"() {
        this.$parent.computeSum();
      }
    }
  }
</script>

<style lang="scss">
  td {
    .btn {
      height: 100%;
      width: 100%;
      display: inline-block;
    }
  }

  .inline {
    display: inline-block;

  }

  .inline-td {
    width: fit-content;

    input {
      width: 7ch;
    }
  }

  .inline-p {
    white-space: nowrap;
  }
</style>
