<template>
  <div>
    <h1>Items</h1>
    <item-edit :itemNames="itemNames" />
    <item-list :items="items" />
  </div>
</template>

<script>
  import Item from '~/components/data/Item.vue'
  import ItemEdit from '~/components/data/ItemEdit.vue'
  import ItemList from '~/components/data/ItemList.vue'

  export default {
    components: {
      Item,
      ItemEdit,
      ItemList
    },
    data() {
      return {
        items: {
          type: Array,
          default() {
            return [];
          }
        },
        ressources: {
          type: Array,
          default() {
            return [];
          }
        },
        itemNames: {
          type: Array,
          default() {
            return [];
          }
        }
      };
    },
    async asyncData(ctx) {
      var items = await ctx.$services.item.findFullAll()
      const res = ['Anderes Item', 'Noch nen Item'];
      //console.log(item)
      try {
        return {
          items: items,
          ressources: res,
          itemNames: await ctx.$services.item.findAllNames()
        };
      } catch (error) {

      }
    }
  }
</script>
