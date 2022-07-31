<template>
  <div>
    <h2>Kosten</h2>
    <div class="form-check form-switch">
      <input v-model.boolean="edit" class="form-check-input" type="checkbox" id="editModeSwitch" name="editMode" value="true" checked>
      <label class="form-check-label" for="editModeSwitch">Edit Mode</label>
    </div>
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
            <th v-for="item in costTypes" nowrap>{{ item.name }}</th>
          </tr>
        </thead>
        <tbody>
          <project-content-row v-for="content in project.content" class="project-content" :edit="edit" :projectContent="content" :parent="getParent(content.parent)" :costTypes="costTypes" :key="'pc-' + content.id" />
        </tbody>
      </table>
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
      }      
    },
    data() {
      return {
        /* Headers for the table
         * Format:
         * {
         *    id: Number,
         *    name: String
         * }
         */
        costTypes: [],
        edit: false,
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
      }
    },
    mounted() {
      let res = [];
      for (let content of this.project.content) {
        if (content.item.blueprint) {
          for (let bCost of content.item.blueprint.baseCost) {
            let exists = false;
            for (let t of res) {
              if (t.id == bCost.item) {
                exists = true;
                break;
              }
            }
            if (!exists) {
              res.push({
                id: bCost.item,
                name: bCost.itemName
              });
            }
          }
        }
      }
      this.costTypes = res;
    }
  }
</script>

<style lang="scss">

  /*thead th {
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
